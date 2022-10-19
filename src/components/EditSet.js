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

    async handleSubmit(event) {
        event.preventDefault();
        await this.updateFlashcardSet();
    }

    componentDidMount() {
        this.fillSetInformation()
    }

    async fetchSetInformation() {
        console.log(this.props.setId.id)
        console.log(this.props.currentUser.username)
        return await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        )
    }

    async fillSetInformation() {
        const currentSet = await this.fetchSetInformation()
        console.log(JSON.stringify(currentSet))
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
        console.log(this.state.setInfo)
    }

    async updateFlashcardSet() {
        const flashSetTitles = this.state.titles.filter(title => title !== "");
        const flashSetDefs = this.state.definitions.filter(def => def !== "");

        const original = await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        );
        await DataStore.save(
            FlashcardSet.copyOf(original[0], updated => {
                updated.name = this.state.flashSetName;
                updated.description = this.state.flashSetDescription;
                updated.visibility = this.state.flashSetVisibility;
                updated.titles = flashSetTitles;
                updated.definitions =  flashSetDefs;
            })
        ).then(result => {
            console.log(JSON.stringify(result))
            alert('A new flashcard set was saved: ' + this.state.flashSetName + "\n" +
                'A visibility was saved: ' + this.state.flashSetVisibility + "\n" +
                'A description was saved: ' + this.state.flashSetDescription + "\n" +
                'Flashcard titles were saved: ' + JSON.stringify(flashSetTitles) + "\n" +
                'Flashcard definitions were saved: ' + JSON.stringify(flashSetDefs) + "\n"
            );
            const url = "" + window.location.origin + "/set/" + result.id + "/browse";
            console.log(url)
            window.location.replace(url)
        });
    }

    render() {
        console.log(this.state.setInfo)
        if(this.state.setInfo.flashSetName === '')
            return <div />
        else
            return (
                <EditableSetInfo currentUser={this.props.currentUser} setInfo={this.state.setInfo} handleSubmit={this.handleSubmit}/>
            );
    }
}

export default EditSet;