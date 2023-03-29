import {useContext} from "react";
import "./controllPanel.css"
import {ModelContext} from "../Context/ModelContext";


function Panel() {

        const obj = useContext(ModelContext);

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
                            <div className="row_of_figures">
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
                            <div className="row_of_figures">
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
};

export default Panel;