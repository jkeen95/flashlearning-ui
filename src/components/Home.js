import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import {deleteSet} from "../utils/utils";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usersSets: []
        };
    }

    componentDidMount() {
        this.fetchSetInformation()
    }

    async fetchSetInformation() {
        console.log(this.props.currentUser.username)
        await DataStore.query(FlashcardSet, (set) =>
            set.owner('eq', this.props.currentUser.username)
        ).then(result => {
                console.log(result)
                this.setState({
                    usersSets: result
                })
            }
        )
    }

    checkUsersFlashsets() {
        console.log(this.state.usersSets)
        if(this.state.usersSets.length !== 0) {
            return (
                this.renderFlashSetOptions()
            )
        }
        else {
            return(
                <p>You have no flashcard sets.</p>
            )
        }
    }

    async removeSet(setId) {
        await deleteSet(setId)
        await this.fetchSetInformation()

    }

    renderFlashSetOptions() {
        return this.state.usersSets.map((set, index) => {
            const browseUrl = "" + window.location.origin +"/set/" + set.id + "/browse";
            const editUrl = "" + window.location.origin +"/set/" + set.id + "/edit";
            return (
                <div key={index}>
                    <a href={browseUrl}>{set.name}</a>
                    <br />
                    <a href={editUrl}>Edit</a>
                    <br />
                    <button onClick={() => this.removeSet(set.id)} className="deleteButton">Delete</button>
                    <br />
                    <br />
                </div>
            )
        });
    }


    render() {
        if(this.state.usersSets === [])
            return <div />
        else
            return (
                <div>
                    <h1 id="welcomeMessage">Welcome {this.props.currentUser.attributes.name}</h1>
                    <br />
                    <br />
                    <h2>Your Flashcard Sets</h2>
                    {this.checkUsersFlashsets()}
                </div>
            )
    }
}

export default Home;