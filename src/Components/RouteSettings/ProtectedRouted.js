import React from "react";
import {Navigate, Outlet} from "react-router";
import { useUserAuth} from "../MonitorAuth";

const ProtectedRouted = () => {
    //Checking if user id is visible, can be improved
    const logged = useUserAuth();

    //console.log("Wartosc logged: ", logged);

    return typeof logged === 'undefined' ? (
        null  //Replace with loading button
    ) : logged ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRouted;