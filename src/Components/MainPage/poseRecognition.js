import React from "react";
import Sketch from "react-p5";

function PoseRecognition() {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(255, 130, 20)
        p5.ellipse(100, 100, 100)
        p5.ellipse(300, 100, 100)
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default PoseRecognition;
