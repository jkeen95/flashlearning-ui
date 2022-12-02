import React from "react";
import FlashcardInput from "./FlashcardInput";
import {removeEmpties} from "../utils/utils";

class EditableSetInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setInfo: {
                flashSetName: this.props.setInfo.flashSetName,
                flashSetVisibility: this.props.setInfo.flashSetVisibility,
                flashSetDescription: this.props.setInfo.flashSetDescription,
                titles: this.props.setInfo.titles,
                definitions: this.props.setInfo.definitions
            },
            duplicates: [],
            blankNameError: false,
            flashcardError: false

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleNameChange(event) {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                flashSetName: event.target.value
            }
        }));
    }

    handleDescriptionChange(event) {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                flashSetDescription: event.target.value
            }
        }));
    }

    handleTitleChange = (event, index) => {
        const updatedTitles = this.state.setInfo.titles.map((title, i) => {
            if(index === i) {
                title = event.target.value;
                return title;
            }
            return title;
        });
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                titles: updatedTitles
            }
        }));
    }

    handleDefChange = (event, index) =>{
        const updatedDefinitions = this.state.setInfo.definitions.map((def, i) => {
            if(index === i) {
                def = event.target.value;
                return def;
            }
            return def;
        });
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                definitions: updatedDefinitions
            }
        }));
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const response = removeEmpties(this.state.setInfo.titles, this.state.setInfo.definitions)

        if(this.state.setInfo.flashSetName === "") {
            await this.setState({
                blankNameError: true
            })
        }
        else {
            await this.setState({
                blankNameError: false
            })
        }
        if(response.validTitles.length === 0 ) {
            await this.setState({
                flashcardError: true
            })
        }
        else {
            await this.setState({
                flashcardError: false
            })
        }

        if(!this.state.blankNameError && !this.state.flashcardError) {
            let tempObj = this.state.setInfo
            tempObj.titles = response.validTitles
            tempObj.definitions = response.validDefs
            this.props.handleSubmit(tempObj)
        }
    };

    checkForDuplicates = () => {
        const tempArray = this.state.setInfo.titles
        let titleIndices = {}

        this.state.setInfo.titles.filter((title, index) => {
            if(title === "") return
            if(title in titleIndices) {
                titleIndices[title].push(index)
            }
            else {
                titleIndices[title] = [index]
            }
        })

        let duplicateIndices = []
        Object.values(titleIndices).filter(indices => {
            if(indices.length > 1) {
                indices.filter(index => {
                    duplicateIndices.push(index)
                })
            }
        })
        this.setState({duplicates : duplicateIndices})
    }

    addFlashcard = () => {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                titles: [...this.state.setInfo.titles, ""],
                definitions: [...this.state.setInfo.definitions, ""],
            }
        }));
        this.state.count++
    }

    deleteCard = async (index) => {
        let tempTitles = [...this.state.setInfo.titles]
        let tempDefs = [...this.state.setInfo.definitions]
        if(tempTitles.length === 1 && index === 0) {
            tempTitles = [""];
            tempDefs = [""];
        }
        else {
            console.log(tempTitles)
            tempTitles.splice(index, 1)
            tempDefs.splice(index, 1)
        }
        await this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                titles: tempTitles,
                definitions: tempDefs,
            }
        }));
        await this.checkForDuplicates()
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input placeholder="Set Name" value={this.state.setInfo.flashSetName} type="text" onChange={this.handleNameChange} onBlur={this.handleNameChange} />
                    </label>
                    <label>
                        Description:
                        <textarea placeholder="Description" value={this.state.setInfo.flashSetDescription} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                {this.state.blankNameError ? <p className="errorMessage">The set must have a name</p> : ""}
                <br/>
                <hr/>
                <br/>
                {this.state.setInfo.titles.map((title, index) => {
                    return (
                        <div className="deleteFlashcard">
                            <FlashcardInput duplicateTitle={this.state.duplicates.includes(index)} key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} checkForDuplicates={this.checkForDuplicates} title={title} definition={this.state.setInfo.definitions[index]}/>
                            <button type="button" onClick={() => this.deleteCard(index)}>Delete Flashcard</button>
                        </div>
                    )
                })}
                {this.state.flashcardError ? <p className="errorMessage">At Least One Complete Flashcard is Required</p> : ""}
                <br />
                <button type="button" onClick={this.addFlashcard}>Add Flashcard</button>
                <br/>
                <br/>
                <input type="submit" value="Submit" disabled={this.state.duplicates.length > 0} />
            </form>
        </div>;
    }
}

export default EditableSetInfo;