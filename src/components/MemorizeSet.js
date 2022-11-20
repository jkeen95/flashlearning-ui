import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField} from "@aws-amplify/ui-react";
import {generateRandomNumber} from "../utils/utils";

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
            sessionFinished: false,
            incorrectCountArray: [],
            correctCountArray: [],
            originalIndex: 0
        };
    }

    async componentDidMount() {
        //this.fillSetInformation()
        await this.formOriginalOrderFlashcardsToBrowse()
        if(!this.props.originalOrder) {
            this.formRandomOrderFlashcardsToBrowse()
        }
        const originalIndex = await this.getOriginalIndex()
        await this.setState({
            originalIndex: originalIndex
        })
    }

    swapSide = () => {
        console.log(this.state)
        this.setState({currentCardOnFront: !this.state.currentCardOnFront})
    }

    getOriginalIndex = async () => {
        let originalIndex
        if(this.state.originalOrder && !this.props.withRepetition) {
          return this.state.index
        }
        else {
            return await this.findOriginalIndex()
        }
    }

    findOriginalIndex = async () => {
        const currentCard = this.state.flashcardsToBrowse[this.state.index]
        //console.log(currentCard)
        const originalIndex = this.state.originalOrderFlashcards.findIndex(card => {
            return card.title === currentCard.title
        })
        //console.log(originalIndex)
        return originalIndex
    }

    incorrect = async () => {
        if(this.props.withRepetition){
            await this.witRepetitionIncorrect()
        }
        else {
            await this.withoutRepetitionIncorrect()
        }
    }

    witRepetitionIncorrect = async () => {
        await this.incrementIncorrectCounts()
        let originalIndex = await this.getOriginalIndex()
        this.state.correctCountArray[originalIndex] = 2;
        console.log(this.state.correctCountArray)
        await this.insertRepeatCard()
        await this.incrementIndex(false)
    }

    withoutRepetitionIncorrect = async () => {
        await this.incrementIncorrectCounts()
        await this.incrementIndex(false)
    }

    incrementIncorrectCounts = async () => {
        let originalIndex = await this.getOriginalIndex()
        this.state.incorrectCountArray[originalIndex] = this.state.incorrectCountArray[originalIndex] + 1;
        //console.log(this.state.incorrectCountArray)
        await this.setState({
            incorrectCounter: this.state.incorrectCounter + 1
        })
    }

    correct = async () => {
        console.log(this.props.withRepetition)
        if(this.props.withRepetition){
            console.log("correctWith")
            await this.withRepetitionCorrect()
        }
        else {
            await this.withoutRepetitionCorrect()
        }
    }

    withRepetitionCorrect = async () => {
        let originalIndex = await this.getOriginalIndex()
        console.log(originalIndex)
        if(this.state.correctCountArray[originalIndex] === 3 || this.state.correctCountArray[originalIndex]-1 === 0) {
            await this.setState({
                correctCounter: this.state.correctCounter + 1
            })
            this.state.correctCountArray[originalIndex] = 0
        }
        else {
            this.state.correctCountArray[originalIndex] = this.state.correctCountArray[originalIndex] - 1
            console.log(this.state.correctCountArray)
            this.insertRepeatCard()
        }
        await this.incrementIndex(true)
    }

    withoutRepetitionCorrect = async () => {
        await this.setState({
            correctCounter: this.state.correctCounter + 1
        })
        await this.incrementIndex(true)
    }

    incrementIndex = async (correctGuess) => {
        console.log("increment")
        if(!this.props.withRepetition && this.state.index === this.state.flashcardsToBrowse.length-1) {
            await this.setState({
                sessionFinished: true
            })
        }
        else if(this.state.index === this.state.flashcardsToBrowse.length-1) {
            const originalIndex = await this.getOriginalIndex()
            console.log("oI " + originalIndex)
            console.log(this.state.correctCountArray[originalIndex])
            if(this.state.correctCountArray[originalIndex] === 0) {
                console.log("in here")
                await this.setState({
                    sessionFinished: true
                })
            }
        }

        if(!this.state.sessionFinished) {
            //console.log("orginal " + originalIndex)
            await this.setState({
                index: this.state.index + 1,
                currentCardOnFront: true,
            })
            let originalIndex = await this.getOriginalIndex()
            await this.setState({
                originalIndex: originalIndex
            })
        }
    }

    insertRepeatCard = async () => {
        const cardToInsert = this.state.flashcardsToBrowse[this.state.index]
        console.log(cardToInsert)
        if(this.state.index === this.state.flashcardsToBrowse.length-1) {
            //append to end
            console.log("append to end")
            await this.setState(previousState => ({
                flashcardsToBrowse: [...previousState.flashcardsToBrowse, cardToInsert]
            }));
            console.log(this.state.flashcardsToBrowse)
        }
        else {
            if(this.state.index+4 <= this.state.flashcardsToBrowse.length) {
                console.log("5 cards left")
                const newIndex = generateRandomNumber(this.state.index, this.state.index+4)
                const temp = this.state.flashcardsToBrowse
                temp.splice(newIndex, 0, cardToInsert);
                await this.setState(previousState => ({
                    flashcardsToBrowse: temp
                }));
                console.log(newIndex)
            }
            else {
                console.log("less than 5 cards left")
                const newIndex = generateRandomNumber(this.state.index, this.state.index+4)
                const temp = this.state.flashcardsToBrowse
                temp.splice(newIndex, 0, cardToInsert);
                await this.setState(previousState => ({
                    flashcardsToBrowse: temp
                }));
                console.log(newIndex)
            }
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
            originalOrderFlashcards: JSON.parse(JSON.stringify(originalOrder)),
            incorrectCountArray: Array(originalOrder.length).fill(0),
            correctCountArray: Array(originalOrder.length).fill(3),
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

    printIncorrectGuesses = () => {
        const incorrectGuesses = this.state.incorrectCountArray.map((incorrectCount, index) => {
            if(incorrectCount > 0) {
                return <p>&ensp;- Card #{index+1} = {incorrectCount} {incorrectCount === 1 ? "time" : "times"}</p>
            }
        })
        return (
            <div>
                <h4>Incorrectly Guessed Cards:</h4>
                {incorrectGuesses}
            </div>
        )
        console.log(incorrectGuesses)
    }

    printRemainingCorrectGuesses = () => {
        const remainingGuesses = this.state.correctCountArray[this.state.originalIndex];
        if(remainingGuesses === 1 || remainingGuesses === 2) {
            return (
                <div>
                    <br/>
                    <p>{remainingGuesses} Correct {remainingGuesses === 2 ? "Guesses" : "Guess"} Remaining</p>
                </div>
            )}
         return ""
    }

    render() {
        //console.log(JSON.stringify(this.props.setInfo))
        if (this.state.flashcardsToBrowse.length !== 0) {
            //console.log("inside ---" + JSON.stringify(this.state))
            if (this.state.sessionFinished) {
                return (
                    <div className="memorizeFinished">
                        <br/>
                        <h1>Finished Studying the {this.props.titleSide ? "Title" : "Definition"} side of the Flashcard
                            Set, {this.props.setInfo.name},
                            in {this.props.originalOrder ? "Original" : "Randomized"} order {this.props.withRepetition ? "with" : "without"} Repetition!</h1>
                        <br/>
                        <hr/>
                        <br/>
                        <h2 className="resultsHeader">Results</h2>
                        <br/>
                        <div className="memorizeResults">
                            {this.props.withRepetition ? "" : <h4>Correct
                                Percentage: {((this.state.originalOrderFlashcards.length - this.state.incorrectCounter) / this.state.originalOrderFlashcards.length) * 100}%</h4>}
                            <h4>Incorrect Guesses: {this.state.incorrectCounter}</h4>
                            {this.state.incorrectCounter ? this.printIncorrectGuesses() : ""}
                            {/*<h4>{this.state.correctCountArray}</h4>*/}
                        </div>
                        <br/>
                        <br/>
                        <div className="finishedButtons">
                            <button onClick={() => window.location.reload()}>Run New Session</button>
                            &ensp;
                            <button
                                onClick={() => window.location.assign(window.location.origin + "/set/" + this.props.setId.id + "/browse")}>Exit
                                Session
                            </button>
                        </div>
                    </div>
                )
            }
            const frontHeader = this.state.showSetTitleSide ? "Title" : "Definition"
            const backHeader = this.state.showSetTitleSide ? "Definition" : "Title"
            const front = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].title : this.state.flashcardsToBrowse[this.state.index].definition;
            const back = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].definition : this.state.flashcardsToBrowse[this.state.index].title;
            return (
                <div>
                    <br/>
                    <h1>Studying the {this.props.titleSide ? "Title" : "Definition"} side of the Flashcard
                        Set, {this.props.setInfo.name},
                        in {this.props.originalOrder ? "Original" : "Randomized"} order {this.props.withRepetition ? "with" : "without"} Repetition </h1>
                    <br/>
                    <hr/>
                    <br/>
                    <h3>Progress:&ensp;Correct:&nbsp;{this.state.correctCounter}&ensp;|&ensp;Incorrect:&nbsp;{this.state.incorrectCounter} </h3>
                    <hr/>
                    <br/>
                    <p className="showingSide">{"Showing the " + (this.state.currentCardOnFront ? frontHeader : backHeader) + " side"}</p>
                    <p>{this.state.index + 1} / {this.state.flashcardsToBrowse.length}</p>
                    {/*{this.state.originalIndex}*/}
                    {this.printRemainingCorrectGuesses()}
                    <FlipFlashcard key={this.state.index} front={front} back={back}
                                   frontSide={this.state.currentCardOnFront} swapSide={this.swapSide}/>
                    <div className="card_buttons">
                        <div className="prev_button" onClick={() => {
                            this.incorrect()
                        }}>Incorrect
                        </div>
                        <div className="next_button" onClick={() => {
                            this.correct()
                        }}>Correct
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default MemorizeSet;