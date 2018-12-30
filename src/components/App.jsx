import React, { PureComponent } from 'react';

import Score from './Score';
import Timer from './Timer';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      leftScore: 0,
      rightScore: 0,
    };
  }

  incrementScore(side) {
    if (side === 'left') {
      this.setState(state => ({ leftScore: state.leftScore + 1 }));
    } else {
      this.setState(state => ({ rightScore: state.rightScore + 1 }));
    }
  }

  render() {
    const { leftScore, rightScore } = this.state;
    return (
      <div style={{ display: 'block' }}>
        <Score value={leftScore} onClick={() => this.incrementScore('left')} color="red" />
        <Score value={rightScore} onClick={() => this.incrementScore('right')} color="green" />
        <Timer length="3minutes" />
      </div>
    );
  }
}

export default App;
