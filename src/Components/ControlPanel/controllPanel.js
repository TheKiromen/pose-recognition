import "./controllPanel.css"

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
//import {storage} from "../Firebase/FirebaseConfig"

const storage = getStorage();
const modelRef = ref(storage, 'test-model/model.json');


function Panel() {
    // const modelRef = ref(storage, 'test-model/model.json');
    //const metaRef = ref(storage, 'test-model/model_meta.json');
    //const weightsRef = ref(storage, 'test-model/model.weights.bin');
    function getUrl() {
        getDownloadURL(modelRef)
            .then((url) => {
                console.log(url);
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        console.log("file doesn't exist");
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("unauthorized");
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        console.log("unknown");
                        break;
                }
            });
    }

    //const storageRef = ref(storage, 'test-model');
    return (
        <div id="encapsulating">
            <div id="enlarged">
                <div className="Panel">
                    <div id="menu">
                        {/*FIXME Fix positioning bug, code below IS CORRECT, something in css is messing with it*/}
                        {/*TODO Pick better styling, set labels as bold?*/}

                        {/*General information*/}
                        <div>
                            <p><b>Current user:</b> Bojciech Wadura</p>
                            <p><b>Current model:</b> ymca</p>
                            <Button variant="light" className='mb-2' onClick={getUrl}>Test</Button>
                        </div>

                        {/*FIXME for styling purposes I changed form layout (below is old version)*/}
                        {/*New model training*/}
                        <div>
                            <Form>
                                <Form.Label><b>Train new model</b></Form.Label>
                                <Form.Group controlId="importData" className="mb-3">
                                    <Form.Label>Import data:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Epochs:</Form.Label>
                                    <Form.Control type="number" min="1" max="1000" defaultValue={100}/>
                                    <Button variant="light" disabled={true} className='mt-2'>Train model</Button>
                                </Form.Group>
                            </Form>
                        </div>

                        {/*Importing prebuilt model*/}
                        <div>
                            <Form>
                                <Form.Label><b>Import model</b></Form.Label>
                                <Form.Group controlId="importModel" className="mb-3">
                                    <Form.Label>Model:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Model_meta:</Form.Label>
                                    <Form.Control type="file" accept=".json"/>
                                    <Form.Label>Model_weights:</Form.Label>
                                    <Form.Control type="file" accept=".bin"/>
                                    <Button variant="light" disabled={true} className='mt-2'>Import model</Button>
                                </Form.Group>
                            </Form>
                        </div>

                        {/*Exporting current model*/}
                        <div>
                            <Button variant="light" className='mb-2'>Export model</Button>
                        </div>

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