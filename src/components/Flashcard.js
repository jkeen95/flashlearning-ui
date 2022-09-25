import React from "react";
import FlashcardTitle from "./FlashcardTitle";
import FlashcardDefinition from "./FlashcardDefinition";

class Flashcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {setName: '',
            setVisibility: '',
            setDescription: ''
        };

    }

    render() {
        return (
            <div>
                <FlashcardTitle />
                <FlashcardDefinition />
            </div>
        );
    }
}

export default Flashcard;