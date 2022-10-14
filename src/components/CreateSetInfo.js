import React from "react";
import Flashcard from "./Flashcard";
import {API, DataStore} from 'aws-amplify'
import { createFlashcardSet } from '../graphql/mutations'
import {FlashcardSet} from "../models";

class CreateSetInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flashSetName: '',
            flashSetVisibility: '',
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
        alert('A name was submitted: ' + this.state.flashSetName + "\n" +
            'A visibility was submitted: ' + this.state.flashSetVisibility + "\n" +
            'A description was submitted: ' + this.state.flashSetDescription + "\n" +
            'Flashcards were submitted: ' + JSON.stringify(this.state.flashcards) + "\n"
        );
        event.preventDefault();
    }

    // async saveFlashcardSet() {
    //     await DataStore.save(
    //         new FlashcardSet({
    //             name: this.state.flashSetName,
    //             description: this.state.flashSetDescription,
    //             visibility: this.state.flashSetVisibility,
    //             owner: ,
    //             titles: ,
    //             definitions: ,
    //         })
    //     );
    // }

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