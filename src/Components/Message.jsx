import React from 'react';
import { format, fromUnixTime, parseISO } from 'date-fns';

function formatTime(time) {
    let date;
    if (typeof time === 'string' && time.includes('T')) {
        date = parseISO(time);
    } else if (!isNaN(Number(time))) {
        date = fromUnixTime(Number(time) / 1000);
    } else {
        return 'Invalid date';
    }

    return format(date, 'yyyy-MM-dd HH:mm:ss');
}

function Message(props) {
    const formattedTime = formatTime(props.time);

    return (
        <div className={`message ${props.side}`}>
            <span>{props.name}</span>
            <br />
            <p>{props.message}</p>
            <small>{formattedTime}</small>
        </div>
    );
}

export default Message;
