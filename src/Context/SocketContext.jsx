import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a context for the Socket.IO connection
const SocketContext = createContext(null);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
    // eslint-disable-next-line no-undef

    const [socketUrl, setSocketUrl] = useState(process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://react-chat-app-backend-ay4k.onrender.com");

    // eslint-disable-next-line no-undef
    console.log(process.env.NODE_ENV);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        // Connect to your Socket.IO server (update with your server's URL)
        const socketInstance = io(socketUrl);

        socketInstance.on('connect', () => {
            socketInstance.emit("getMessages");
        });

        socketInstance.on("connect_error",() => {
                setError(`Failed To Connect With Server. Please Try Again Latter!!`);
                setLoading(false)
        })

        socketInstance.on('disconnect', () => {
            console.log('Socket.IO connection disconnected');
        });

        socketInstance.on("newMessage",(data) => {
            setMessages((prev) => [...prev, data]);
        })

        // Handle other events as needed
        socketInstance.on('allMessages', (data) => {
            try{
                setMessages(data)
            }catch (e) {
                setError(`An error occurred while fetching messages. Please try again later.`);
            }finally {
                setLoading(false)
            }
        });

        setSocket(socketInstance);

        // Cleanup when the component is unmounted
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const addMyMessage = (messageObj) => {
        setMessages((prev) => [...prev, messageObj]);
    }

    let values = {
        socket,
        loading,
        addMyMessage,
        messages,
        error
    }

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };
