import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import MemorizeSet from "./MemorizeSet";
import MemorizeSetModal from "./MemorizeSetModal";

class MemorizeSetDataLoad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {},
            show: true
        };
    }


    async componentDidMount() {
        console.log(this.props.setId.id)
        const result = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(result => {
            console.log(JSON.stringify(result))
            this.setState({
                setInfo: result[0]
            })
            //console.log("after then " + JSON.stringify(this.state))
        });

        //console.log("before form " + JSON.stringify(this.state))

    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
            //console.log("browse test" + JSON.stringify(this.state.setInfo))
            if(this.state.show) {
                return  <MemorizeSetModal />
            }
            else {
                return <MemorizeSet setId={this.props.setId} currentUser={this.props.currentUser} setInfo={this.state.setInfo}/>
            }
        }
    }
    // }
}

export default MemorizeSetDataLoad;