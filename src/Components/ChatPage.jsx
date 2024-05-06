
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
        if (inputField.current) {
            inputField.current.placeholder = isLoggedIn ? "Write a Message..." : "Please Login To Send Messages!";
            inputField.current.disabled = !isLoggedIn;
            if(!isLoggedIn){
                setMessage("");
            }
        }
    }, [message, inputField,isLoggedIn]);

    const addedCrDiv = useRef(false);

    useEffect(() => {
        if (addedCrDiv.current) {
            return;
        }

        let checkDiv = document.querySelectorAll(".creditDiv");

        if(checkDiv.length > 0){
            return;
        }

        const handleCreditRedirect = () => {
            window.location.href = "https://github.com/fhackker";
        };

        const body = document.getElementsByTagName('body');
        const creditDiv = document.createElement("div");
        creditDiv.addEventListener("click", handleCreditRedirect);
        creditDiv.classList.add("creditDiv");
        creditDiv.style.cursor = "pointer"

        const icon = document.createElement('i');
        icon.classList.add("bx", "bxl-github");
        creditDiv.appendChild(icon);

        body[0].appendChild(creditDiv);
        addedCrDiv.current = true;
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
            si:user?.id,
            message:msg,
            timestamp:Date.now()
        }
        if(!user || !user.name){
            showToast("error","SomeThing Went Wrong. Try Again Later.");
            return;
        }
        if(socket){
            socket.emit("newMessage",myMsg);
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

                            let side = "incoming";

                            if (user?.id) {

                                if (message?.si && message.si === user.id) {
                                    side = "outgoing";
                                }
                            }

                            return (
                                <Message
                                    key={i}
                                    name={user?.id && message?.si === user.id ? "Me" : message.sender}
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
