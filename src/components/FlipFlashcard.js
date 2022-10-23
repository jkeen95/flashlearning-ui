import React from "react";

class FlipFlashcard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={`card ${this.props.frontSide ? 'flip' : ''}`} onClick={this.props.swapSide}>
                    <div className={`${this.props.frontSide ? 'front' : 'back'}`}>{this.props.frontSide ? this.props.front : this.props.back}</div>
                </div>
            </div>
        )
    }
}

export default FlipFlashcard;