import React, { PureComponent } from 'react';
import moment from 'moment';
import autobind from 'react-autobind';

export default class Timer extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);

    const { length } = this.props;
    const duration = moment.duration(length || '3minutes');
    this.lengthInMilliseconds = duration.asMilliseconds();
    this.state = {
      timeLeft: this.lengthInMilliseconds,
      started: false,
    };
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 1);

    this.setState(state => ({
      start: Date.now() - (this.lengthInMilliseconds - state.timeLeft),
      started: true,
    }));
  }

  tick() {
    const { timeLeft } = this.state;
    if (timeLeft === 0) this.stopTimer();

    this.setState((state) => {
      const delta = Date.now() - state.start;
      const newTimeLeft = this.lengthInMilliseconds - delta;

      return { timeLeft: newTimeLeft < 0 ? 0 : newTimeLeft };
    });
  }

  stopTimer() {
    this.setState({
      started: false,
    });
    clearInterval(this.intervalHandle);
  }

  toggleTimer() {
    const { started } = this.state;
    if (started) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  render() {
    const { timeLeft } = this.state;
    const duration = moment.duration(timeLeft);
    const values = [duration.minutes(), duration.seconds(), duration.milliseconds()];
    const paddedValues = values.map(value => value.toString().padStart(2, '0'));
    return (
      <button onClick={this.toggleTimer} onKeyPress={this.toggleTimer} type="button">{paddedValues.join(':')}</button>
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
  length: '3minutes',
};
