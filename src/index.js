import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';

import Score from './components/Score';
import Timer from './components/Timer';

class App extends Component {
    state = {
        leftScore: 0,
        rightScore: 0
    }

    incrementScore(side) {
        console.log('incrementing');
        if (side === 'left') {
            this.setState({leftScore: this.state.leftScore + 1});
        } else {
            this.setState({rightScore: this.state.rightScore + 1});
        }
    }

    render() {
        return (
            <div style={{display: `block`}}>
                <Score value={this.state.leftScore} onClick={() => this.incrementScore('left')} color='red'/>
                <Score value={this.state.rightScore} onClick={() => this.incrementScore('right')} color='green'/>
                <Timer />
            </div>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('root'));
