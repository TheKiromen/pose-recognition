import {Navigate, Outlet} from "react-router";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import React from "react";
import { useUserAuth} from "./MonitorAuth";

const ProtectedRouted = () => {
    //Checking if user id is visible, can be improved
    const logged = useUserAuth();

    console.log("Wartosc logged: ", logged);

    return typeof logged === 'undefined' ? (
        <h1>Loading.....</h1>
    ) : logged ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRouted;