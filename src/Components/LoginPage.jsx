import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/Login.css'; // Import the CSS styles for the login page
import Navbar from "./Navbar.jsx";
import ChatContext from "../Context/ChatContext.js";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {SocketContext} from "../Context/SocketContext.jsx";
import ButtonLoading from "./ButtonLoading.jsx";

function LoginPage(props) {
    const {showToast } = useContext(ChatContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const {btnLoading,setBtnLoading,socket,isLoggedIn,error,setError,announcements,setAnnouncements} = useContext(SocketContext);

    useEffect(() => {
        if(isLoggedIn){
            navigate("/chat");
        }
    }, [isLoggedIn, navigate]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const addedCrDiv = useRef(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (addedCrDiv.current) {
            return;
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
    }, []);

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        // Regular expression to allow only letters and underscores
        const validCharacters = /^[a-zA-Z_]*$/;

        if (validCharacters.test(value)) {
            // If the input is valid, update the username state
            setUsername(value);
        }
    };

    const handleForm = () => {
        try{
            setBtnLoading(true);
            let uname =  username.trim();
            let pass = password.trim();
            if(uname === "" || pass === ""){
                showToast("info","Please Enter Valid Username & Password")
            }else{
                if(uname.length < 5){
                    setError("Username Must be 6 characters long");
                    return
                }
                if(pass.length < 5){
                    setError("Password Must be 6 Characters long");
                    return;
                }
                if(socket){
                    socket.emit("signin",{username:uname,password:pass})
                }
            }
        }catch (e){
            setError("Error Occurred During Signin. Please Try Again.")
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        showToast("success",announcements);
        setAnnouncements(null);
    }, [announcements]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        showToast("error",error);
        setError(null);
    },[error])
    return (
        <>
            <Navbar />
            <div className="main">
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={username} onChange={handleUsernameChange} id="username" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" disabled={btnLoading} onClick={handleForm} className="login-button">{!btnLoading ? "Sign In" : (<ButtonLoading />)}</button>
                        <div className="links">
                            <small>Don{"'"}t Have an Account</small>
                            <Link id={"backLink"} to={"/signup"}>SignUp Here</Link>
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

export default LoginPage;
