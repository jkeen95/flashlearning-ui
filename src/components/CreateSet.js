import EditableSetInfo from "./EditableSetInfo";
import React from "react";
import {FlashcardSet} from "../models";
import {DataStore} from "aws-amplify";
import {removeEmpties} from "../utils/utils";

class CreateSet extends React.Component {

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

    async handleSubmit(setInfo) {
        await this.saveFlashcardSet(setInfo);

    }

    async saveFlashcardSet(setInfo) {
        const response = removeEmpties(setInfo.titles, setInfo.definitions)

        await DataStore.save(
            new FlashcardSet({
                name: setInfo.flashSetName,
                description: setInfo.flashSetDescription,
                visibility: setInfo.flashSetVisibility,
                owner: this.props.currentUser.username,
                titles: response.validTitles,
                definitions: response.validDefs,
            })
        ).then(result => {
            const url = "" + window.location.origin + "/set/" + result.id + "/browse";
            window.location.replace(url)
        });
    }

    render() {
        const setInfo = {
            flashSetName: '',
            flashSetVisibility: 'public',
            flashSetDescription: '',
            titles: [""],
            definitions: [""]
        }

        return (
            <EditableSetInfo currentUser={this.props.currentUser} setInfo={setInfo} handleSubmit={this.handleSubmit}/>
        );
    }
}

export default CreateSet;