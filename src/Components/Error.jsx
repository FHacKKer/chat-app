import React from 'react';


function Error(props) {
    return (
        // eslint-disable-next-line react/prop-types
        <p>{props.error || ""}</p>
    );
}

export default Error;
