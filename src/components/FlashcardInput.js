import React from "react";
import FlashcardTitleInput from "./FlashcardTitleInput";
import FlashcardDefinitionInput from "./FlashcardDefinitionInput";

class FlashcardInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <FlashcardTitleInput index={this.props.index} handleTitleChange={this.props.handleTitleChange} title={this.props.title}/>
                <FlashcardDefinitionInput index={this.props.index} handleDefChange={this.props.handleDefChange} definition={this.props.definition}/>
            </div>
        );
    }
}

export default FlashcardInput;