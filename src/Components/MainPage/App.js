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

function App() {
    const [test, setTest] = useState("Initial Value");

    return (
		<ModelContext.Provider value={{test, setTest}}>
			<BrowserRouter>
				<div id="cover_everything">
				<MainNavbar/>
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