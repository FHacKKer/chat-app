
import Navbar from "./Navbar.jsx";
import ("../styles/chat.css")
function ChatPage(props) {
    return (
        <>
        <Navbar />
            <div className="main">
                <div className="messagesArea">
                    <div className="message">
                        <span>Faisal Shahzad</span>
                        <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut, eveniet expedita explicabo ipsum magnam odit omnis pariatur soluta temporibus.</p>
                        <small>{Date.now()}</small>
                    </div>
                </div>
                <div className="sendArea">
                    <input type="text" />
                    <button>Send</button>
                </div>
            </div>

        </>
    );
}

export default ChatPage;