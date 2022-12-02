import React from "react";

class FlashcardDefinitionInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDefChange = (event, index) => {
        this.props.handleDefChange(event, index)
    };

    render() {
        return <input type="text" value={this.props.definition} onChange={event => this.handleDefChange(event, this.props.index)} placeholder="Definition"/>;
    }
}

export default FlashcardDefinitionInput;