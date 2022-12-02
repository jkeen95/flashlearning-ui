import React from "react";
import FlipFlashcard from "./FlipFlashcard";
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
        await this.formOriginalOrderFlashcardsToBrowse()
        if(!this.props.originalOrder) {
            await this.formRandomOrderFlashcardsToBrowse()
        }
        const originalIndex = await this.getOriginalIndex()
        await this.setState({
            originalIndex: originalIndex
        })
    }

    swapSide = () => {
        this.setState({currentCardOnFront: !this.state.currentCardOnFront})
    }

    getOriginalIndex = async () => {
        if(this.state.originalOrder && !this.props.withRepetition) {
          return this.state.index
        }
        else {
            return await this.findOriginalIndex()
        }
    }

    findOriginalIndex = async () => {
        const currentCard = this.state.flashcardsToBrowse[this.state.index]
        const originalIndex = this.state.originalOrderFlashcards.findIndex(card => {
            return card.title === currentCard.title
        })
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
        await this.setState({
            incorrectCounter: this.state.incorrectCounter + 1
        })
    }

    correct = async () => {
        if(this.props.withRepetition){
            await this.withRepetitionCorrect()
        }
        else {
            await this.withoutRepetitionCorrect()
        }
    }

    withRepetitionCorrect = async () => {
        let originalIndex = await this.getOriginalIndex()
        if(this.state.correctCountArray[originalIndex] === 3 || this.state.correctCountArray[originalIndex]-1 === 0) {
            await this.setState({
                correctCounter: this.state.correctCounter + 1
            })
            this.state.correctCountArray[originalIndex] = 0
        }
        else {
            this.state.correctCountArray[originalIndex] = this.state.correctCountArray[originalIndex] - 1
            await this.insertRepeatCard()
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
        if(!this.props.withRepetition && this.state.index === this.state.flashcardsToBrowse.length-1) {
            await this.setState({
                sessionFinished: true
            })
        }
        else if(this.state.index === this.state.flashcardsToBrowse.length-1) {
            const originalIndex = await this.getOriginalIndex()
            if(this.state.correctCountArray[originalIndex] === 0) {
                await this.setState({
                    sessionFinished: true
                })
            }
        }

        if(!this.state.sessionFinished) {
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
        if(this.state.index === this.state.flashcardsToBrowse.length-1) {
            await this.setState(previousState => ({
                flashcardsToBrowse: [...previousState.flashcardsToBrowse, cardToInsert]
            }));
        }
        else {
            if(this.state.index+4 <= this.state.flashcardsToBrowse.length) {
                const newIndex = generateRandomNumber(this.state.index, this.state.index+4)
                const temp = this.state.flashcardsToBrowse
                temp.splice(newIndex, 0, cardToInsert);
                await this.setState(previousState => ({
                    flashcardsToBrowse: temp
                }));
            }
            else {
                const newIndex = generateRandomNumber(this.state.index, this.state.index+4)
                const temp = this.state.flashcardsToBrowse
                temp.splice(newIndex, 0, cardToInsert);
                await this.setState(previousState => ({
                    flashcardsToBrowse: temp
                }));
            }
        }
    }

    formOriginalOrderFlashcardsToBrowse = async () => {
        const originalOrder = this.props.setInfo.titles.map((title, index) => {
            const card = {}
            card["title"] = title
            card["definition"] = this.props.setInfo.definitions[index]
            return card
        })
        await this.setState({
            flashcardsToBrowse: originalOrder,
            originalOrderFlashcards: JSON.parse(JSON.stringify(originalOrder)),
            incorrectCountArray: Array(originalOrder.length).fill(0),
            correctCountArray: Array(originalOrder.length).fill(3),
        })
    }

    formRandomOrderFlashcardsToBrowse = async () => {
        let currentRange = this.state.flashcardsToBrowse.length
        const tempArray = this.state.flashcardsToBrowse
        while (currentRange !== 0) {
            const index = Math.floor(Math.random() * currentRange);
            //console.log(index)
            const temp = tempArray[index];
            tempArray[index] = tempArray[currentRange - 1];
            tempArray[currentRange - 1] = temp;
            currentRange = currentRange - 1;
        }
        await this.setState({
            flashcardsToBrowse: tempArray
        })
    }

    printIncorrectGuesses = () => {
        const incorrectGuesses = this.state.incorrectCountArray.map((incorrectCount, index) => {
            if(incorrectCount > 0) {
                let incorrectGuessMessage = "  - Card #" + (index+1) + " = " + incorrectCount + " " + (incorrectCount === 1 ? "time" : "times")
                return <p>{incorrectGuessMessage}</p>
            }
        })
        return (
            <div>
                <h4>Incorrectly Guessed Cards:</h4>
                {incorrectGuesses}
            </div>
        )
    }

    printRemainingCorrectGuesses = () => {
        const remainingGuesses = this.state.correctCountArray[this.state.originalIndex];
        const remainingMessage = "" + remainingGuesses + " Correct " + (remainingGuesses === 2 ? "Guesses" : "Guess") + " Remaining"
        if(remainingGuesses === 1 || remainingGuesses === 2) {
            return (
                <div>
                    <br/>
                    <p>{remainingMessage}</p>
                </div>
            )}
         return ""
    }

    render() {
        if (this.state.flashcardsToBrowse.length !== 0) {
            if (this.state.sessionFinished) {
                const finishedMessage = "Finished Studying the " + (this.props.titleSide ? "Title" : "Definition") + " side of the Flashcard Set, " + this.props.setInfo.name + ", in " + (this.props.originalOrder ? "Original" : "Randomized") + " order " + (this.props.withRepetition ? "with" : "without") + " Repetition!"
                const correctPer = this.props.withRepetition ? "" : "Correct Percentage: " + ((this.state.originalOrderFlashcards.length - this.state.incorrectCounter) / this.state.originalOrderFlashcards.length) * 100 + "%"
                const incorrectPer = "Incorrect Guesses: " + this.state.incorrectCounter
                return (
                    <div className="memorizeFinished">
                        <br/>
                        <h1>{finishedMessage}</h1>
                        <br/>
                        <hr/>
                        <br/>
                        <h2 className="resultsHeader">Results</h2>
                        <br/>
                        <div className="memorizeResults">
                            <h4>{correctPer}</h4>
                            <h4>{incorrectPer}</h4>
                            {this.state.incorrectCounter ? this.printIncorrectGuesses() : ""}
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
            const studyingMessage = "Studying the " + (this.props.titleSide ? "Title" : "Definition") + " side of the Flashcard Set, " + this.props.setInfo.name + ", in " + (this.props.originalOrder ? "Original" : "Randomized") + " order " + (this.props.withRepetition ? "with" : "without") + " Repetition!"
            const progressMessage = "Progress:  Correct: " + this.state.correctCounter + "  |  Incorrect: " + this.state.incorrectCounter
            const cardIndex = this.state.index + 1 + " / " + this.state.flashcardsToBrowse.length
            return (
                <div>
                    <br/>
                    <h1>{studyingMessage}</h1>
                    <br/>
                    <hr/>
                    <br/>
                    <h3>{progressMessage}</h3>
                    <hr/>
                    <br/>
                    <div className="showingSideDiv">
                        <p className="showingSide">{"Showing the " + (this.state.currentCardOnFront ? frontHeader : backHeader) + " side"}</p>
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                        <p className="cardIndex">{cardIndex}</p>
                    </div>
                    {this.printRemainingCorrectGuesses()}
                    <div className="browseControlDiv">
                        <FlipFlashcard key={this.state.index} front={front} back={back} frontSide={this.state.currentCardOnFront} swapSide={this.swapSide}/>
                        &ensp;&ensp;&ensp;
                        <div className="card_buttons">
                            <div className="prev_button" onClick={() => {this.incorrect()}}>Incorrect</div>
                            <div className="next_button" onClick={() => {this.correct()}}>Correct</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default MemorizeSet;