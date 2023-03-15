import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5";

function PoseRecognition() {

    let video;
    let poseNet;
    let currentPose;
    let skeleton;

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
        //Flip image horizontally
        p5.scale(-1, 1);
        p5.translate(-640, 0);
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

            //FIXME Combine this with drawing skeleton to loop only once?
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
        //FIXME pick appropriate confidence score.
        if(poses.length > 0 && poses[0].pose.score > 0.3){
            //Set new pose
            currentPose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }else{
            //Clear data to prevent unnecessary computations
            currentPose = null;
            skeleton = null;
        }
    }

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;

