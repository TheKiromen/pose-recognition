import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged  } from "firebase/auth";

//FIXME Change to use useState webhook

const Panel = () => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        console.log("TEST")
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            return <Navigate replace to="/login"/>;

        } else {
            // User is signed out
            //Redirect
            return (
                <div className="Panel">
                    CONTROL PANEL
                </div>
            );
        }
    });
};

export default Panel;