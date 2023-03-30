import React from "react";
import { useEffect, useState} from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();

export function useUserAuth() {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) =>
            setCurrentUser(user)
        );
        return unSubscribe;
    }, []);
    return currentUser;
}