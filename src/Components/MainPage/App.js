import './App.css';
import PoseRecognition from "./poseRecognition";
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import Logout from "../LogoutPage/LogoutForm";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ModelContext} from "../Context/ModelContext";

// Elementy odpowiedzialne za Bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from "../Navbar";
import CreatorsFooter from "../Footer"
import ProtectedRouted from "../RouteSettings/ProtectedRouted";
import SessionRoute from "../RouteSettings/SessionRoute";
import {useState} from "react";

function App() {
    const [test, setTest] = useState("dziala");
    return (

            <ModelContext.Provider value={"Test"}>
                <BrowserRouter>
                    <div id="cover_everything">
                    <MainNavbar/>
                        <button onClick={() => setTest("Bojtek")}>Helo Karthus</button>
                        <div>
                            {test}
                        </div>
                    <Routes>
                        <Route index element={<PoseRecognition/>}/>
                        <Route element={<SessionRoute />}>
                            <Route path="/login" element={<Login/>}/>
                        </Route>
                        {/*<Route path="controlPanel" element={<ControlPanel/>}/>*/}
                        <Route element={<ProtectedRouted />}>
                            <Route path="/controlPanel" element={<ControlPanel />}/>
                        </Route>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                    </div>
                </BrowserRouter>
                <CreatorsFooter/>
            </ModelContext.Provider>



    );
}

export default App;