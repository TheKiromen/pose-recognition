import "./controllPanel.css"

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
//import {storage} from "../Firebase/FirebaseConfig"

const storage = getStorage();
const modelRef = ref(storage, 'test-model/model.json');


function Panel() {

    const exportModel = () =>{
        console.log("Exporting model");
    }

    const importModel = () =>{
        console.log("Importing model");
    }

    const trainModel = () =>{
        console.log("Training");
    }

    const handleModelFileSelection = (e) =>{
        let eventSource = e.target.id;

        //TODO Only enable button if all 3 files are valid
        // Use state map to hold boolean values for each input? Hold it as useState??
        // If all 3 valid, only then proceed. On each input change reevaluate source input
        console.log("Model File selected");
        console.log(eventSource);
        document.getElementById("importBtn").removeAttribute("disabled");
    }

    const handleDataFileSelection = (e) =>{
        //TODO Enable button after validating the file
        console.log("Data File selected");
        document.getElementById("trainBtn").removeAttribute("disabled");
    }

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
                        {/*General information*/}
                        <div>
                            <p><b>Current user:</b> Bojciech Wadura</p>
                            <p><b>Current model:</b> ymca</p>
                            {/*<Button variant="light" className='mb-2' onClick={getUrl}>Test</Button>*/}
                        </div>

                        {/*FIXME for styling purposes I changed form layout (below is old version)*/}
                        {/*New model training*/}
                        <div>
                            <Form>
                                <Form.Label><b>Train new model</b></Form.Label>
                                <Form.Group controlId="importData" className="mb-3">
                                    <Form.Label>Import data:</Form.Label>
                                    <Form.Control type="file" accept=".json" onChange={handleDataFileSelection}/>
                                    <Form.Label>Epochs:</Form.Label>
                                    <Form.Control type="number" min="1" max="1000" defaultValue={100}/>
                                    <Button id="trainBtn" variant="light" className='mt-2' onClick={trainModel} disabled>Train model</Button>
                                </Form.Group>
                            </Form>
                        </div>

                        {/*Importing prebuilt model*/}
                        <div>
                            <Form>
                                <Form.Label><b>Import model</b></Form.Label>
                                {/*<Form.Group controlId="importModel" className="mb-3">*/}
                                <Form.Group className="mb-3">
                                    <Form.Label>Model:</Form.Label>
                                    <Form.Control id="modelFileInput" type="file" accept=".json" onChange={handleModelFileSelection}/>
                                    <Form.Label>Model_meta:</Form.Label>
                                    <Form.Control id="metaFileInput" type="file" accept=".json" onChange={handleModelFileSelection}/>
                                    <Form.Label>Model_weights:</Form.Label>
                                    <Form.Control id="weightsFileInput" type="file" accept=".bin" onChange={handleModelFileSelection}/>
                                    <Button id="importBtn" variant="light" className='mt-2' onClick={importModel} disabled>Import model</Button>
                                </Form.Group>
                            </Form>
                        </div>

                        {/*Exporting current model*/}
                        <div>
                            <Button variant="light" className='mb-2' onClick={exportModel}>Export model</Button>
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