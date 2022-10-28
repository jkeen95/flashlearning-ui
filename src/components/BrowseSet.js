import React from "react";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField, ToggleButton} from "@aws-amplify/ui-react";

class BrowseSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {
                flashSetName: '',
                flashSetVisibility: 'public',
                flashSetDescription: '',
                titles: [],
                definitions: [],
                flashSetId: ""
            },
            fetchedSets: [],
            index: 0,
            currentCardOnFront: true,
            showSetTitleSide: true,
            flashcardsToBrowse: [],
            originalOrderFlashcards: [],
            randomizeOn: true
        };
    }


    componentDidMount() {
        this.fillSetInformation()
    }

    async fetchSetInformation() {
        console.log(this.props.setId.id)
        console.log(this.props.currentUser.username)
        // return await DataStore.query(FlashcardSet, (set) =>
        //     set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        // )
        await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.props.currentUser.username)
        ).then(result =>{
            console.log(JSON.stringify(result))
            this.state.setInfo.flashSetId = result[0].id
            console.log("after fetch " + JSON.stringify(this.state))
            console.log(JSON.stringify(this.state.fetchedSets))
        })
    }

    // async fillSetInformation() {
    //     const currentSet = await this.fetchSetInformation()
    //     console.log("fillCurrentSet info " + JSON.stringify(currentSet))
    //     // this.setState(prevState => ({
    //     //     setInfo: {
    //     //         ...prevState.setInfo,
    //     //         flashSetName: currentSet[0].name,
    //     //         flashSetVisibility: currentSet[0].visibility,
    //     //         flashSetDescription: currentSet[0].description,
    //     //         titles: currentSet[0].titles,
    //     //         definitions: currentSet[0].definitions,
    //     //         flashSetId: currentSet[0].id
    //     //     },
    //     //     ...prevState.index,
    //     //     ...prevState.currentCardOnFront
    //     //
    //     // }));
    //     this.setState({
    //         setInfo: {
    //             ...this.state.setInfo,
    //             flashSetName: currentSet[0].name,
    //             flashSetVisibility: currentSet[0].visibility,
    //             flashSetDescription: currentSet[0].description,
    //             titles: currentSet[0].titles,
    //             definitions: currentSet[0].definitions,
    //             flashSetId: currentSet[0].id
    //         }
    //     });
    //     console.log(currentSet)
    //     console.log("before original" + JSON.stringify(this.state.setInfo))
    //     this.formOriginalOrderFlashcardsToBrowse()
    //     console.log(this.state.setInfo)
    // }

    async fillSetInformation() {
        const currentSet = await this.fetchSetInformation()
        console.log(JSON.stringify(currentSet))
        // this.setState(prevState => ({
        //     setInfo: {
        //         ...prevState.setInfo,
        //         flashSetName: currentSet[0].name,
        //         flashSetVisibility: currentSet[0].visibility,
        //         flashSetDescription: currentSet[0].description,
        //         titles: currentSet[0].titles,
        //         definitions: currentSet[0].definitions
        //     }
        // }));
        // this.setState({
        //     fetchedSets: currentSet
        // })
        console.log("after setstate " + JSON.stringify(this.state))
        console.log(JSON.stringify(this.state.fetchedSets))
    }

    swapSide = () => {
        console.log(this.state)
        this.setState({currentCardOnFront: !this.state.currentCardOnFront})
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
        console.log("next")
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
          if(this.state.originalOrderFlashcards.length === 0) {
              //console.log("inside")
            const originalOrderFlashcards = this.state.setInfo.titles.map((title, index) => {
                const card = {}
                card["title"] = title
                card["definition"] = this.state.setInfo.definitions[index]
                return card
            })
            this.state.flashcardsToBrowse = originalOrderFlashcards
            this.state.originalOrderFlashcards = JSON.parse(JSON.stringify(originalOrderFlashcards))
          }
          else
            this.state.flashcardsToBrowse = JSON.parse(JSON.stringify(this.state.originalOrderFlashcards))
        console.log("original " + JSON.stringify(this.state.flashcardsToBrowse));
    }

    formRandomOrderFlashcardsToBrowse = () => {
        const originalOrderFlashcards = this.state.originalOrderFlashcards
        let currentRange = this.state.flashcardsToBrowse.length
        //console.log("checkhere " + JSON.stringify(originalOrderFlashcards)===JSON.stringify(this.state.flashcardsToBrowse))
         //do {
             while (currentRange !== 0) {
                 const index = Math.floor(Math.random() * currentRange);
                 //console.log(index)
                 const temp = this.state.flashcardsToBrowse[index];
                 this.state.flashcardsToBrowse[index] = this.state.flashcardsToBrowse[currentRange - 1];
                 this.state.flashcardsToBrowse[currentRange - 1] = temp;
                 currentRange = currentRange - 1;
             }
        // }while(JSON.stringify(originalOrderFlashcards)===JSON.stringify(this.state.flashcardsToBrowse))
        console.log("random " + JSON.stringify(this.state.flashcardsToBrowse));
    }

    randomOrderToggle = () => {
        console.log(JSON.stringify(this.state))
        this.setState({randomizeOn: !this.state.randomizeOn})
        console.log(JSON.stringify(this.state))
        console.log(this.state.randomizeOn)
        if(this.state.randomizeOn) {
            this.formRandomOrderFlashcardsToBrowse();
        }
        else {
            this.formOriginalOrderFlashcardsToBrowse();
        }
    }

    render() {
        console.log("flascardtobrowse " + JSON.stringify(this.state.flashcardsToBrowse))
        if(this.state.flashcardsToBrowse.length !== 0) {
            const frontHeader = this.state.showSetTitleSide ? "Title" : "Definition"
            const backHeader = this.state.showSetTitleSide ? "Definition" : "Title"
            const editUrl = "" + window.location.origin +"/set/" + this.state.setInfo.flashSetId + "/edit"
            const memorizeUrl = "" + window.location.origin + "/set/" + this.state.setInfo.flashSetId + "/memorize";
            const front = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].title : this.state.flashcardsToBrowse[this.state.index].definition;
            const back = this.state.showSetTitleSide ? this.state.flashcardsToBrowse[this.state.index].definition : this.state.flashcardsToBrowse[this.state.index].title;
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
                    <p>{this.state.currentCardOnFront ? frontHeader : backHeader}</p>
                    <p>{this.state.index+1} / {this.state.setInfo.titles.length}</p>
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