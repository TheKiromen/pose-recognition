import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./controllPanel.css"

//FIXME Change to use useState webhook

const Panel = () => {
    const test = localStorage.getItem("authenticated") === "true" ? true : false;
    console.log(typeof (localStorage.getItem("authenticated")));
    if (test) {
        //Redirect
        console.log(localStorage.getItem("authenticated"));
        return (
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
                            <img src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                            Figure A
                        </div>
                        <div>
                            <img src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                            Figure B
                        </div>
                    </div>

                    {/*second row with 2 items inside*/}
                    <div id="row_of_figures">
                        <div>
                            <img src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                            Figure C
                        </div>
                        <div>
                            <img src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                            Figure D
                        </div>
                    </div>
                </div>
            </div>
        );

    } else {
        return <Navigate replace to="/login"/>;
    }
};

export default Panel;