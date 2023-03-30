// import "./controllPanel.css"

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


function Panel() {
        return (
            <div id="encapsulating">
                <div id="enlarged">
                    <div className="Panel">
                        <div id="menu">
                            {/*FIXME Fix positioning bug, code below IS CORRECT, something in css is messing with it*/}
                            {/*TODO Pick better styling, set labels as bold?*/}

                            {/*General information*/}
                            <p><b>Current user:</b> Bojciech Wadura</p>
                            <p><b>Current model:</b> ymca</p>
                            <hr/>

                            <Form>
                                {/*New model training*/}
                                <Form.Label>Train new model</Form.Label>
                                <Form.Group controlId="importData" className="mb-3">
                                    <Form.Label>Import data:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Epochs:</Form.Label>
                                    <Form.Control type="number" min="1" max="1000" defaultValue={100}/>
                                    <Button variant="light" disabled={true} className='mt-2'>Train model</Button>
                                </Form.Group>
                                <hr/>

                                {/*Importing prebuilt model*/}
                                <Form.Label>Import model</Form.Label>
                                <Form.Group controlId="importModel" className="mb-3">
                                    <Form.Label>Model:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Model_meta:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Model_weights:</Form.Label>
                                    <Form.Control type="file" accept=".bin"/>
                                    <Button variant="light" disabled={true} className='mt-2'>Import model</Button>
                                </Form.Group>
                                <hr/>

                                {/*Exporting current model*/}
                                <Button variant="light" className='mb-2'>Export model</Button>

                            </Form>
                        </div>
                        <div id="figures">
                            {/*first row with 2 items inside*/}
                            <div className="row_of_figures">
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Active users
                                </div>
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Classification sum
                                </div>
                            </div>

                            {/*second row with 2 items inside*/}
                            <div className="row_of_figures">
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Confidence score
                                </div>
                                <div>
                                    <img
                                        src={"https://www.researchgate.net/publication/337727529/figure/fig4/AS:941575693684771@1601500547534/Annual-rainfall-in-the-MDB-1900-2018-Source-BOM-Available-at.png"}/>
                                    Training error
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Panel;