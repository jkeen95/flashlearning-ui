import React from "react";

class FlashcardTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTitleChange = (event, index) => {
        this.props.handleTitleChange(event, index)
    };

    render() {
        return <input type="text" value={this.props.title} onChange={event => this.handleTitleChange(event, this.props.index)} placeholder="Title"/>;
    }
}

export default FlashcardTitle;