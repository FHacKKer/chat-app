// eslint-disable-next-line no-unused-vars
import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from "./Navbar.jsx";
import {Link} from "react-router-dom";
import ChatContext from "../Context/ChatContext.js";
import {ToastContainer} from "react-toastify";
import ButtonLoading from "./ButtonLoading.jsx";
import {SocketContext} from "../Context/SocketContext.jsx";
import error from "./Error.jsx";
import('../styles/Login.css')
function SignupPage() {
    const {showToast} = useContext(ChatContext);

    const {socket,btnLoading,setBtnLoading,signUpError,setSignUpError,announcements,setAnnouncements,error,setError} = useContext(SocketContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        // Regular expression to allow only letters and underscores
        const validCharacters = /^[a-zA-Z_]*$/;

        if (validCharacters.test(value)) {
            // If the input is valid, update the username state
            setUsername(value);
        }
    };

    const validateEmail = (email) => {
        // Email regular expression
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        return emailPattern.test(email); // Returns true if the email matches the pattern
    };


    const handleSignUp = async () => {
        try {
            setBtnLoading(true);

            let trimmedName = name.trim();
            let trimmedUsername = username.trim();
            let trimmedEmail = email.trim().toLowerCase();
            let trimmedPassword = password.trim();
            let trimmedCPassword = cPassword.trim();

            if (trimmedName === "" || trimmedUsername === "" || trimmedEmail === "" || trimmedPassword === "" || trimmedCPassword === "") {
                showToast("info", "Please fill all input fields!");
                setBtnLoading(false);
                return;
            }

            const isEmailValid = validateEmail(trimmedEmail);
            if (!isEmailValid) {
                showToast("error", "Please enter a valid email address.");
                setBtnLoading(false);
                return;
            }

            if (trimmedPassword !== trimmedCPassword) {
                showToast("info", "Passwords do not match!");
                setBtnLoading(false);
                return;
            }

            if (trimmedUsername.length < 6) {
                showToast("warning", "Username must be at least 6 characters long.");
                setBtnLoading(false);
                return;
            }

            if (trimmedPassword.length < 6) {
                showToast("warning", "Password must be at least 6 characters long.");
                setBtnLoading(false);
                return;
            }

            // Check if the email is a disposable one
            const req = await fetch(`https://disposable.debounce.io/?email=${trimmedEmail}`);
            const res = await req.json();

            if (res.disposable === "true") {
                showToast("error", "Disposable emails are not allowed!");
                setBtnLoading(false);
                return;
            }

            const data = {
                name: trimmedName,
                username: trimmedUsername,
                email: trimmedEmail,
                password: trimmedPassword,
            };

            if(socket){
                socket.emit("userSignUp",data);
            }

        } catch (e) {
            console.log(`An error occurred: ${e}`);
        }
    };


    useEffect(() => {
            showToast("error",signUpError);
            setSignUpError(null)
            setBtnLoading(false)
    },[signUpError]);

    useEffect(() => {
        showToast("error",error)
        setError(null);
    }, [error]);

    useEffect(() => {
        showToast("info",announcements);
        setAnnouncements(null);
        emptyAllFields();
    }, [announcements]);

    const emptyAllFields = () => {
        setUsername("");
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
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


    return (
        <>
            <Navbar />
            <div className="main">
                <div className="login-form">
                    <h1>Sign Up</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your full name."/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={username} onChange={handleUsernameChange} id="username" placeholder="Enter your username"/>
                            <small>Only letters and underscores are allowed in username.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email Address"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" placeholder="Enter your password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" value={cPassword} onChange={(e)=> setCPassword(e.target.value)} id="cpassword" placeholder="Confirm your password"/>
                        </div>
                        <button onClick={handleSignUp} type="submit" className="login-button">{btnLoading ? (<ButtonLoading />) : "Sign Up"}</button>
                        <div className="links">
                            <small>Already Have an Account</small>
                            <Link id={"backLink"} to={"/login"}>SignIn Here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={1}
            />
        </>
    );
}

export default SignupPage;