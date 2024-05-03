// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/chat.css';
import Message from "./Message.jsx";
import Loading from "./Loading.jsx";
import NoMessages from "./NoMessages.jsx";
import Error from "./Error.jsx";

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments'); // Correct endpoint
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // New error state
    const [message, setMessage] = useState("")
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await fetchData();
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("An error occurred while fetching messages. Please try again later.");
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500); // Simulate server wake-up delay
            }
        };

        fetchMessages();
    }, []); // Runs only once when the component mounts

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
            <input type="text" value={message} onChange={(e)=>setMessage((e.target.value))} placeholder="Type a message..." />
            <button>Send</button>
        </div>
        </div>
</>
);
};

export default ChatPage;
