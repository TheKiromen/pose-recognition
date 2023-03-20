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
import SinginForm from "../SinginPage/singinForm";
import ProtectedRouted from "../RouteSettings/ProtectedRouted";
import SessionRoute from "../RouteSettings/SessionRoute";

function App() {
    return (
        // In order for return to accept more than 1 element you have to cheat it
        // and insert all elements into one div as parent, hence the comments must be as {/**/},
        // not just //. Btw I encourage you to describe the code with comments just like here pls.

        <div id="cover_everything">
            {/*Navigation between pages*/}

            {/*Moved MainNavbar to BrowserRouter to be able to navigate after logout using Navigate*/}

            {/*Routing po komponentach*/}
            <ModelContext.Provider value={"Test"}>
                <BrowserRouter>
                    <MainNavbar/>
                    <Routes>
                        <Route index element={<PoseRecognition/>}/>
                        <Route element={<SessionRoute />}>
                            <Route path="/login" element={<Login/>}/>
                        </Route>
                        <Route path="/singin" element={<SinginForm/>}/>
                        {/*<Route path="controlPanel" element={<ControlPanel/>}/>*/}
                        <Route element={<ProtectedRouted />}>
                            <Route path="/controlPanel" element={<ControlPanel />}/>
                        </Route>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </BrowserRouter>
            </ModelContext.Provider>

            <CreatorsFooter/>
        </div>
    );
}

export default App;