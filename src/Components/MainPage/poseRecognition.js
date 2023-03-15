import React from "react";
import Sketch from "react-p5";

function PoseRecognition() {

    let video;

    const setup = (p5, canvasParentRef) => {
        video = p5.createCapture(p5.VIDEO);
        p5.createCanvas(500, 500 * video.height / video.width).parent(canvasParentRef);
        video.hide();
    };

    const draw = (p5) => {
        // p5.translate(video.width, 0);
        // p5.scale(-1, 1);
        p5.image(video,0,0,p5.width, p5.width * video.height / video.width);
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;

