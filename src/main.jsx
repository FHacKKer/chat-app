import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css'
import AnimatedCursor  from "animated-cursor";
import 'react-toastify/dist/ReactToastify.css';
import {SocketProvider} from "./Context/SocketContext.jsx";
import Logout from "./Components/LogoutPage.jsx";
import ChatStates from "./Context/ChatStates.jsx";
import ChatPage from "./Components/ChatPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import SignupPage from "./Components/SignupPage.jsx";
import NotFound from "./Components/NotFound.jsx";

const ac = AnimatedCursor({
    color: '#0ff',
    hideNativeCursor: true,
    outerAlpha: .1,
    outerBorderSize : 3,
    zIndex:1000,
    clickables:[".creditDiv"],
    size: {
        inner: 10,

        outer: 38
    },
    hoverScale: {
        inner: 1.4,
        outer: 2.4
    },
    clickScale: {
        inner: 2.4,
        outer: 0.1
    }
});
ac.init()


const routes = createBrowserRouter([
    {
        path:"/",
        element:<App />
    },
    {
        path:"/chat",
        element:<ChatPage />
    },
    {
        path:"/logout",
        element:<Logout />
    },
    {
        path:"/login",
        element:<LoginPage/>
    },
    {
        path:"/signup",
        element:<SignupPage/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

      <ChatStates>
          <SocketProvider>
            <RouterProvider router={routes} />
          </SocketProvider>
      </ChatStates>

  </React.StrictMode>,
)
