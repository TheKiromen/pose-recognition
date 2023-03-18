import { useUserAuth} from "./MonitorAuth";
import React from 'react';
import {Navigate, Outlet} from "react-router";

//If session is active then navigate to control panel
export const SessionRoute = () => {
    const logged = useUserAuth();

    return typeof logged === 'undefined' ? (
        <h1>Loading.....</h1> //You can add a loading animation here
    ) : logged ? (
        <Navigate to="/controlPanel" />
    ) : (
        <Outlet/>
    );
};

export default SessionRoute;