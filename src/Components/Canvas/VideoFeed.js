import Sketch from "react-p5";
import {useContext} from "react";
import {ModelContext} from "../Context/ModelContext";

//TODO Should only be responsible for displaying result?
// Move whole classification etc outside to the main app?
function VideoFeed() {

    const context = useContext(ModelContext);
    let p5 = context.data.p5;
    let model = context.data.ml5;
    let poseNet = context.data.poseNet;

    //TODO Create setup for canvas, get video instead of p5?
    const setup = (p5, canvasRef) => {
        console.log(p5);
        console.log(model);
        console.log(poseNet);
        p5.createCanvas(500, 500).parent(canvasRef);
    }

    const draw = (p5) => {
        p5.stroke("black");
        p5.strokeWeight(3);
        p5.line(100,100, 250, 250);
    }

    return <Sketch setup={setup} draw={draw}/>;
}

export default VideoFeed;

