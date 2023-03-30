import './App.css';
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import Logout from "../LogoutPage/LogoutForm";
import VideoFeed from "../Canvas/VideoFeed";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ModelContext} from "../Context/ModelContext";
import {LabelContext} from "../Context/LabelContext";
import {useEffect, useState} from "react";
import * as ml5 from 'ml5'


import * as processing from 'p5'
// Elementy odpowiedzialne za Bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from "../Navbar";
import CreatorsFooter from "../Footer"
import ProtectedRouted from "../RouteSettings/ProtectedRouted";
import SessionRoute from "../RouteSettings/SessionRoute";


function App() {
	const [data, setData] = useState({video: undefined, points: undefined, skeleton: undefined});
	const [label, setLabel] = useState("");

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
		model: 'DefaultModelData/model.json',
		metadata: 'DefaultModelData/model_meta.json',
		weights: 'DefaultModelData/model.weights.bin',
	};

	//Initialize ML models
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

	},[]);

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

			model.classify(data, (err, res) => {
				// console.log(res[0].label + " | " + res[0].confidence);
				//FIXME Pick better formatting for output
				setLabel(res[0].label.toUpperCase() + " | " + res[0].confidence);
			});
		}else{
			setLabel("No pose detected");
		}

		setData(prev => {
			return {...prev, points: currentPose, skeleton: skeleton};
		});

	}


    return (
		<ModelContext.Provider value={{data, setData}}>
			<LabelContext.Provider value={label}>
				<BrowserRouter>
					<div id="cover_everything">
					<MainNavbar/>
					<Routes>
						<Route index element={<VideoFeed/>}/>
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
			</LabelContext.Provider>
		</ModelContext.Provider>
    );
}

export default App;