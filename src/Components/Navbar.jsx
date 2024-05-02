
import {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import ChatContext from "../Context/ChatContext.js";
import("../styles/Navbar.css");
function Navbar() {
    const {pathname} = useLocation();

    const {openNavBar,setOpenNavBar} = useContext(ChatContext);

    return (
        <>
            <header className="navbar">
                <div className="logo">
                    <h1>Chat App</h1>
                </div>
                {
                    openNavBar ? (
                        <i onClick={()=>setOpenNavBar(!openNavBar)} className='bx bx-x close-menu'></i>
                    ) : (
                        <i onClick={()=>setOpenNavBar(!openNavBar)} className='bx bx-menu-alt-right open-menu'></i>
                    )
                }
                <ul className={openNavBar ? "active-menu" : ""}>
                <li>
                        <Link className={`${pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                    </li>
                    <li>
                        <Link className={`${pathname === "/chat" ? "active" : ""}`} to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link className={`${pathname === "/logout" ? "active" : ""}`} to="/logout">Logout</Link>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default Navbar;