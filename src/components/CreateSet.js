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
        // const flashSetTitles = setInfo.titles.filter(title => title !== "");
        // const flashSetDefs = setInfo.definitions.filter(def => def !== "");
        //console.log(JSON.stringify(response))
        //console.log(flashSetDefs)

        //console.log(response.validTitles)
        //console.log(response.validDefs)

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
            //console.log(JSON.stringify(result))
            alert('A new flashcard set was saved: ' + setInfo.flashSetName + "\n" +
                'A visibility was saved: ' + setInfo.flashSetVisibility + "\n" +
                'A description was saved: ' + setInfo.flashSetDescription + "\n" +
                'FlashcardInput titles were saved: ' + JSON.stringify(response.validTitles) + "\n" +
                'FlashcardInput definitions were saved: ' + JSON.stringify(response.validDefs) + "\n"
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