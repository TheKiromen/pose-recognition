import './App.css';
import PoseRecognition from "./poseRecognition";
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

// Elementy odpowiedzialne za Bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from "../Navbar";

function App() {
    return (
        // In order for return to accept more than 1 element you have to cheat it
        // and insert all elements into one div as parent, hence the comments must be as {/**/},
        // not just //. Btw I encourage you to describe the code with comments just like here pls.
        //TODO Change website color palette
        <div>
            {/*Navigation between pages*/}
            <MainNavbar/>

            {/*Routing po komponentach*/}
            <BrowserRouter>
                <Routes>
                    <Route index element={<PoseRecognition/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="controlPanel" element={<ControlPanel/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;