import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import MemorizeSet from "./MemorizeSet";
import MemorizeSetModal from "./MemorizeSetModal";
import {getSharedSet} from "../utils/utils";

class MemorizeSetDataLoad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {},
            show: true,
            originalOrder: true,
            titleSide: true,
            withRepetition: false,
        };
    }


    async componentDidMount() {
        const result = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(async result => {
            if (result.length === 0) {
                const sharedSet = await getSharedSet(this.props.setId.id, this.props.currentUser.username)
                await this.setState({
                    setInfo: sharedSet
                })
            } else {
                await this.setState({
                    setInfo: result[0]
                })
            }
        });
    }

    orderRadioChange = () => {
        this.setState({originalOrder: !this.state.originalOrder})
    }

    sideRadioChange = () => {
        this.setState({titleSide: !this.state.titleSide})
    }

    checkboxChange = () => {
        this.setState( {withRepetition: !this.state.withRepetition})
    }

    handleSubmit = async () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if(JSON.stringify(this.state.setInfo) !== "{}") {
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
}

export default MemorizeSetDataLoad;