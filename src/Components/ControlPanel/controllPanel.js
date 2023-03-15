import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

function Panel() {
    //Przykładowe sprawdzanie na przykładzie localStorage (do zmiany ~Wojtek)
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedUser = localStorage.getItem("authenticated");
        console.log(loggedUser);
        if (loggedUser) {
            setauthenticated(loggedUser);
        }
    }, []);
    //Jeśli nie zalogowany zrób redirect
    if (!authenticated){
        //Redirect
        return <Navigate replace to="/login" />
    } else {
        return (
            <div className="Panel">
                CONTROL PANEL
            </div>
        );
    }
}

export default Panel;