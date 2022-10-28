import React from "react";
import FlashcardInput from "./FlashcardInput";

class EditableSetInfo extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            setInfo: {
                flashSetName: this.props.setInfo.flashSetName,
                flashSetVisibility: this.props.setInfo.flashSetVisibility,
                flashSetDescription: this.props.setInfo.flashSetDescription,
                titles: this.props.setInfo.titles,
                definitions: this.props.setInfo.definitions
            }
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

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.setInfo)
        this.props.handleSubmit(this.state.setInfo)
    };

    checkForDuplicates = (event, index) => {
        console.log(this.state.setInfo.titles)
        console.log(this.state.setInfo.titles[index])
    }

    addFlashcard = () => {
        this.setState(prevState => ({
            setInfo: {
                ...prevState.setInfo,
                titles: [...this.state.setInfo.titles, ""],
                definitions: [...this.state.setInfo.definitions, ""],
            }
        }));
        console.log("count " + this.state.count)
        this.state.count++
    }

    render() {
        console.log(JSON.stringify(this.state.setInfo.flashSetDescription))
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
                <br/>
                <hr/>
                <br/>
                {this.state.setInfo.titles.map((title, index) => {
                    console.log(JSON.stringify(title))
                    return (
                        <FlashcardInput key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} checkForDuplicates={this.checkForDuplicates} title={title} definition={this.state.setInfo.definitions[index]}/>
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

export default EditableSetInfo;