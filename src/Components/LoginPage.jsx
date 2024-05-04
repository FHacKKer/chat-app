import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/Login.css'; // Import the CSS styles for the login page
import Navbar from "./Navbar.jsx";
import ChatContext from "../Context/ChatContext.js";
import {Link, useNavigate} from "react-router-dom";

function LoginPage(props) {
    const {isLoggedIn, setIsLoggedIn } = useContext(ChatContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    if(isLoggedIn){
        navigate("/chat");
        return
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const addedCrDiv = useRef(false); // Use useRef to track if div was added

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (addedCrDiv.current) {
            return; // Return early if div has been added
        }

        let checkDiv = document.querySelectorAll(".creditDiv");

        if(checkDiv.length > 0){
            return;
        }

        const handleCreditRedirect = () => {
            window.location.href = "https://github.com/fhackker"; // Redirect to another domain
        };

        const body = document.getElementsByTagName('body');
        const creditDiv = document.createElement("div");
        creditDiv.addEventListener("click", handleCreditRedirect); // Correctly add event listener
        creditDiv.classList.add("creditDiv");
        creditDiv.style.cursor = "pointer"

        const icon = document.createElement('i');
        icon.classList.add("bx", "bxl-github"); // Use spread syntax to add multiple classes
        creditDiv.appendChild(icon);

        body[0].appendChild(creditDiv); // Add the div to the body
        addedCrDiv.current = true; // Mark that div has been added
    }, []); // Empty dependency array to ensure useEffect runs once


    const handleForm = () => {
        let uname =  username.trim();
        let pass = password.trim();
        if(uname === "" || pass === ""){
            alert("Please enter a valid username & Password");

        }else{
            console.log("Successfully logged in!");
            setIsLoggedIn(true)
            navigate("/chat");
        }
    }
    return (
        <>
            <Navbar />
            <div className="main">
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" onClick={handleForm} className="login-button">Log In</button>
                        <div className="links">
                            <small>Don{"'"}t Have an Account</small>
                            <Link id={"backLink"} to={"/signup"}>SignUp Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
