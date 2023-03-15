import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5";

function PoseRecognition() {

    let video;
    let poseNet;
    let currentPose;

    const setup = (p5, canvasParentRef) => {
        //Create canvas and set parent component
        p5.createCanvas(640, 480).parent(canvasParentRef);
        //Get webcam data
        video = p5.createCapture(p5.VIDEO);
        //Hide webcam preview
        video.hide();

        //Initialize poseNet;
        poseNet = ml5.poseNet(video, () => console.log("PoseNet Ready!"));
        //Setup callback on pose detection
        poseNet.on('pose', poseDetected);
    };

    const draw = (p5) => {
        //OBS 1920 x 1080 (16:9)
        //CAM Mine 640 x 480 (4:3)
        //CAN Pablo 640 x 480 (4:3)
        //CAM Wojtke
        //TODO Test webcam aspect ratios
        // console.log(video.width + " " + video.height);

        //Flip image horizontally
        p5.scale(-1, 1);
        p5.translate(-640, 0);
        //Draw image from webcam
        p5.image(video, 0, 0, p5.width, p5.width * video.height / video.width);

        if(currentPose){
            p5.fill("red");
            p5.ellipse(currentPose.nose.x, currentPose.nose.y, 50);
        }
    };

    function poseDetected(poses){
        //If there is at least 1 pose detected
        if(poses.length > 0){
            currentPose = poses[0].pose;
            console.log(currentPose);
        }
    }

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;

