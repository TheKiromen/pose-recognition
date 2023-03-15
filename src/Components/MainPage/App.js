import './App.css';
import * as ml5 from "ml5";
import PoseRecognition from "./poseRecognition";
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        //Routing po komponentach
        <BrowserRouter>
            <Routes>
                <Route index element={<PoseRecognition />} />
                <Route path="login" element={<Login />} />
                <Route path="controlPanel" element={<ControlPanel />} />
                <Route path="*" element={ <Navigate to ="/" />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;