import React from 'react';
import Navbar from "./Navbar.jsx";

function Logout(props) {
    return (
        <>
            <Navbar />
            <div className={"main"}>
                <h1>Logout Page</h1>
            </div>
        </>
    );
}

export default Logout;