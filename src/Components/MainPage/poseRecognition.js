import React from "react";
import Sketch from "react-p5";

function PoseRecognition() {

    let video;

    const setup = (p5, canvasParentRef) => {
        //Create canvas and set parent component
        p5.createCanvas(640, 480).parent(canvasParentRef);
        //Get webcam data
        video = p5.createCapture(p5.VIDEO);
        //Hide webcam preview
        video.hide();
    };

    const draw = (p5) => {
        //OBS 1920 x 1080 (16:9)
        //CAM Mine 640 x 480 (4:3)
        //CAN Pablo
        //CAM Wojtke
        //TODO Test webcam aspect ratios
        // console.log(video.width + " " + video.height);

        //Flip image horizontally
        p5.scale(-1, 1);
        p5.translate(-640, 0);
        //Draw image from webcam
        p5.image(video, 0, 0, p5.width, p5.width * video.height / video.width);
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;

