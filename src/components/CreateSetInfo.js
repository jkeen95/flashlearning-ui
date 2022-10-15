import React from "react";
import Flashcard from "./Flashcard";
import {DataStore} from 'aws-amplify'
import {FlashcardSet} from "../models";

class CreateSetInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flashSetName: '',
            flashSetVisibility: 'public',
            flashSetDescription: '',
            count: 1,
            titles: [],
            definitions: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({flashSetName: event.target.value});
    }

    handleVisibilityChange(event) {
        this.setState({flashSetVisibility: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({flashSetDescription: event.target.value});
    }

    handleTitleChange = (event, index) =>{
        const updatedTitles = this.state.titles.map((title, i) => {
            if(index === i) {
                title = event.target.value;
                return title;
            }
            return title;
        });
        this.setState({titles: updatedTitles})
    }

    handleDefChange = (event, index) =>{
        const updatedDefinitions = this.state.definitions.map((def, i) => {
            if(index === i) {
                def = event.target.value;
                return def;
            }
            return def;
        });
        this.setState({definitions: updatedDefinitions})
    }


    async handleSubmit(event) {
        event.preventDefault();
        await this.saveFlashcardSet();
    }

    async saveFlashcardSet() {
        const flashSetTitles = this.state.titles.filter(title => title !== "");
        const flashSetDefs = this.state.definitions.filter(def => def !== "");

        console.log(flashSetTitles)
        console.log(flashSetDefs)

        await DataStore.save(
            new FlashcardSet({
                name: this.state.flashSetName,
                description: this.state.flashSetDescription,
                visibility: this.state.flashSetVisibility,
                owner: this.props.currentUser.username,
                titles: flashSetTitles,
                definitions: flashSetDefs,
            })
        ).then(result => {
            console.log(JSON.stringify(result))
            alert('A new flashcard set was saved: ' + this.state.flashSetName + "\n" +
                'A visibility was saved: ' + this.state.flashSetVisibility + "\n" +
                'A description was saved: ' + this.state.flashSetDescription + "\n" +
                'Flashcard titles were saved: ' + JSON.stringify(flashSetTitles) + "\n" +
                'Flashcard definitions were saved: ' + JSON.stringify(flashSetDefs) + "\n"
            );
            const url = "" + window.location.origin + "/set/" + result.id + "/browse";
            console.log(url)
            window.location.replace(url)
        });
    }

    addFlashcard = () => {
        this.setState({
            titles: [...this.state.titles, ""],
            definitions: [...this.state.definitions, ""],
        })
        console.log("count " + this.state.count)
        this.state.count++
    }

    componentDidMount() {
        if(this.state.titles.length === 0) {
            this.state.count = 1;
            this.state.titles = [];
            this.state.definitions = [];
            this.setState({
                titles: [...this.state.titles, ""],
                definitions: [...this.state.definitions, ""],
            });
            this.addFlashcard();
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input type="text" onBlur={this.handleNameChange} />
                    </label>
                    <label>
                        Visibility:
                        <select value={this.state.flashSetVisibility} onChange={this.handleVisibilityChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea value={this.state.flashSetDescription} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                <br/>
                <hr/>
                <br/>
                {this.state.titles.map((title, index) => {
                    console.log(JSON.stringify(title))
                    return (
                        <Flashcard key={index} index={index} handleTitleChange={this.handleTitleChange} handleDefChange={this.handleDefChange} title={title} definition={this.state.definitions[index]}/>
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

export default CreateSetInfo;