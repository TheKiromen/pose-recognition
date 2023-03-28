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
import VideoFeed from "../Canvas/VideoFeed";


function App() {
	//TODO Move it to outside file and import proper functions and objects?
	const [data, setData] = useState({video: undefined, points: undefined, skeleton: undefined});

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
	//FIXME Change to useMemo to initialize before render
	useEffect(()=>{
		//Initialize p5.js
		p5 = new processing();

		//Initialize model
		model = ml5.neuralNetwork(options);

		//Load trained model data
		model.load(modelInfo, () => {
			console.log("Main Model loaded!");
			setData(prev => {
				return {...prev, ml5: model};
			});
		});

		//Initialize video capture
		video = p5.createCapture(p5.VIDEO);
		video.hide();
		setData(prev => {
			return {...prev, video: video};
		});

		//Initialize poseNet
		poseNet = ml5.poseNet(video, () => {
			console.log("Main PoseNet Ready!");
			setData(prev => {
				return {...prev, poseNet: poseNet};
			});
		});

		poseNet.on('pose', poseDetected);

	},[])

	function poseDetected(poses){
		let data, currentPose, skeleton;

		//If Pose detected pick first and check confidence score
		if(poses.length > 0 && poses[0].pose.score > 0.6){
			//Set new pose
			currentPose = poses[0].pose;
			skeleton = poses[0].skeleton;

			data = [];
			for (let i = 0; i < currentPose.keypoints.length; i++) {
				//Get x and y coordinates of keypoint
				let x = currentPose.keypoints[i].position.x;
				let y = currentPose.keypoints[i].position.y;
				data.push(x);
				data.push(y);
			}

			model.classify(data, (err, res) => console.log(res[0].label + " | " + res[0].confidence));
		}

		setData(prev => {
			return {...prev, points: currentPose, skeleton: skeleton};
		});

	}


    return (
		<ModelContext.Provider value={{data, setData}}>
			<BrowserRouter>
				<div id="cover_everything">
				<MainNavbar/>
				<Routes>
					<Route index element={<VideoFeed/>}/>
					{/*FIXME Change to wrapper element for VideoFeed*/}
					{/*<Route index element={<PoseRecognition/>}/>*/}
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