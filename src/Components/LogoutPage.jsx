import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from "./Navbar.jsx";
import {ProgressBar} from  "react-loader-spinner"
import {useNavigate} from "react-router-dom";
import ChatContext from "../Context/ChatContext.js";

function Logout() {
    const navigate = useNavigate();
    const {isLoggedIn,setIsLoggedIn} = useContext(ChatContext)


    const addedCrDiv = useRef(false); // Use useRef to track if div was added

    useEffect(() => {
        if (addedCrDiv.current) {
            return; // Return early if div has been added
        }

        let checkDiv = document.querySelectorAll(".creditDiv");

        if(checkDiv.length > 0){
            console.log(`Credit Div Already Exists`);
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


    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/");
        }
        if(countdown > 0){

            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            },1000)

            return () => clearTimeout(timer);
        }else{
            setIsLoggedIn(false);
            navigate("/");
        }
    }, [countdown, navigate]);

    return (
        <>
            <Navbar />
            <div className={"main"}>
                <ProgressBar
                    visible={true}
                    height="80"
                    width="200"
                    barColor={"#bd0f0f"}
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p>You{"'"}re being logged out in {countdown} {countdown > 1 ? "Seconds" : "Second"}</p>
            </div>
        </>
    );
}

export default Logout;