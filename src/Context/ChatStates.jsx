import React, { useState } from 'react';
import ChatContext from './ChatContext';
import {toast} from "react-toastify";

// Context provider component
const ChatStates = (props) => {


    const showToast = (type,message) => {
        toast(message, {
            type:type,
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    // State initialization
    const [openNavBar, setOpenNavBar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const contextValue = {
        openNavBar,
        setOpenNavBar,
        isLoggedIn,
        setIsLoggedIn,
        showToast
    }

    return (
        <ChatContext.Provider value={contextValue}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatStates;
