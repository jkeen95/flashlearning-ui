import React from "react";
import {DataStore, JS} from 'aws-amplify'
import {FlashcardSet} from "../models";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField, ToggleButton} from "@aws-amplify/ui-react";
import {logDOM} from "@testing-library/react";
import BrowseSet from "./BrowseSet";

class BrowseSetTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {},
        };
    }


    async componentDidMount() {
        const result = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(result => {
            console.log(JSON.stringify(result))
            this.setState({
                setInfo: result[0]
            })
            console.log("after then " + JSON.stringify(this.state))
        });

        console.log("before form " + JSON.stringify(this.state))

    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
            console.log("browse test" + JSON.stringify(this.state.setInfo))
            return <BrowseSet setId={this.props.setId} currentUser={this.props.currentUser} setInfo={this.state.setInfo}/>
        }
    }
    // }
}

export default BrowseSetTest;