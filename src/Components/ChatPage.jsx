// eslint-disable-next-line no-unused-vars
import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from './Navbar.jsx';
import '../styles/chat.css';
import Message from "./Message.jsx";
import Loading from "./Loading.jsx";
import NoMessages from "./NoMessages.jsx";
import Error from "./Error.jsx";
import ChatContext from "../Context/ChatContext.js";
import {ToastContainer} from "react-toastify";

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments/2'); // Correct endpoint
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

const ChatPage = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("")

    const {isLoggedIn,showToast} = useContext(ChatContext);

    const inputField = useRef(null);
    useEffect(() => {
        if (inputField.current) { // Ensure the ref is not null
            inputField.current.placeholder = isLoggedIn ? "Write a Message..." : "Please Login To Send Messages!";
            inputField.current.disabled = !isLoggedIn;
            if(!isLoggedIn){
                setMessage("");
            }
        }
    }, [message, inputField,isLoggedIn]);


    const hasFetched = useRef(null);

    useEffect(() => {
        if (hasFetched.current) {
            return; // Exit if we've already fetched data
        }

        const fetchMessages = async () => {
            try {
                const data = await fetchData();
                console.log("Fetched Messages:", data); // Debug to check the data structure
                setMessages(Array.isArray(data) ? data : [data]); // Ensure it's an array
                hasFetched.current = true; // Mark that data has been fetched
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("An error occurred while fetching messages. Please try again later.");
            } finally {
                setLoading(false); // No need for delay
            }
        };

        fetchMessages(); // Fetch the data
    }, []); // Empty array ensures this effect is meant to run only once


    const addedCrDiv = useRef(false); // Use useRef to track if div was added

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


    const handleMessageSend = () => {
        if(!isLoggedIn){
            showToast("error","Please Login To Send Messages!");
            return
        }


        let msg = message.trim();

        if(msg === ""){
            showToast("info","Please Write Message First!")
            return;
        }

        showToast("info",msg)
    }


    return (
        <>
        <Navbar />
        <div className="chatPage">
            <div className="messagesArea">
                {error ? (
                    <div className="errorArea">
                        <Error error={error} />
                    </div>
                ) : loading ? (
                    <Loading />
                    ) : messages.length > 0 ? (
                    messages.map((value,i) => (
                    <Message key={value.id} name={value.name} message={value.body} side={i%2 === 0 ? "incoming" : "outgoing"} />
            ))
            ) : (
            <NoMessages />
            )}
        </div>
        <div className="sendArea">
            <input ref={inputField}  type="text" placeholder="" value={message} onChange={(e)=>setMessage((e.target.value))} />
            <button onClick={handleMessageSend}>Send</button>
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
                limit={3}
            />

        </>
);
};

export default ChatPage;
