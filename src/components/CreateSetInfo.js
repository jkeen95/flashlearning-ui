import React, {useState} from "react";
import Flashcard from "./Flashcard";

class CreateSetInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {setName: '',
            setVisibility: '',
            setDescription: '',
            count: 1,
            flashcards: [<Flashcard key={1}/>]
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({setName: event.target.value});
    }

    handleVisibilityChange(event) {
        this.setState({setVisibility: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({setDescription: event.target.value});
    }


    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.setName + "\n" +
            'A visibility was submitted: ' + this.state.setVisibility + "\n" +
            'A description was submitted: ' + this.state.setDescription + "\n"
        );
        event.preventDefault();
    }

    addFlashcards = () => {
        this.state.count++
        this.setState({
            flashcards: [...this.state.flashcards, <Flashcard key={this.state.count}/>]
        })
        console.log("count " + this.state.count)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("createset update")
    }

    updateCount() {
        this.state.count = (this.state.count++)
        console.log("updateCount " + this.state.count)
    }

    render() {

        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Set Name:
                        <input type="text" value={this.state.setName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Visibility:
                        <select value={this.state.setVisibility} onChange={this.handleVisibilityChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea value={this.state.setDescription} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                <br/>
                <hr/>
                <br/>
                {this.state.flashcards}
                <button type="button" onClick={this.addFlashcards}>Add Flashcard</button>
                <br/>
                <hr/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>;
    }
}

export default CreateSetInfo;