import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css'
import AnimatedCursor  from "animated-cursor";


const ac = AnimatedCursor({
    color: '#0ff',
    hideNativeCursor: true,
    outerAlpha: .1,
    outerBorderSize : 3,
    zIndex:1000,
    size: {
        inner: 10,

        outer: 38
    },
    hoverScale: {
        inner: 0.5,
        outer: 1.4
    },
    clickScale: {
        inner: 2.4,
        outer: 0.1
    }
});
ac.init()




import Logout from "./Components/LogoutPage.jsx";
import ChatStates from "./Context/ChatStates.jsx";
import ChatPage from "./Components/ChatPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";



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
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

      <ChatStates>
        <RouterProvider router={routes} />
      </ChatStates>

  </React.StrictMode>,
)
