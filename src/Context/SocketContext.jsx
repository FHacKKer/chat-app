import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a context for the Socket.IO connection
const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to your Socket.IO server (update with your server's URL)
        const socketInstance = io('http://localhost:3001');

        socketInstance.on('connect', () => {
            console.log('Socket.IO connection established');
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket.IO connection disconnected');
        });

        // Handle other events as needed
        socketInstance.on('someEvent', (data) => {
            console.log('Received data:', data);
        });

        setSocket(socketInstance);

        // Cleanup when the component is unmounted
        return () => {
            socketInstance.disconnect();
        };
    }, []); // This effect runs once when the component mounts

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };
