import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet, SharedSet} from "../models";
import {deleteSet} from "../utils/utils";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usersSets: null,
            sharedSets: null,
            ready: false
        };
    }

    async componentDidMount() {
        this.setState({ready: true})
        await this.fetchSetInformation()
    }

    async fetchSetInformation() {
        const userSets = await DataStore.query(FlashcardSet, (set) =>
            set.owner('eq', this.props.currentUser.username)
        ).then(result => {
            return result
        })
        console.log(userSets)

        const results = await DataStore.query(SharedSet, (set) =>
            set.username('eq', this.props.currentUser.username)
        )
        console.log(results)

        let fetchedSharedSets = []
        for (let i = 0; i < results.length; i++) {
            fetchedSharedSets.push(await this.fetchedSharedSet(results[i]))
        }

        await this.setState({
            usersSets: userSets,
            sharedSets: fetchedSharedSets
        })
    }

    fetchedSharedSet = async (set) => {
        return await DataStore.query(FlashcardSet, (s) =>
            s.id('eq', set.setId)
        ).then(result => {
            return result[0]
        })
    }

    checkUsersSets() {
        if(this.state.usersSets.length !== 0) {
            return (
                this.renderFlashSetOptions(this.state.usersSets, false)
            )
        }
        else {
            return(
                <p>You have no flashcard sets.</p>
            )
        }
    }

    checkSharedSets() {
        if(this.state.sharedSets.length !== 0) {
            return (
                this.renderFlashSetOptions(this.state.sharedSets, true)
            )
        }
        else {
            return(
                <p>You have no flashcard sets shared with you.</p>
            )
        }
    }

    async removeSet(setId) {
        await deleteSet(setId)
        await this.fetchSetInformation()

    }

    renderFlashSetOptions(sets, sharedBol) {
        return sets.map((set, index) => {
            const browseUrl = "" + window.location.origin +"/set/" + set.id + "/browse";
            const editUrl = "" + window.location.origin +"/set/" + set.id + "/edit";
            return (
                <div key={index} className="homLinks">
                    <a className="homeBrowseLink" href={browseUrl}>{set.name}</a>
                    {sharedBol ? "" : <br />}
                    {sharedBol ? "" : <a href={editUrl}>Edit</a>}
                    {/*{sharedBol ? "" : <br />}*/}
                    {sharedBol ? "" : "  |  " }
                    {sharedBol ? "" : <button onClick={() => this.removeSet(set.id)} className="deleteButton">Delete</button>}
                    <br />
                    <br />
                </div>
            )
        });
    }


    render() {
        if(this.state.usersSets === null || this.state.sharedSets === null)
            return <div className="noDataYet"/>
        else
            return (
                <div>
                    <h1 id="welcomeMessage">Welcome {this.props.currentUser.attributes.name}</h1>
                    <br />
                    <br />
                    <h2>Your Flashcard Sets</h2>
                    {this.checkUsersSets()}
                    <br />
                    <hr />
                    <br />
                    <h2>Flashcard Sets Shared With You</h2>
                    {this.checkSharedSets()}
                </div>
            )
    }
}

export default Home;