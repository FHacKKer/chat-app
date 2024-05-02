import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css'
import ChatPage from "./Components/ChatPage.jsx";
import Logout from "./Components/LogoutPage.jsx";


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
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
