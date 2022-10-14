import React from "react";
import Flashcard from "./Flashcard";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";

class CreateSetInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flashSetName: '',
            flashSetVisibility: 'public',
            flashSetDescription: '',
            count: 1,
            flashcards: []
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
        const updatedFlashcard = this.state.flashcards.map((flashcard, i) => {
            if(index === i) {
                flashcard.title = event.target.value;
                return flashcard;
            }
            return flashcard;
        });
        this.setState({flashcards: updatedFlashcard})
    }

    handleDefChange = (event, index) =>{
        console.log("defChange: " + event.target.value + " " + index)
        const updatedFlashcard = this.state.flashcards.map((flashcard, i) => {
            if(index === i) {
                flashcard.definition = event.target.value;
                return flashcard;
            }
            return flashcard;
        });
        this.setState({flashcards: updatedFlashcard})
    }


    handleSubmit(event) {
        this.saveFlashcardSet()
        alert('A new flashcard set was saved: ' + this.state.flashSetName + "\n" +
            'A visibility was saved: ' + this.state.flashSetVisibility + "\n" +
            'A description was saved: ' + this.state.flashSetDescription + "\n" +
            'Flashcards were saved: ' + JSON.stringify(this.state.flashcards) + "\n"
        );
        event.preventDefault();
    }

    async saveFlashcardSet() {
        const flashSetTitles = this.state.flashcards
            .map(flashcard => {
                return flashcard.title;
            })
            .filter(title => title !== "");

        const flashSetDefs = this.state.flashcards
            .map((flashcard, i) => {
                return flashcard.definition;
            })
            .filter(def => def !== "");

        // console.log(JSON.stringify("titles " + flashSetTitles));
        // console.log(JSON.stringify("defs " + flashSetDefs));
        // console.log(this.state.flashSetVisibility);
        // console.log(this.props.currentUser.username);

        await DataStore.save(
            new FlashcardSet({
                name: this.state.flashSetName,
                description: this.state.flashSetDescription,
                visibility: this.state.flashSetVisibility,
                owner: JSON.stringify(this.props.currentUser.username),
                titles: flashSetTitles,
                definitions: flashSetDefs,
            })
        );
    }

    addFlashcard = () => {
        this.setState({
            flashcards: [...this.state.flashcards, {"title": "", "definition": ''}]
        })
        console.log("count " + this.state.count)
        this.state.count++
    }

    componentDidMount() {
        if(this.state.flashcards.length === 0) {
            this.state.count = 1;
            this.state.flashcards = [];
            this.setState({flashcards: [...this.state.flashcards, {"title": "", "definition": ''}]});
            this.addFlashcard();
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input type="text" onBlur={this.handleNameChange} />
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
                {this.state.flashcards.map((flashcard, index) => {
                    console.log(JSON.stringify(flashcard))
                    return (
                        <Flashcard key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} title={flashcard.title} definition={flashcard.definition}/>
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

export default CreateSetInfo;