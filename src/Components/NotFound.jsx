import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import("../styles/notfound.css")
function NotFound(props) {
    return (
        <>
            <Navbar />
            <div className="main">
                <h1>404 - Page Not Found</h1>
                <Link className={"backBtn"} to={"/"}>Go Back</Link>
            </div>

        </>
    );
}

export default NotFound;