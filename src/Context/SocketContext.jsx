import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a context for the Socket.IO connection
const SocketContext = createContext(null);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
    // eslint-disable-next-line no-undef


    const [socketUrl, setSocketUrl] = useState(process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://react-chat-app-backend-ay4k.onrender.com");

    // eslint-disable-next-line no-undef
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [signUpError, setSignUpError] = useState(null);
    const [announcements, setAnnouncements] = useState(null);
    const [user, setUser] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {


        // Connect to your Socket.IO server (update with your server's URL)
        const socketInstance = io(socketUrl);

        socketInstance.on('connect', () => {
            socketInstance.emit("getMessages");
        });

        socketInstance.on("connect_error",() => {
                setError(`Failed To Connect With Server. Please Try Again Latter!!`);
                setLoading(false);
        })
        socketInstance.on("globalError",(data) => {
            setError(data.message);
            setBtnLoading(false)
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

        socketInstance.on("newUserSignedUp",(data) => {
            localStorage.setItem("token", data.token);
            setUser({
                name:data.name.trim(),
                id:data.id
            });
            setAnnouncements("User Signed Up Successfully.");
            setBtnLoading(false)
        });

        socketInstance.on("errorEvent", (err) => {
            console.log(`An Error Received : ${err.message}`)
            setSignUpError(err.message);
        })

        // events for verifying jwt tokens
        socketInstance.on("tokenSignUpSuccess",(data) => {
            setIsLoggedIn(true);
            setUser(data.user);
        })

        socketInstance.on("jwtError",() => {
            setError("Failed To Verify SignIn Token. Please Login.!")
            localStorage.removeItem("token");
        })

        // end of verifying jwt tokens events


        // user signin Event
        socketInstance.on("signInSuccess",(data) => {
            setAnnouncements("User Signed Up Successfully.");
            setUser({name:data.user.name, id:data.user.id});
            if(localStorage.token){
                localStorage.removeItem("token");
            }else{
                localStorage.setItem("token",data.token);
                setIsLoggedIn(true);
                setBtnLoading(false);
            }
        })

        setSocket(socketInstance);

        // Cleanup when the component is unmounted
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const addMyMessage = (messageObj) => {
        setMessages((prev) => [...prev, messageObj]);
    }

    useEffect(() => {
        if(localStorage.token){
            let token = localStorage.getItem("token").trim();
            if(socket && !user){
                socket.emit("tokenSignUp",token);
            }
        }
    }, [socket,localStorage]);


    let values = {
        socket,
        loading,
        addMyMessage,
        messages,
        error,
        setError,
        btnLoading,
        setBtnLoading,
        signUpError,
        setSignUpError,
        announcements,
        setAnnouncements,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser
    }

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };
