import React from "react";

class MemorizeSetModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.handleSubmit()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">How do you want to memorize this flashcard set?</h2>
                        </div>
                        <div className="modal-body">
                            <label><h4>Which side?</h4></label>
                            <div>
                                <input type="radio" value="Title" name="Title" checked={this.props.titleSide}
                                       onChange={this.props.sideRadioChange}/> Title&nbsp;
                                <input type="radio" value="Definition" name="Definition" checked={!this.props.titleSide}
                                       onChange={this.props.sideRadioChange}/> Definition
                            </div>
                            <label><h4>What order?</h4></label>
                            <div>
                                <input type="radio" value="Original" name="Original" checked={this.props.originalOrder}
                                       onChange={this.props.orderRadioChange}/> Original&nbsp;
                                <input type="radio" value="Random" name="Random" checked={!this.props.originalOrder}
                                       onChange={this.props.orderRadioChange}/> Random
                            </div>
                            <br/>
                            <label><h4>With Repetition?</h4></label>
                            <div>
                                <input type="checkbox" value="Repetition" name="Repetition" onChange={this.props.checkboxChange}/> Repetition
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default MemorizeSetModal