import React from "react";
import FlashcardTitle from "./FlashcardTitle";
import FlashcardDefinition from "./FlashcardDefinition";

class Flashcard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <FlashcardTitle index={this.props.index} handleTitleChange={this.props.handleTitleChange} title={this.props.title}/>
                <FlashcardDefinition index={this.props.index} handleDefChange={this.props.handleDefChange} definition={this.props.definition}/>
            </div>
        );
    }
}

export default Flashcard;