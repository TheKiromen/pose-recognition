import './App.css';
import Login from "../LoginPage/loginForm";
import ControlPanel from "../ControlPanel/controllPanel";
import Logout from "../LogoutPage/LogoutForm";
import VideoFeed from "../Canvas/VideoFeed";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {ModelContext} from "../Context/ModelContext";
import {LabelContext} from "../Context/LabelContext";
import {useEffect, useState} from "react";
import * as processing from 'p5'
import * as ml5 from 'ml5'
// import {User} from "../Canvas/VideoFeed";


// Elementy odpowiedzialne za Bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from "../Navbar";
import CreatorsFooter from "../Footer"
import ProtectedRouted from "../RouteSettings/ProtectedRouted";
import SessionRoute from "../RouteSettings/SessionRoute";


function App() {
	const [data, setData] = useState({video: undefined, points: undefined, skeleton: undefined, model: undefined});
	const [label, setLabel] = useState("");
	const [list, setList] = useState([]);
	const [linkmodel, setLinkmodel] = useState("test-model");

	let video;
	let poseNet;

	let p5;
	//let modeltype= "test-model";

	//console.log(modeltype);

	const options = {
		inputs: 34,
		outputs: 1,
		task: 'classification',
		debug: true
	}
	const model = ml5.neuralNetwork(options);
	const modelInfo = {};

	//Initialize ML models
	useEffect(()=>{
		//TODO Get models list from firebase and set it as state
		setList(prev => {
			return ["test-model","new-model"];
		});

		console.log(linkmodel);

		//Download model files
		const getModelUrl = async (fileRef) => {
			return await getDownloadURL(fileRef)
				.then((url) => {
					return url;
				})
				.catch((error) => {
					console.log(error);
					return "";
				});
		};

		//Fetch all models (now is permanently test)
		const fetchModels = async () => {
			//Storage URL
			const storage = getStorage();

			const modelRef = ref(storage, linkmodel + '/model.json');
			const metaRef = ref(storage, linkmodel + '/model_meta.json');
			const weightRef = ref(storage, linkmodel + '/model.weights.bin');

			//Get all data to modelInfo
			modelInfo.model = await getModelUrl(modelRef);
			modelInfo.metadata = await getModelUrl(metaRef);
			modelInfo.weights = await getModelUrl(weightRef);
		}

		// Wait until all data is downloaded
		(async () => {
			await fetchModels().then(() => {

				//Initialize model
				//model = ml5.neuralNetwork(options);

				//Load trained model data
				model.load(modelInfo, () => {
					console.log("Main Model loaded!");
					//console.log(ml5.neuralNetwork.model);
					setData(prev => {
						return {...prev, model: model};
					});
				});

			});
		})();

		//Initialize p5.js
		p5 = new processing();

		//Initialize video capture
		video = p5.createCapture(p5.VIDEO);
		video.hide();

		setData(prev => {
			return {...prev, video: video};
		});

		//Initialize poseNet
		if(poseNet===undefined) {
			console.log(poseNet);
			poseNet = ml5.poseNet(video, () => {
				console.log("Main PoseNet Ready!");
				console.log(poseNet);
				setData(prev => {
					return {...prev, poseNet: poseNet};
				});
			});
			//poseNet.removeListener('pose', poseDetected);
			poseNet.on('pose', poseDetected);
		}

	},[linkmodel]);

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
			console.log(model);
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
		<ModelContext.Provider value={{data, setData, list, setLinkmodel}}>
			<LabelContext.Provider value={label}>
				<BrowserRouter>
					<div id="cover_everything">
					<MainNavbar/>
					<Routes>
						<Route index element={<VideoFeed/>}/>
						<Route path="/:modeltype" element={<VideoFeed/>}/>
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