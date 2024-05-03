import React, {useContext, useState} from 'react';
import '../styles/Login.css'; // Import the CSS styles for the login page
import Navbar from "./Navbar.jsx";
import ChatContext from "../Context/ChatContext.js";
import {useNavigate} from "react-router-dom";

function LoginPage(props) {
    const {isLoggedIn, setIsLoggedIn } = useContext(ChatContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    if(isLoggedIn){
        navigate("/chat");
        return
    }

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
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
