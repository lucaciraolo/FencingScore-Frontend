import React, { Component } from 'react';

class Timer extends Component {
    state = {
        start: 0,
        time: 0,
        started: false,
        totalMilliseconds: 1000 * 60 * 3,
    }

    toggleTimer() {
        if (!this.state.started) {
            //start
            this.intervalHandle = setInterval(() => {
                this.setState({time: Date.now() - this.state.start})
            }, 1)

            this.setState({
                start: Date.now() - this.state.time,
                started: true,
            });
        } else {
            //stop
            this.setState({
                started: false
            });
            clearInterval(this.intervalHandle);
        }
    }

    render() {
        return (
            <div onClick={() => this.toggleTimer()}>{this.state.totalMilliseconds - this.state.time}</div>
        )
    }

    
}

export default Timer;