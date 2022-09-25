import React from "react";

class FlashcardDefinition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {setDef: ''};

        this.handleDefChange = this.handleDefChange.bind(this);
    }

    handleDefChange(event) {
        this.setState({setDef: event.target.value});
    }

    render() {
        return <input type="text" value={this.state.setDef} onChange={this.handleDefChange} placeholder="Definition"/>;
    }
}

export default FlashcardDefinition;