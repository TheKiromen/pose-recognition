import React from "react";
import Sketch from "react-p5";

function PoseRecognition() {

    let video;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
        video = p5.createCapture(p5.VIDEO);
        video.hide();
    };

    //TODO Check for camera's aspect reatio's
    const draw = (p5) => {
        // p5.translate(video.width, 0);
        // p5.scale(-1, 1);
        p5.image(video,0,0,p5.width, p5.width * video.height / video.width);
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;

