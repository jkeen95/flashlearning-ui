import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import EditableSetInfo from "./EditableSetInfo";

class EditSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {
                flashSetName: '',
                flashSetVisibility: 'public',
                flashSetDescription: '',
                titles: [""],
                definitions: [""]
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(setToSave) {
        await this.updateFlashcardSet(setToSave);
    }

    async componentDidMount() {
        await this.fillSetInformation()
    }

    async fetchSetInformation() {
        return await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        )
    }

    async fillSetInformation() {
        const currentSet = await this.fetchSetInformation()
        if(currentSet.length !== 0)
            this.setState(prevState => ({
                setInfo: {
                    ...prevState.setInfo,
                    flashSetName: currentSet[0].name,
                    flashSetVisibility: currentSet[0].visibility,
                    flashSetDescription: currentSet[0].description,
                    titles: currentSet[0].titles,
                    definitions: currentSet[0].definitions
                }
            }));
    }

    async updateFlashcardSet(setToSave) {
        await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(original => {
            DataStore.save(
                FlashcardSet.copyOf(original[0], updated => {
                    updated.name = setToSave.flashSetName;
                    updated.description = setToSave.flashSetDescription;
                    updated.visibility = setToSave.flashSetVisibility;
                    updated.titles = setToSave.titles;
                    updated.definitions =  setToSave.definitions;
                })
            ).then(result => {
                const url = "" + window.location.origin + "/set/" + result.id + "/browse";
                window.location.assign(url)
            })});
    }

    render() {
        if(this.state.setInfo.flashSetName === '')
            return <h1>You are not permitted to view this set!</h1>
        else
            return (
                <EditableSetInfo currentUser={this.props.currentUser} setInfo={this.state.setInfo} handleSubmit={this.handleSubmit}/>
            );
    }
}

export default EditSet;