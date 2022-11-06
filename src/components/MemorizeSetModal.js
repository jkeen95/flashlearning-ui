import React from "react";

const MemorizeSetModal = props => {
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">How do you want to memorize this flashcard set?</h2>
                </div>
                <div className="modal-body">
                    <label><h4>What order?</h4></label>
                    <div>
                        <input type="radio" value="Original" name="Original" /> Title&nbsp;
                        <input type="radio" value="Random" name="Random" /> Definition
                    </div>
                    <br />
                    <label><h4>With Repetition?</h4></label>
                    <div>
                        <input type="checkbox" value="Repetition" name="Repetition" /> Repetition
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-button">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MemorizeSetModal