import React, { Component } from 'react';

export default class App extends Component {
  state = {
    hours: 0,
    minutes: 0
  };

  render() {
    return (
      <div className="container">
        <div>
          <div className="timer">
            <svg className="timer-progress-bar" viewPort="0 0 135 135" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle className="timer-progress-bar__bg" r="130" cx="135" cy="135" fill="transparent"></circle>
              <circle className="timer-progress-bar__bar" r="130" cx="135" cy="135" fill="transparent" strokeDasharray="565.48"></circle>
            </svg>

            <div className="timer__inner">
              <div className="timer__unit">
                <input className="timer__unit-input" type="text" placeholder="0" />
                <h5 className="timer__unit-sub">Hours</h5>
              </div>

              <div className="timer__unit">
                <input className="timer__unit-input" type="text" placeholder="00" />
                <h5 className="timer__unit-sub">Minutes</h5>
              </div>
            </div>
          </div>

          <div className="timer-actions">
            <div className="timer-actions__action">
              <button className="btn btn--success">
                Start
              </button>
            </div>

            <div className="timer-actions__action">
              <button className="btn btn--default">
                Pause
              </button>
            </div>

            <div className="timer-actions__action">
              <button className="btn btn--danger">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
