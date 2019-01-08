import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

import { StyledScore } from './Score';
import { StyledTimer } from './Timer';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      leftScore: 0,
      rightScore: 0,
    };

    this.socket = socketIOClient('192.168.0.24:3001');
    this.socket.on('setScore', (data) => {
      const { side, score } = data;
      this.setState({ [`${side}Score`]: score });
    });
  }


  incrementScore(side) {
    if (side !== 'left' && side !== 'right') throw new Error('side must be "left" or "right" when incrementing score');
    this.setState((state) => {
      const score = state[`${side}Score`] + 1;
      this.socket.emit('setScore', { side, score });
      return { [`${side}Score`]: score };
    });
  }

  render() {
    const { leftScore, rightScore } = this.state;
    return (
      <div>
        <div>
          <StyledScore value={leftScore} onClick={() => this.incrementScore('left')} color="red" />
          <StyledScore value={rightScore} onClick={() => this.incrementScore('right')} color="green" />
        </div>
        <div>
          <StyledTimer length={{ minutes: 3 }} socket={this.socket} />
        </div>
      </div>
    );
  }
}
