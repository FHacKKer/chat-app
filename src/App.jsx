import {Navigate, useNavigate} from "react-router-dom";


import("./styles/App.css");
import Navbar from "./Components/Navbar.jsx";

function App() {

    const navigate = useNavigate();


    const redirect = () => {
        navigate("/chat");
    }

    return (
        <>
            <Navbar />
        <div className={"main"}>
            <h1>Welcome To Chat App</h1>
            <p>A modern web application built with React for the front end and Node.js for the back end, featuring real-time communication with Socket.IO to create an impressive chat system. This project demonstrates a full-stack approach to web development, combining a responsive and interactive user interface with a robust server-side architecture.</p>
            <button onClick={redirect} >Start Chat</button>
        </div>
        </>
    );
}

export default App;