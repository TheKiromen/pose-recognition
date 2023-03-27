import Sketch from "react-p5";
import {useContext} from "react";
import {ModelContext} from "../Context/ModelContext";

function VideoFeed() {

    const context = useContext(ModelContext);
    let p5 = context.data.p5;
    let model = context.data.ml5;
    let poseNet = context.data.poseNet;

    //FIXME undefined on setup
    const setup = () => {
        console.log(p5);
        console.log(model);
        console.log(poseNet);
    }

    const draw = () => {
        //TODO
    }

    return <Sketch setup={setup} draw={draw}/>;
}

export default VideoFeed;

