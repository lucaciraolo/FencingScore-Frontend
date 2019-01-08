import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export default class Timer extends PureComponent {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);

    const { length } = this.props;
    this.lengthInMilliseconds = moment.duration(length).asMilliseconds();

    this.state = {
      start: 0,
      timeLeft: this.lengthInMilliseconds,
      started: false,
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('startTimer', ({ newStart }) => {
      this.startTimer(newStart);
    });

    socket.on('stopTimer', ({ timeLeft }) => {
      console.log('stopTimer event recieved');
      this.stopTimer(timeLeft);
    });
  }

  startTimer(newStart) {
    this.intervalHandle = setInterval(this.tick, 10);

    this.setState({
      start: newStart,
      started: true,
    });
  }

  tick() {
    const { timeLeft } = this.state;
    if (timeLeft === 0) {
      navigator.vibrate(400);
      this.stopTimer();
    }

    this.setState((state) => {
      const delta = Date.now() - state.start;
      const newTimeLeft = this.lengthInMilliseconds - delta;

      return { timeLeft: newTimeLeft < 0 ? 0 : newTimeLeft };
    });
  }

  stopTimer(timeLeft) {
    clearInterval(this.intervalHandle);
    this.setState({ started: false, timeLeft });
  }

  toggleTimer() {
    const { started, timeLeft } = this.state;
    if (started) {
      this.props.socket.emit('stopTimer', { timeLeft });
      this.stopTimer(timeLeft);
    } else {
      const newStart = Date.now() - (this.lengthInMilliseconds - timeLeft);
      this.props.socket.emit('startTimer', { newStart });
      this.startTimer(newStart);
    }
    navigator.vibrate(200);
  }

  render() {
    const { timeLeft } = this.state;
    const duration = moment.duration(timeLeft);
    const values = [duration.minutes(), duration.seconds(), duration.milliseconds()];
    const paddedValues = values.map(value => value.toString().slice(0, 2).padStart(2, '0'));
    return (
      <div onClick={this.toggleTimer} onKeyPress={this.toggleTimer} className={this.props.className} role="button" tabIndex={0}>{paddedValues.join(':')}</div>
    );
  }
}

Timer.propTypes = {
  length(props, propName, componentName) {
    const { [propName]: inputLength } = props;
    if (!moment.duration(inputLength).isValid()) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`);
    }
    return null;
  },
};

Timer.defaultProps = {
  length: { minutes: 3 },
};

export const StyledTimer = styled(Timer)`
  font-size: 7em;
  text-align: center;
`;
