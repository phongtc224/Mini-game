import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

Clock.propTypes = {
    initialHours: PropTypes.number,
    initialMinutes: PropTypes.number,
    initialSeconds: PropTypes.number,
};

Clock.defaultProps = {
    initialHours: 0,
    initialMinutes: 0,
    initialSeconds: 0,
};
const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    seconds === 60 && minutes++;
    minutes === 60 && hours++;
    return `${checkTime(hours)}:${checkTime(minutes)}:${checkTime(seconds)}`;
};

const checkTime = (time) => {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
};

function Clock({ date }) {
    const time = new Date(date);

    const [timeString, setTimeString] = useState("00:00:00");
    useEffect(() => {
        setInterval(() => {
            time.setSeconds(time.getSeconds() + 1);
            setTimeString(formatTime(time));
        }, 1000);
    }, []);

    return <span>{timeString}</span>;
}

export default Clock;
