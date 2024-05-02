import { useState } from 'react';
import ChatContext from './ChatContext';

// Context provider component
const ChatStates = (props) => {

    // State initialization
    const [openNavBar, setOpenNavBar] = useState(false);


    const contextValue = {
        openNavBar,
        setOpenNavBar
    }

    return (
        <ChatContext.Provider value={contextValue}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatStates;
