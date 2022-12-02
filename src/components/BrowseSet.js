import React from "react";
import FlipFlashcard from "./FlipFlashcard";
import {SwitchField} from "@aws-amplify/ui-react";
import {userExists} from "../utils/utils";
import {DataStore} from "aws-amplify";
import {FlashcardSet, SharedSet} from "../models";

class BrowseSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {
                flashSetName: this.props.setInfo.name,
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
            randomizeOn: true,
            showShare: false,
            userToShareWith: "",
            noInputError: false,
            alreadyOwnedError: false,
            alreadySharedError: false,
            userDosentExistError: false,
        };
    }

    async componentDidMount() {
        this.formOriginalOrderFlashcardsToBrowse()
    }

    swapSide = () => {
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

    formOriginalOrderFlashcardsToBrowse = async () => {
        if (this.state.originalOrderFlashcards.length === 0 && this.state.setInfo.titles !== undefined) {
            const originalOrder = this.state.setInfo.titles.map((title, index) => {
                const card = {}
                card["title"] = title
                card["definition"] = this.state.setInfo.definitions[index]
                return card
            })
            await this.setState({
                flashcardsToBrowse: originalOrder,
                originalOrderFlashcards: JSON.parse(JSON.stringify(originalOrder))
            })
        } else {
            await this.setState({
                flashcardsToBrowse: JSON.parse(JSON.stringify(this.state.originalOrderFlashcards))
            })
        }
    }

    formRandomOrderFlashcardsToBrowse = async () => {
        let currentRange = this.state.flashcardsToBrowse.length
        const tempArray = this.state.flashcardsToBrowse
        while (currentRange !== 0) {
            const index = Math.floor(Math.random() * currentRange);
            const temp = tempArray[index];
            tempArray[index] = tempArray[currentRange - 1];
            tempArray[currentRange - 1] = temp;
            currentRange = currentRange - 1;
        }
        await this.setState({
            flashcardsToBrowse: tempArray
        })
    }

    randomOrderToggle = async () => {
        this.setState({randomizeOn: !this.state.randomizeOn})
        if(this.state.randomizeOn) {
            await this.formRandomOrderFlashcardsToBrowse();
        }
        else {
            await this.formOriginalOrderFlashcardsToBrowse();
        }
    }

    handleUsernameChange = async (event) => {
        this.setState({userToShareWith: event.target.value})
    }

    showShareInput = async () => {
        await this.setState({showShare: !this.state.showShare})
    }

    alreadyOwned = async () => {
        return await DataStore.query(FlashcardSet, (set) =>
            set.id('eq', this.props.setId.id).owner('eq', this.state.userToShareWith)
        ).then(result => {
            console.log(result)
            if(result.length === 0)
                return false
            else
                return true
        }).catch(err => {
            return false;
        })
    }

    alreadyShared = async () => {
        return await DataStore.query(SharedSet, (set) =>
            set.setId('eq', this.props.setId.id).username('eq', this.state.userToShareWith)
        ).then(result => {
            if(result.length === 0)
                return false
            else
                return true
        }).catch(err => {
            return false;
        })
    }

    saveShareSet = async () => {
        return await DataStore.save(
            new SharedSet({
                setId: this.props.setId.id,
                username: this.state.userToShareWith,
            })
        ).then(result => {
            console.log(result)
            return true
        }).catch(err => {
            return false;
        })
    }

    shareSet = async () => {
        if(this.state.userToShareWith === "") {
            await this.setState({
                noInputError: true,
                alreadyOwnedError: false,
                alreadySharedError: false,
                userDosentExistError: false
            })
            return
        }

        const exists = await userExists(this.state.userToShareWith)
        let newlyShared = true

        if(!exists) {
            await this.setState({
                noInputError: false,
                alreadyOwnedError: false,
                alreadySharedError: false,
                userDosentExistError: true
            })
            return
        }

        const owned = await this.alreadyOwned()
        console.log(owned)
        if(owned) {
            await this.setState({
                noInputError: false,
                alreadyOwnedError: true,
                alreadySharedError: false,
                userDosentExistError: false
            })
            return
        }

        const shared = await this.alreadyShared()
        if(shared) {
            await this.setState({
                noInputError: false,
                alreadyOwnedError: false,
                alreadySharedError: true,
                userDosentExistError: false
            })
            return
        }

        newlyShared = await this.saveShareSet()
        console.log("newlyshared " + newlyShared)

        if(newlyShared) {
            alert("This set was shared with user: " + this.state.userToShareWith)
            await this.setState({
                noInputError: false,
                alreadyOwnedError: false,
                alreadySharedError: false,
                userDosentExistError: false
            })
        }
    }

    render() {
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
                    <hr />
                    <br />
                    <h4>ID: {this.state.setInfo.flashSetId}</h4>
                    <h4>Name: {this.state.setInfo.flashSetName}</h4>
                    {this.state.setInfo.flashSetDescription !== "" ? <h4>Description: {this.state.setInfo.flashSetDescription}</h4> : ""}
                    <br />
                    {this.props.sharedBol ? "" : <a href={editUrl}>Edit</a>}
                    {this.props.sharedBol ? "" : "  |  "}
                    <a href={memorizeUrl}>Memorize</a>
                    <br />
                    {this.props.sharedBol ? "" :  <br />}
                    {this.props.sharedBol ? "" :
                        <div>
                            <button onClick={() => this.showShareInput()}>Share With Another User</button>
                            <input hidden={!this.state.showShare} type="text" value={this.state.userToShareWith}  onChange={this.handleUsernameChange} placeholder="Username" />
                            <button hidden={!this.state.showShare} onClick={() => this.shareSet()}>Share</button>
                            {this.state.noInputError ? <p className="errorMessage">You Must Specify the Username to Share the Set With</p> : ""}
                            {this.state.alreadyOwnedError ? <p className="errorMessage">You cannot share a set with its owner</p> : ""}
                            {this.state.alreadySharedError ? <p className="errorMessage">This set has already been shared with this user</p> : ""}
                            {this.state.userDosentExistError ? <p className="errorMessage">This User Does Not Exist</p> : ""}
                        </div>
                    }
                    <br />
                    <hr />
                    <div>
                        <input type="radio" value="Title" name="Title" checked={this.state.showSetTitleSide} onChange={this.radioChange}/> Title
                        <input type="radio" value="Definition" name="Definition" checked={!this.state.showSetTitleSide} onChange={this.radioChange}/> Definition
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                        <SwitchField label="Randomize" onChange={() => this.randomOrderToggle()} />
                    </div>
                    <br/>
                    <div className="showingSideDiv">
                        <p className="showingSide">{"Showing the " + (this.state.currentCardOnFront ? frontHeader : backHeader) + " side"}</p>
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                        <p className="cardIndex">{this.state.index+1} / {this.state.setInfo.titles.length}</p>
                    </div>
                    <div className="browseControlDiv">
                        <FlipFlashcard key={this.state.index} front={front} back={back} frontSide={this.state.currentCardOnFront} swapSide={this.swapSide}/>
                        &ensp;&ensp;&ensp;
                        <div className="card_buttons">
                            <div className="prev_button" onClick={() => {this.previousCard()}}>Previous</div>
                            <div className="next_button" onClick={() => {this.nextCard()}}>Next</div>
                        </div>
                    </div>
                </div>
            )
         }
      }
}

export default BrowseSet;