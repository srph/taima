import React, {Component} from 'react';
import padStart from 'lodash/padStart';
import moment from 'moment';

export default class App extends Component {
  state = {
    started: false,
    paused: false,
    hours: 0,
    minutes: 0,
    total: 0,
    remaining: 0
  };

  timer = null;

  render() {
    const {started, paused, total, remaining, ...state} = this.state;
    const hours = started ? padStart(parseInt(remaining / 3600), 2, '0') : state.hours;
    const minutes = started ? padStart(parseInt(remaining % (60 * 60) / 60), 2, '0') : state.minutes;
    // Progress Bar Pecentage
    const elapsed = total - remaining;
    const percentage = started
      // 816.81 [c] = Math.PI * (130 [r] * 2)
      ? 816.81 - (((100 - ((elapsed / total) * 100)) / 100) * 816.81)
      : 816.81;

    return (
      <div>
        <audio ref="sound" style={{ display: 'none' }} autobuffer loop>
          <source src="http://e.ggtimer.com/styles/beepbeep.mp3" type="audio/mpeg" />
          <source src="http://e.ggtimer.com/styles/beepbeep.ogg" type="audio/ogg" />
        </audio>

        <div className="container">
          <div>
            <div className="timer">
              <svg className="timer-progress-bar" viewPort="0 0 135 135" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle className="timer-progress-bar__bg" r="130" cx="135" cy="135" fill="transparent" strokeDasharray="816.81" strokeDashoffset="0"></circle>
                <circle className="timer-progress-bar__bar" r="130" cx="135" cy="135" fill="transparent" strokeDasharray="816.81" strokeDashoffset="0" style={{ strokeDashoffset: percentage }}></circle>
              </svg>

              <div className="timer__inner">
                <div className="timer__unit">
                  <input className="timer__unit-input" type="text" placeholder="0" value={hours} onChange={(evt) => this.setState({ hours: evt.target.value })} disabled={started} />
                  <h5 className="timer__unit-sub">Hours</h5>
                </div>

                <div className="timer__unit">
                  <input className="timer__unit-input" type="text" placeholder="00" value={minutes} onChange={(evt) => this.setState({ minutes: evt.target.value })} disabled={started} />
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
      </div>
    );
  }

  handleStart = () => {
    const total = moment()
      .add(this.state.hours, 'hours')
      .add(this.state.minutes, 'minutes')
      .diff(moment(), 'seconds');

    this.setState({
      started: true,
      total,
      remaining: total
    }, () => {
      this.timer = setInterval(() => {
        const remaining = this.state.remaining - 1;

        if ( remaining <= 0 ) {
          this.refs.sound.play();

          clearInterval(this.timer);

          this.setState({
            started: false,
            total: 0,
            remaining: 0
          });
        } else {
          this.setState({ remaining });
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
