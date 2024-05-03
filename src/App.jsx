import {useNavigate} from "react-router-dom";


import("./styles/App.css");
import Navbar from "./Components/Navbar.jsx";
import {useEffect, useRef} from "react";

function App() {
    const navigate = useNavigate();



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




    const redirect = () => {
        navigate("/chat");
    }

    return (
        <>
            <Navbar />
        <div className={"main"}>
            <h1>Welcome To Chat App</h1>
            <p>A modern web application built with React for the front end and Node.js for the back end, featuring real-time communication with Socket.IO to create an impressive chat system. This project demonstrates a full-stack approach to web development, combining a responsive and interactive user interface with a robust server-side architecture.</p>
            <button className={"chatBtn"} onClick={redirect} >Start Chat</button>
        </div>
        </>
    );
}

export default App;