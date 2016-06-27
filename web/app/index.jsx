import React, {Component} from 'react';
import padStart from 'lodash/padStart';
import moment from 'moment';

export default class App extends Component {
  state = {
    started: false,
    paused: false,
    hours: 0,
    minutes: 0,
    start: 0,
    end: 0,
    elapsed: 0,
    remaining: 0
  };

  timer = null;

  render() {
    const {started, paused, remaining, elapsed, start, end, ...state} = this.state;
    const hours = started ? parseInt(remaining / (60 * 60 * 1000)) : state.hours;
    const minutes = started ? parseInt(remaining / (60 * 1000) % 60) : state.minutes;
    // The calculation for the circular progress bar percentage
    // Raw Percentage: (elapsed time / time range) * 100
    const range = end - start;
    const value = Math.round((elapsed / range) * 100);
    // 816.81 [c] = Math.PI * (130 [r] * 2)
    const percentage = started ? 816.81 - (((100 - value) / 100) *  816.81) : 816.81;

    return (
      <div className="container">
        <div>
          <div className="timer">
            <svg className="timer-progress-bar" viewPort="0 0 135 135" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle className="timer-progress-bar__bg" r="130" cx="135" cy="135" fill="transparent" strokeDasharray="816.81" strokeDashoffset="0"></circle>
              <circle className="timer-progress-bar__bar" r="130" cx="135" cy="135" fill="transparent" strokeDasharray="816.81" strokeDashoffset="0" style={{ strokeDashoffset: percentage }}></circle>
            </svg>

            <div className="timer__inner">
              <div className="timer__unit">
                <input className="timer__unit-input" type="text" placeholder="0" value={hours} onChange={(evt) => this.setState({ hours: evt.target.value })} />
                <h5 className="timer__unit-sub">Hours</h5>
              </div>

              <div className="timer__unit">
                <input className="timer__unit-input" type="text" placeholder="00" value={minutes} onChange={(evt) => this.setState({ minutes: evt.target.value })} />
                <h5 className="timer__unit-sub">Minutes</h5>
              </div>
            </div>
          </div>

          <div className="timer-actions">
            {!started ?
              <div className="timer-actions__action">
                <button className="btn btn--success" onClick={this.handleStart}>
                  Start
                </button>
              </div> : null}

            {started ?
              <div className="timer-actions__action">
                {paused
                  ? <button className="btn btn--default">Pause</button>
                  : <button className="btn btn--default">Resume</button>}
              </div> : null}

            {started ?
              <div className="timer-actions__action">
                <button className="btn btn--danger" onClick={this.handleStop}>
                  Stop
                </button>
              </div> : null}
          </div>
        </div>
      </div>
    );
  }

  handleStart = () => {
    const {hours, minutes} = this.state;
    const end = moment().add(hours, 'hours').add(minutes, 'minutes');

    this.setState({
      started: true,
      start: moment().valueOf(),
      end: end.valueOf(),
      elapsed: 0,
      remaining: end.diff(moment())
    }, () => {
      this.timer = setInterval(() => {
        const now = moment();
        const remaining = moment(this.state.end).diff(now);
        const elapsed = now.diff(moment(this.state.start));

        if ( remaining <= 0 ) {
          this.setState({
            started: false,
            end: 0,
            elapsed: 0,
            remaining: 0
          });

          clearInterval(this.timer);
        } else {
          this.setState({
            remaining,
            elapsed
          });
        }
      }, 1000);
    });
  }

  handleStop = () => {
    clearInterval(this.timer);

    this.setState({
      started: false,
      end: 0,
      remaining: false
    });
  }
}
