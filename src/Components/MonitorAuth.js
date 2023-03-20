import React from "react";
import { useEffect, useState, createContext, useContext} from "react";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();

export function useUserAuth() {
    //
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) =>
            setCurrentUser(user)
        );
        return unSubscribe;
    }, []);
    return currentUser;
}