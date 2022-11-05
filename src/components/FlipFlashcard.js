import React from "react";

class FlipFlashcard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardHeight: 0,
            cardWidth: 0
        };
        this.frontRef = React.createRef();
        this.backRef = React.createRef();
    }

    setMaxHeight = () => {
        // const  cardHeight = this.props.cardRef.current.getBoundingClientRect().height
        // console.log("height ---- " + cardHeight)
    }

    componentDidMount() {
        const frontHeight = this.frontRef.current.getBoundingClientRect().height
        const backHeight = this.backRef.current.getBoundingClientRect().height
        // const frontWidth = this.frontRef.current.getBoundingClientRect().width
        // const backWidth = this.backRef.current.getBoundingClientRect().width
        console.log("frontheight ---- " + frontHeight)
        console.log("backheight ---- " + backHeight)
        this.setState({
            cardHeight: Math.max(frontHeight+5, backHeight+5, 500)
        })
    }

    render() {
        return (
            <div className="contaainer">
                <div className="card-grid">
                    <div style={{height: this.state.cardHeight}} className={`card ${this.props.frontSide ? 'flip' : ''}`} onClick={this.props.swapSide}>
                        <div className={`${this.props.frontSide ? 'front' : 'back'}`}>{this.props.frontSide ? this.props.front : this.props.back}</div>
                        <div className="heightDiv" ref={this.frontRef}>{this.props.front}</div>
                        <div className="heightDiv" ref={this.backRef}>{this.props.back}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlipFlashcard;