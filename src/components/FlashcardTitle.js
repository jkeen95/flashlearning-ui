import React from "react";

class FlashcardTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {setTitle: ''};

        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({setTitle: event.target.value});
    }

    render() {
        return <input type="text" value={this.state.setTitle} onChange={this.handleTitleChange} placeholder="Title"/>;
    }
}

export default FlashcardTitle;