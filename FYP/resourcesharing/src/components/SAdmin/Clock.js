import React, { Fragment } from "react";

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <Fragment>
      <div id="timer">
        <span id="days">{timerDays}</span>days
        <span id="hours">{timerHours}</span>hours
        <span id="minutes">{timerMinutes}</span>minutes
        <span id="seconds">{timerSeconds}</span>seconds
      </div>

    </Fragment>
  );
};


export default Clock;