import EditableSetInfo from "./EditableSetInfo";
import React from "react";
import {FlashcardSet} from "../models";
import {DataStore} from "aws-amplify";

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
        const flashSetTitles = setInfo.titles.filter(title => title !== "");
        const flashSetDefs = setInfo.definitions.filter(def => def !== "");

        console.log(flashSetTitles)
        console.log(flashSetDefs)

        await DataStore.save(
            new FlashcardSet({
                name: setInfo.flashSetName,
                description: setInfo.flashSetDescription,
                visibility: setInfo.flashSetVisibility,
                owner: this.props.currentUser.username,
                titles: flashSetTitles,
                definitions: flashSetDefs,
            })
        ).then(result => {
            console.log(JSON.stringify(result))
            alert('A new flashcard set was saved: ' + setInfo.flashSetName + "\n" +
                'A visibility was saved: ' + setInfo.flashSetVisibility + "\n" +
                'A description was saved: ' + setInfo.flashSetDescription + "\n" +
                'FlashcardInput titles were saved: ' + JSON.stringify(flashSetTitles) + "\n" +
                'FlashcardInput definitions were saved: ' + JSON.stringify(flashSetDefs) + "\n"
            );
            const url = "" + window.location.origin + "/set/" + result.id + "/browse";
            console.log(url)
            window.location.assign(url)
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