import React, {useContext} from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5";
import {ModelContext} from "../Context/ModelContext";


//FIXME Move initialization outside to main application
function PoseRecognition() {

    const context = useContext(ModelContext);

    let video;
    let poseNet;
    let network;
    let currentPose;
    let skeleton;

    const options = {
        inputs: 34,
        outputs: 1,
        task: 'classification',
        debug: true
    }
    let data = [];
    const modelInfo = {
        model: 'ModelData/model.json',
        metadata: 'ModelData/model_meta.json',
        weights: 'ModelData/model.weights.bin',
    };

    const trainingSettings = {
        epochs: 100
        // epochs: 32,
        // batchSize: 12
    }

    const collectData = (p5) =>{
        if(p5.keyCode === p5.ENTER){
            //FIXME temporary data collection for debugging purposes
            setTimeout(()=>{
                console.log("COLLECTING!");
                //Collects single pose
                for (let i = 0; i < currentPose.keypoints.length; i++) {
                    //Get x and y coordinates of keypoint
                    let x = currentPose.keypoints[i].position.x;
                    let y = currentPose.keypoints[i].position.y;
                    //Draw the keypoint
                    data.push(x);
                    data.push(y);
                }
                network.addData(data,["Y"]);
                network.saveData();
                console.log("FINISHED");
            },3000);
        }
    };


    const setup = (p5, canvasParentRef) => {
        //Create canvas and set parent component
        p5.createCanvas(640, 480).parent(canvasParentRef);
        //Get webcam data
        video = p5.createCapture(p5.VIDEO);
        //Hide webcam preview
        video.hide();

        //Initialize network
        network = ml5.neuralNetwork(options);

        //Load ready model
        network.load(modelInfo, () => console.log("Model loaded"));

        // network.loadData("ModelData/ymca.json", () => {
        //     console.log("Data Loaded")
        //     network.normalizeData();
        //     network.train(trainingSettings, () => console.log("Finished Training"));
        // });


        //Initialize poseNet;
        poseNet = ml5.poseNet(video, () => console.log("PoseNet Ready!"));
        //Setup callback on pose detection
        poseNet.on('pose', poseDetected);
    };

    const draw = (p5) => {
        //Flip the image.
        p5.scale(-1, 1);
        p5.translate(-p5.width, 0);

        //Draw image from webcam
        p5.image(video, 0, 0, p5.width, p5.width * video.height / video.width);

        //If pose was detected
        if(currentPose){
            //Draw the skeleton
            for (let i = 0; i < skeleton.length; i++) {
                //Get adjacent points
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                //Draw outline
                p5.stroke("white");
                p5.strokeWeight(5);
                p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
                //Draw line fill
                p5.stroke("black");
                p5.strokeWeight(3);
                p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
            }

            //Draw characteristic points
            p5.stroke("white");
            p5.strokeWeight(2);
            p5.fill('black');
            for (let i = 0; i < currentPose.keypoints.length; i++) {
                //Get x and y coordinates of keypoint
                let x = currentPose.keypoints[i].position.x;
                let y = currentPose.keypoints[i].position.y;
                //Draw the keypoint
                p5.ellipse(x, y, 16, 16);
            }
        }
    };

    function poseDetected(poses){
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
            //FIXME Move classification elsewhere
            network.classify(data, (err, res) => console.log(res[0].label + " | " + res[0].confidence));
        }else{
            //Clear data to prevent unnecessary computations
            currentPose = null;
            skeleton = null;
        }
    }

    return <Sketch setup={setup} draw={draw} keyPressed={collectData}/>;
}

export default PoseRecognition;

