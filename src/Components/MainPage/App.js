import './App.css';
import PoseRecognition from "./poseRecognition";
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import Logout from "../LogoutPage/LogoutForm";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ModelContext} from "../Context/ModelContext";
import {useEffect, useState} from "react";
import * as processing from 'p5'
import * as ml5 from 'ml5'

// Elementy odpowiedzialne za Bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from "../Navbar";
import CreatorsFooter from "../Footer"
import ProtectedRouted from "../RouteSettings/ProtectedRouted";
import SessionRoute from "../RouteSettings/SessionRoute";


function App() {
	const [data, setData] = useState({ml5: undefined, poseNet: undefined, p5: undefined});

	let video;
	let poseNet;
	let model;
	let p5;

	const options = {
		inputs: 34,
		outputs: 1,
		task: 'classification',
		debug: true
	}
	const modelInfo = {
		model: 'ModelData/model.json',
		metadata: 'ModelData/model_meta.json',
		weights: 'ModelData/model.weights.bin',
	};

	//Initialize ML models
	useEffect(()=>{
		//Initialize p5.js
		p5 = new processing();
		setData(prev => {
			return {...prev, p5: p5};
		});

		//Initialize model
		model = ml5.neuralNetwork(options);

		//Load trained model data
		model.load(modelInfo, () => {
			console.log("Main Model loaded!");
			setData(prev => {
				return {...prev, ml5: model};
			});
		});

		//Initialize capture
		video = p5.createCapture(p5.VIDEO);

		//Initialize poseNet
		poseNet = ml5.poseNet(video, () => {
			console.log("Main PoseNet Ready!");
			setData(prev => {
				return {...prev, poseNet: poseNet};
			});
		});

	},[])


    return (
		<ModelContext.Provider value={{data, setData}}>
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