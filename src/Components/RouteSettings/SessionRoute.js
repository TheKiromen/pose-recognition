import { useUserAuth} from "../MonitorAuth";
import React from 'react';
import {Navigate, Outlet} from "react-router";

//If session is active then navigate to control panel
export const SessionRoute = () => {
    const logged = useUserAuth();

    return typeof logged === 'undefined' ? (
        null //Replace with loading button
    ) : logged ? (
        <Navigate to="/controlPanel" />
    ) : (
        <Outlet/>
    );
};

export default SessionRoute;