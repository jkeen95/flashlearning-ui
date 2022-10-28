import React from "react";
import FlashcardInput from "./FlashcardInput";
import {removeEmpties} from "../utils/utils";
import {DataStore} from "aws-amplify";
import {FlashcardSet} from "../models";

class EditableSetInfo extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props)
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
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
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

    handleVisibilityChange(event) {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                flashSetVisibility: event.target.value
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
        //console.log(this.state.setInfo)
        const response = removeEmpties(this.state.setInfo.titles, this.state.setInfo.definitions)
        //console.log("response before submit " + JSON.stringify(response))

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
            //console.log("validdddddd")
            //alert("At Least One Complete Flashcard is Required")
            await this.setState({
                flashcardError: true
            })
        }
        else {
            await this.setState({
                flashcardError: false
            })
        }

        // console.log("blankNameError " + !this.state.blankNameError)
        // console.log("flashcardError " + !this.state.flashcardError)

        if(!this.state.blankNameError && !this.state.flashcardError) {
            //console.log("error inside")
            let tempObj = this.state.setInfo
            tempObj.titles = response.validTitles
            tempObj.definitions = response.validDefs
            this.props.handleSubmit(tempObj)
        }
        // this.props.handleSubmit(this.state.setInfo)
    };

    checkForDuplicates = () => {
        const tempArray = this.state.setInfo.titles
        const arr_size = tempArray.length
        // console.log(this.state.setInfo.titles)
        // console.log(this.state.setInfo.titles[index])
        let duplicateTracker = []
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
        //console.log(duplicateIndices)
        this.setState({duplicates : duplicateIndices})

        // console.log(JSON.stringify(titleIndices))
    }

    addFlashcard = () => {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                titles: [...this.state.setInfo.titles, ""],
                definitions: [...this.state.setInfo.definitions, ""],
            }
        }));
        //console.log("count " + this.state.count)
        this.state.count++
    }

    render() {
        //console.log(JSON.stringify(this.state.setInfo.flashSetDescription))
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input value={this.state.setInfo.flashSetName} type="text" onChange={this.handleNameChange} onBlur={this.handleNameChange} />
                    </label>
                    <label>
                        Visibility:
                        <select value={this.state.setInfo.flashSetVisibility} onChange={this.handleVisibilityChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea value={this.state.setInfo.flashSetDescription} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                {this.state.blankNameError ? <p className="errorMessage">The set must have a name</p> : ""}
                <br/>
                <hr/>
                <br/>
                {this.state.setInfo.titles.map((title, index) => {
                    // console.log(JSON.stringify(title))
                    // console.log(this.state.duplicates)
                    // console.log(index)
                    // console.log("checkthtissss " + JSON.stringify(this.state.duplicates.includes(index)) + "  " + title)
                    return (
                        <FlashcardInput duplicateTitle={this.state.duplicates.includes(index)} key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} checkForDuplicates={this.checkForDuplicates} title={title} definition={this.state.setInfo.definitions[index]}/>
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