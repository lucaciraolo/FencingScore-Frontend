import React, { Component } from 'react';




class Score extends Component {
    constructor(props) {
        super(props);
        this.ScoreStyle = {
            fontSize: `100px`,
            display: `inline-block`,
            color: props.color
        }
    }

    render() {
        return (
            <div onClick={this.props.onClick} style={this.ScoreStyle}>{this.props.value}</div>
        )
    }
};

export default Score;