import React from 'react';

function Message(props) {
    return (
        <div className={`message ${props.side} `}>
            <span>{props.name}</span>
            <br/>
            <p>{props.message}</p>
            <small>{Date.now()}</small>
        </div>
    );
}

export default Message;