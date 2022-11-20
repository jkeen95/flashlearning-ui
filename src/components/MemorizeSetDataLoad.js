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
            show: true,
            originalOrder: true,
            titleSide: true,
            withRepetition: false
        };
    }


    async componentDidMount() {
        //console.log(this.props.setId.id)
        const result = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(result => {
            //console.log(JSON.stringify(result))
            this.setState({
                setInfo: result[0]
            })
            //console.log("after then " + JSON.stringify(this.state))
        });

        //console.log("before form " + JSON.stringify(this.state))

    }

    orderRadioChange = () => {
        //console.log(this.state.originalOrder)
        this.setState({originalOrder: !this.state.originalOrder})
        //console.log(this.state.originalOrder)
    }

    sideRadioChange = () => {
        console.log(this.state.titleSide)
        this.setState({titleSide: !this.state.titleSide})
        console.log(this.state.titleSide)
    }

    checkboxChange = () => {
        //console.log(this.state.withRepetition)
        this.setState( {withRepetition: !this.state.withRepetition})
        //console.log(this.state.withRepetition)
    }

    handleSubmit = async () => {
        //console.log(this.state.show)
        this.setState({show: !this.state.show})
        //console.log(this.state.show)
    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
            //console.log("browse test" + JSON.stringify(this.state.setInfo))
            if(this.state.show) {
                return  <MemorizeSetModal originalOrder={this.state.originalOrder} orderRadioChange={this.orderRadioChange} titleSide={this.state.titleSide} sideRadioChange={this.sideRadioChange} checkboxChange={this.checkboxChange} handleSubmit={this.handleSubmit}/>
            }
            else {
                return <MemorizeSet setId={this.props.setId} currentUser={this.props.currentUser} setInfo={this.state.setInfo} originalOrder={this.state.originalOrder} titleSide={this.state.titleSide} withRepetition={this.state.withRepetition}/>
            }
        }
        else {
            return <h1>You are not permitted to view this set!</h1>
        }
    }
    // }
}

export default MemorizeSetDataLoad;