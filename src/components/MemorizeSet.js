import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField} from "@aws-amplify/ui-react";

class MemorizeSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            currentCardOnFront: true,
            showSetTitleSide: this.props.titleSide,
            flashcardsToBrowse: [],
            originalOrderFlashcards: [],
            randomizeOn: true,
            correctCounter: 0,
            incorrectCounter: 0,
            sessionFinished: false
        };
    }

    async componentDidMount() {
        //this.fillSetInformation()
        await this.formOriginalOrderFlashcardsToBrowse()
        if(!this.props.originalOrder) {
            this.formRandomOrderFlashcardsToBrowse()
        }
    }

    swapSide = () => {
        console.log(this.state)
        this.setState({currentCardOnFront: !this.state.currentCardOnFront})
    }

    incorrect = async () => {
        await this.setState({
            incorrectCounter: this.state.incorrectCounter + 1
        })
        await this.incrementIndex()
    }

    correct = async () => {
        await this.setState({
            correctCounter: this.state.correctCounter + 1
        })
        await this.incrementIndex()
    }

    incrementIndex = async () => {
        console.log("increment")
        if(this.state.index === this.state.flashcardsToBrowse.length-1) {
            await this.setState({
                sessionFinished: true
            })
        }
        else {
            await this.setState({
                index: this.state.index + 1,
                currentCardOnFront: true,
            })
        }
    }

    formOriginalOrderFlashcardsToBrowse = async () => {
            //console.log("inside")
        const originalOrder = this.props.setInfo.titles.map((title, index) => {
            const card = {}
            card["title"] = title
            card["definition"] = this.props.setInfo.definitions[index]
            //console.log(JSON.stringify(card))
            return card
        })
        console.log(originalOrder)
        await this.setState({
            flashcardsToBrowse: originalOrder,
            originalOrderFlashcards: JSON.parse(JSON.stringify(originalOrder))
        })
        console.log("original " + JSON.stringify(this.state));
    }

    formRandomOrderFlashcardsToBrowse = async () => {
        console.log(JSON.stringify(this.state))
        const originalOrderFlashcards = this.state.originalOrderFlashcards
        let currentRange = this.state.flashcardsToBrowse.length
        console.log("checkhere " + JSON.stringify(originalOrderFlashcards)===JSON.stringify(this.state.flashcardsToBrowse))
        //do {
        const tempArray = this.state.flashcardsToBrowse
        while (currentRange !== 0) {
            const index = Math.floor(Math.random() * currentRange);
            //console.log(index)
            const temp = tempArray[index];
            tempArray[index] = tempArray[currentRange - 1];
            tempArray[currentRange - 1] = temp;
            currentRange = currentRange - 1;
        }
        console.log("temp " + JSON.stringify(tempArray));
        await this.setState({
            flashcardsToBrowse: tempArray
        })
        console.log("random " + JSON.stringify(this.state.flashcardsToBrowse));
    }

    render() {
        //console.log(JSON.stringify(this.props.setInfo))
        if(this.state.flashcardsToBrowse.length !== 0) {
            //console.log("inside ---" + JSON.stringify(this.state))
            if(this.state.sessionFinished) {
                return (
                    <h1>Finished!</h1>
                )
            }
            const frontHeader = this.state.showSetTitleSide ? "Title" : "Definition"
            const backHeader = this.state.showSetTitleSide ? "Definition" : "Title"
            const front = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].title : this.state.flashcardsToBrowse[this.state.index].definition;
            const back = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].definition : this.state.flashcardsToBrowse[this.state.index].title;
            return (
                <div>
                    <br />
                    <h1>Studying the {this.props.titleSide ? "Title" : "Definition"} side of the Flashcard Set, {this.props.setInfo.name}, in {this.props.originalOrder ? "Original" : "Randomized"} order {this.props.withRepetition ? "with" : "without"} Repetition </h1>
                    <br />
                    <hr />
                    <br />
                    <h3>Progress:&nbsp;&nbsp;Correct:&nbsp;{this.state.correctCounter}&nbsp;&nbsp;|&nbsp;&nbsp;Incorrect:&nbsp;{this.state.incorrectCounter} </h3>
                    <hr />
                    <br />
                    <p>{this.state.currentCardOnFront ? frontHeader : backHeader}</p>
                    <p>{this.state.index+1} / {this.props.setInfo.titles.length}</p>
                    <FlipFlashcard key={this.state.index} front={front} back={back} frontSide={this.state.currentCardOnFront} swapSide={this.swapSide}/>
                    <div className="card_buttons">
                        <div className="prev_button" onClick={() => {this.incorrect()}}>Incorrect</div>
                        <div className="next_button" onClick={() => {this.correct()}}>Correct</div>
                    </div>
                </div>
            )
        }
    }
}

export default MemorizeSet;