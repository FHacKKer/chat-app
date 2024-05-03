import { InfinitySpin } from "react-loader-spinner";
import React from 'react';

function Loading() {
    return (
        <div className="loadingArea">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
            <p>
                The server is currently waking up, so it might take a moment to fetch
                previous messages. Please be patient, and thanks for your understanding.
            </p>
            <hr/>
            <p>If this takes too long, try refreshing the page.</p>
        </div>
    );
}

export default Loading;
