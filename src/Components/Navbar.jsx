
import React from "react";
import {Link, useLocation} from "react-router-dom";
import("../styles/Navbar.css");
function Navbar() {
    const {pathname} = useLocation();

    return (
        <>
            <header className="navbar">
                <div className="logo">
                    <h1>Chat App</h1>
                </div>
                <ul>
                    <li>
                        <Link className={`${pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                    </li>
                    <li>
                        <Link className={`${pathname === "/chat" ? "active" : ""}`} to="/chat">Chat</Link>
                    </li><li>
                        <Link className={`${pathname === "/logout" ? "active" : ""}`} to="/logout">Logout</Link>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default Navbar;