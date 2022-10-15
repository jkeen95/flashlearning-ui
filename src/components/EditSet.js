import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import Flashcard from "./Flashcard";

class EditSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flashSetName: '',
            flashSetVisibility: 'public',
            flashSetDescription: '',
            titles: [],
            definitions: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({flashSetName: event.target.value});
    }

    handleVisibilityChange(event) {
        this.setState({flashSetVisibility: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({flashSetDescription: event.target.value});
    }

    handleTitleChange = (event, index) =>{
        const updatedTitles = this.state.titles.map((title, i) => {
            if(index === i) {
                title = event.target.value;
                return title;
            }
            return title;
        });
        this.setState({titles: updatedTitles})
    }

    handleDefChange = (event, index) =>{
        //console.log("defChange: " + event.target.value + " " + index)
        const updatedDefinitions = this.state.definitions.map((def, i) => {
            if(index === i) {
                def = event.target.value;
                return def;
            }
            return def;
        });
        this.setState({definitions: updatedDefinitions})
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
        this.setState({
            flashSetName: currentSet[0].name,
            flashSetVisibility: currentSet[0].visibility,
            flashSetDescription: currentSet[0].description,
            titles: currentSet[0].titles,
            definitions: currentSet[0].definitions
        });
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

    addFlashcard = () => {
        this.setState({
            // flashcards: [...this.state.flashcards, {"title": "", "definition": ''}]
            titles: [...this.state.titles, ""],
            definitions: [...this.state.definitions, ""],
        })
        console.log("count " + this.state.count)
        this.state.count++
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input value={this.state.flashSetName} type="text" onChange={this.handleNameChange} onBlur={this.handleNameChange} />
                    </label>
                    <label>
                        Visibility:
                        <select value={this.state.flashSetVisibility} onChange={this.handleVisibilityChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea value={this.state.flashSetDescription} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                <br/>
                <hr/>
                <br/>
                {this.state.titles.map((title, index) => {
                    console.log(JSON.stringify(title))
                    return (
                        <Flashcard key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} title={title} definition={this.state.definitions[index]}/>
                    )
                })}
                <button type="button" onClick={this.addFlashcard}>Add Flashcard</button>
                <br/>
                <hr/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>;
    }
}

export default EditSet;