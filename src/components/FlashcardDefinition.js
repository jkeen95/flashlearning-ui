import React from "react";

class FlashcardDefinition extends React.Component {
    constructor(props) {
        super(props);

        //this.handleDefChange = this.handleDefChange.bind(this);
    }

    // handleDefChange(event) {
    //     this.setState({setDef: event.target.value});
    // }

    handleDefChange = (event, index) => {
        console.log("lower event " + index)
        this.props.handleDefChange(event, index)
    };

    render() {
        return <input type="text" value={this.props.definition} onChange={event => this.handleDefChange(event, this.props.index)} placeholder="Definition"/>;
    }
}

export default FlashcardDefinition;