import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";

class BrowseSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSet: null
        };
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
        this.setState({currentSet: currentSet[0]})
    }

    formFlashCards(currentSet) {
        let result = [];
        currentSet.titles.forEach((title, i) => {
            const card = {};
            card["title"] = title;
            card["definition"] = currentSet.definitions[i];
            result.push(card);
        });
        console.log(result);
        return result;
    }

    render() {
        if(this.state.currentSet !== null) {
            console.log(this.state.currentSet)
            const flashcards = this.formFlashCards(this.state.currentSet)
            return (
                <div>
                    <h1>Current Flashcard Set Information</h1>
                    <br />
                    <hr />
                    <br />
                    <h4>ID: {this.state.currentSet.id}</h4>
                    <h4>Name: {this.state.currentSet.name}</h4>
                    <h4>Description: {this.state.currentSet.description}</h4>
                    <h4>Visibility: {this.state.currentSet.visibility}</h4>
                    <br />
                    <hr />
                    <br />
                    <h4>Flashcards:</h4>
                    <br />
                    {flashcards.map((flashcard, index) => {
                        console.log(JSON.stringify(flashcard))
                        return (
                            <div key={index+1}>
                                <h4>{index+1}. </h4>
                                <h4>Title: {flashcard.title}</h4>
                                <h4>Definition: {flashcard.definition}</h4>
                                <br />
                            </div>

                        )
                    })}
                </div>
            )
        }
    }
}

export default BrowseSet;