import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet, SharedSet} from "../models";
import BrowseSet from "./BrowseSet";
import {getSharedSet} from "../utils/utils";

class BrowseSetDataLoad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {},
            sharedBol: false
        };
    }


    async componentDidMount() {
        const result = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(async result => {
            console.log("result1: " + JSON.stringify(result))
            if (result.length === 0) {
                // await DataStore.query(SharedSet, (set) =>
                //     set.setId('eq', this.props.setId.id).username('eq', this.props.currentUser.username)
                // ).then(result => {
                //     this.setState({
                //         setInfo: result[0]
                //     })
                // })
                console.log("here")
                const sharedSet = await getSharedSet(this.props.setId.id, this.props.currentUser.username)
                console.log("sharedSet " + sharedSet)
                await this.setState({
                    setInfo: sharedSet,
                    sharedBol: true
                })
            } else {
                await this.setState({
                    setInfo: result[0]
                })
            }
            //console.log("after then " + JSON.stringify(this.state))
        });

        //console.log("before form " + JSON.stringify(this.state))

    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
            //console.log("browse test" + JSON.stringify(this.state.setInfo))
            return <BrowseSet setId={this.props.setId} currentUser={this.props.currentUser} setInfo={this.state.setInfo} sharedBol={this.state.sharedBol}/>
        }
        else {
            return <h1>You are not permitted to view this set!</h1>
        }
    }
    // }
}

export default BrowseSetDataLoad;