import React from "react";
import FlashcardTitleInput from "./FlashcardTitleInput";
import FlashcardDefinitionInput from "./FlashcardDefinitionInput";

class FlashcardInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flashcardInputDiv">
                {this.props.index+1}.
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FlashcardTitleInput duplicateTitle={this.props.duplicateTitle} index={this.props.index} handleTitleChange={this.props.handleTitleChange} checkForDuplicates={this.props.checkForDuplicates} title={this.props.title}/>
                <FlashcardDefinitionInput index={this.props.index} handleDefChange={this.props.handleDefChange} definition={this.props.definition}/>
                &nbsp;&nbsp;
                {this.props.duplicateTitle ? <p className="duplicateMessage">Duplicate Titles are not allowed</p> : ""}
            </div>
        );
    }
}

export default FlashcardInput;