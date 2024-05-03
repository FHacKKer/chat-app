import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar.jsx";
import {ProgressBar} from  "react-loader-spinner"
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();



    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        if(countdown > 0){

            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            },1000)

            return () => clearTimeout(timer);
        }else{
            navigate("/");
        }
    }, [countdown, navigate]);

    return (
        <>
            <Navbar />
            <div className={"main"}>
                <ProgressBar
                    visible={true}
                    height="80"
                    width="200"
                    barColor={"#bd0f0f"}
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p>You{"'"}re being logged out {countdown} {countdown > 1 ? "Seconds" : "Second"}</p>
            </div>
        </>
    );
}

export default Logout;