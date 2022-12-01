import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
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
            if (result.length === 0) {
                const sharedSet = await getSharedSet(this.props.setId.id, this.props.currentUser.username)
                await this.setState({
                    setInfo: sharedSet,
                    sharedBol: true
                })
            } else {
                await this.setState({
                    setInfo: result[0]
                })
            }
        });
    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
            return <BrowseSet setId={this.props.setId} currentUser={this.props.currentUser} setInfo={this.state.setInfo} sharedBol={this.state.sharedBol}/>
        }
        else {
            return <h1>You are not permitted to view this set!</h1>
        }
    }
}

export default BrowseSetDataLoad;