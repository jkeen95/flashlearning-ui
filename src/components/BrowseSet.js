import React from "react";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField} from "@aws-amplify/ui-react";

class BrowseSet extends React.Component {

    constructor(props) {
        super(props);
        //console.log("constructor" + JSON.stringify(this.props.setInfo))
        this.state = {
            setInfo: {
                flashSetName: this.props.setInfo.name,
                flashSetVisibility: this.props.setInfo.visibility,
                flashSetDescription: this.props.setInfo.description,
                titles: this.props.setInfo.titles,
                definitions: this.props.setInfo.definitions,
                flashSetId: this.props.setInfo.id
            },
            index: 0,
            returnedSet: {},
            currentCardOnFront: true,
            showSetTitleSide: true,
            flashcardsToBrowse: [],
            originalOrderFlashcards: [],
            randomizeOn: true
        };
        // this.cardRef = React.createRef()
    }

    async componentDidMount() {
        this.formOriginalOrderFlashcardsToBrowse()
    }

    swapSide = () => {
        console.log("swapSide")
        // let cardHeight = this.cardRef.current.getBoundingClientRect().height
        // console.log("heightBSwap ---- " + cardHeight)
        this.setState({currentCardOnFront: !this.state.currentCardOnFront})
        // cardHeight = this.cardRef.current.getBoundingClientRect().height
        // console.log("heightASwap ---- " + cardHeight)
    }

    radioChange = () => {
        this.setState({showSetTitleSide: !this.state.showSetTitleSide})
    }

    previousCard = () => {
        if(this.state.index-1 >= 0) {
            this.setState({
                index: this.state.index - 1,
                currentCardOnFront: true
            })
        }
        else {
            this.setState({
                index: this.state.setInfo.titles.length-1,
                currentCardOnFront: true
            })
        }
    }

    nextCard = () => {
        //console.log("next")
        if(this.state.index+1 < this.state.setInfo.titles.length) {
            this.setState({
                index: this.state.index + 1,
                currentCardOnFront: true
            })
        }
        else {
            this.setState({
                index: 0,
                currentCardOnFront: true
            })
        }
    }

    formOriginalOrderFlashcardsToBrowse = () => {
          if(this.state.originalOrderFlashcards.length === 0 && this.state.setInfo.titles !== undefined) {
              //console.log("inside")
              const originalOrder = this.state.setInfo.titles.map((title, index) => {
                const card = {}
                card["title"] = title
                card["definition"] = this.state.setInfo.definitions[index]
                  //console.log(JSON.stringify(card))
                return card
            })
            // this.state.flashcardsToBrowse = originalOrderFlashcards
            // this.state.originalOrderFlashcards = JSON.parse(JSON.stringify(originalOrderFlashcards))
              //console.log("originalOrder " + originalOrder)
              this.setState({
                  flashcardsToBrowse: originalOrder,
                  originalOrderFlashcards: JSON.parse(JSON.stringify(originalOrder))
              })
          }
          else {
              // this.state.flashcardsToBrowse = JSON.parse(JSON.stringify(this.state.originalOrderFlashcards))
              this.setState({
                  flashcardsToBrowse: JSON.parse(JSON.stringify(this.state.originalOrderFlashcards))
              })
          }
        //console.log("original " + JSON.stringify(this.state.flashcardsToBrowse));
    }

    formRandomOrderFlashcardsToBrowse = () => {
        const originalOrderFlashcards = this.state.originalOrderFlashcards
        let currentRange = this.state.flashcardsToBrowse.length
        //console.log("checkhere " + JSON.stringify(originalOrderFlashcards)===JSON.stringify(this.state.flashcardsToBrowse))
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
        this.setState({
            flashcardsToBrowse: tempArray
        })
        // }while(JSON.stringify(originalOrderFlashcards)===JSON.stringify(this.state.flashcardsToBrowse))
        //console.log("random " + JSON.stringify(this.state.flashcardsToBrowse));
    }

    randomOrderToggle = () => {
        //console.log(JSON.stringify(this.state))
        this.setState({randomizeOn: !this.state.randomizeOn})
        //console.log(JSON.stringify(this.state))
        //console.log(this.state.randomizeOn)
        if(this.state.randomizeOn) {
            this.formRandomOrderFlashcardsToBrowse();
        }
        else {
            this.formOriginalOrderFlashcardsToBrowse();
        }
    }

    render() {
        //console.log("flascardtobrowserender " + JSON.stringify(this.state.flashcardsToBrowse))
        //console.log("rendereee " + JSON.stringify(this.state))
           if(this.state.flashcardsToBrowse.length !== 0) {
            //console.log("inside")
            const frontHeader = this.state.showSetTitleSide ? "Title" : "Definition"
            const backHeader = this.state.showSetTitleSide ? "Definition" : "Title"
            const editUrl = "" + window.location.origin +"/set/" + this.state.setInfo.flashSetId + "/edit"
            const memorizeUrl = "" + window.location.origin + "/set/" + this.state.setInfo.flashSetId + "/memorize";
            const front = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].title : this.state.flashcardsToBrowse[this.state.index].definition;
            const back = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].definition : this.state.flashcardsToBrowse[this.state.index].title;
            //console.log("before return")
            return (
                <div>
                    <h1>Current Flashcard Set Information</h1>
                    <br />
                    <hr />
                    <br />
                    <h4>ID: {this.state.setInfo.flashSetId}</h4>
                    <h4>Name: {this.state.setInfo.flashSetName}</h4>
                    <h4>Description: {this.state.setInfo.flashSetDescription}</h4>
                    <h4>Visibility: {this.state.setInfo.flashSetVisibility}</h4>
                    <br />
                    <a href={editUrl}>Edit</a>
                    <br/>
                    <a href={memorizeUrl}>Memorize</a>
                    <br />
                    <hr />
                    <div>
                        <input type="radio" value="Title" name="Title" checked={this.state.showSetTitleSide} onChange={this.radioChange}/> Title
                        <input type="radio" value="Definition" name="Definition" checked={!this.state.showSetTitleSide} onChange={this.radioChange}/> Definition
                    </div>
                    <div>
                        <SwitchField label="Randomize" onChange={() => this.randomOrderToggle()} />
                    </div>
                    <br />
                    <p className="showingSide">{this.state.currentCardOnFront ? frontHeader : backHeader}</p>
                    <p className="cardIndex">{this.state.index+1} / {this.state.setInfo.titles.length}</p>
                    <FlipFlashcard key={this.state.index} front={front} back={back} frontSide={this.state.currentCardOnFront} swapSide={this.swapSide}/>
                    <div className="card_buttons">
                        <div className="prev_button" onClick={() => {this.previousCard()}}>Previous</div>
                        <div className="next_button" onClick={() => {this.nextCard()}}>Next</div>
                    </div>
                </div>
            )
         }
      }
}

export default BrowseSet;