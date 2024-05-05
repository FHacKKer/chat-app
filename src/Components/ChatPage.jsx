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
import {SocketContext} from "../Context/SocketContext.jsx";


const ChatPage = () => {
    const [message, setMessage] = useState("")

    const {showToast} = useContext(ChatContext);

    const {socket,loading,messages,error,addMyMessage,isLoggedIn,user} = useContext(SocketContext);

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
    }, []);

    useEffect(() => {
        const messagesDiv = document.querySelector(".messagesArea");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messages]);

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
        let myMsg = {
            sender:user.name,
            si:user.id,
            message:msg,
            timestamp:Date.now()
        }
        if(!user || !user.name){
            showToast("error","SomeThing Went Wrong. Try Again Later.");
            return;
        }
        if(socket){
            socket.emit("newMessage",msg);
            addMyMessage(myMsg)
            setMessage("")
        }else{
            console.error(`Failed To Connect With Backend. Please Try Again Latter.!`)
        }
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
                        messages.map((message, i) => {
                            // Determine the side of the message
                            let side = "incoming"; // Default to "incoming"

                            if (user?.id) {
                                // If user.id is defined, check if the message is from the current user
                                if (message?.si && message.si === user.id) {
                                    side = "outgoing"; // If it's from the current user, set to "outgoing"
                                }
                            }

                            return (
                                <Message
                                    key={i}
                                    name={message.sender}
                                    message={message.message}
                                    side={side}
                                    time={message.timestamp}
                                />
                            );
                        })
                    ) : (
                        <NoMessages />
                    )}
                </div>
                <div className="sendArea">
                    <input
                        ref={inputField}
                        type="text"
                        placeholder="Enter your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
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
