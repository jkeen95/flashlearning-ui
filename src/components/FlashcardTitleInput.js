import React from "react";

class FlashcardTitleInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTitleChange = (event, index) => {
        this.props.handleTitleChange(event, index)
    };

    checkForDuplicates = (event, index) => {
        this.props.checkForDuplicates(event, index)
    };

    render() {
        return <input type="text" value={this.props.title} onChange={event => this.handleTitleChange(event, this.props.index)} onBlur={event => this.checkForDuplicates(event, this.props.index)} placeholder="Title"/>;
    }
}

export default FlashcardTitleInput;