import {useEffect, useState} from "react";
import "./controllPanel.css"
import {Navigate} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router";

//FIXME Change to use useState webhook

function Panel() {
    /*const test = localStorage.getItem("authenticated") === "true" ? true : false;
    console.log(typeof (localStorage.getItem("authenticated")));
    if (test) {
        //Redirect
        console.log(localStorage.getItem("authenticated"));*/
    /*const navigate = useNavigate();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log("Zalogowano w controlpanel")
            const uid = user.uid;
            console.log(uid);
            //return <Navigate replace to="/login"/>;
            //navigate("/login");


        } else {
            // User is signed out
            console.log("niezalogowano w controlpanel");
            navigate("/login");
            //return <Navigate replace to="/login"/>;
            //Redirect
            return (
                <div className="Panel">
                    CONTROL PANEL
                </div>
            );
        }
    });*/


        return (
            // For the margin bottom to work there has to be a div with it and another
            // div encapsulating div enlarged in this way. Both have to be flex
            <div id="encapsulating">
                <div id="enlarged">
                    <div className="Panel">
                        <div id="menu">
                            <div>
                                {/* Empty div here to create a gap */}
                            </div>
                            <div>
                                Użytkownik: xXKiller69Xx
                            </div>
                            <div>
                                Lorem: Ipsum
                            </div>
                            <div>
                                Pierogi: Ruskie
                            </div>
                            <div>
                                Hotel: Trivago
                            </div>
                        </div>
                        <div id="figures">
                            {/*first row with 2 items inside*/}
                            <div id="row_of_figures">
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Figure A
                                </div>
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Figure B
                                </div>
                            </div>

                            {/*second row with 2 items inside*/}
                            <div id="row_of_figures">
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Figure C
                                </div>
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Figure D
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    /*} else {
        return <Navigate replace to="/login"/>;
    }*/


};

export default Panel;