import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

//FIXME Change to use useState webhook

const Panel = () => {
    const test = localStorage.getItem("authenticated") === "true" ? true : false;
    console.log(typeof(localStorage.getItem("authenticated")));
    if (test) {
        //Redirect
        console.log(localStorage.getItem("authenticated"));
        return (
            <div className="Panel">
                CONTROL PANEL
            </div>
        );

    } else {
        return <Navigate replace to="/login" />;
    }
};

export default Panel;