import "../../index.css"
import "./VideoFeed.css"
import Sketch from "react-p5";
import Container from "react-bootstrap/Container";
import {useContext} from "react";
import {ModelContext} from "../Context/ModelContext";
import {LabelContext} from "../Context/LabelContext";
import {ListGroup} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getStorage} from "firebase/storage";
import {app} from "../Firebase/FirebaseConfig";

// const User = () => {
//     const { modeltype } = useParams();
//     let proba = {modeltype}
//     //console.log(proba.modeltype);
//     return proba;
// }

function VideoFeed() {

    const context = useContext(ModelContext);
    const label = useContext(LabelContext);
    let video = context.data.video;
    let posePoints = context.data.points;
    let poseSkeleton = context.data.skeleton;
    let list = context.list;

    //console.log(User().modeltype);

    // function NameModel() {
    //     const {modeltype} = useParams();
    //     let proba = {modeltype}
    //     //console.log(proba.modeltype);
    //     return proba;
    // }

    const setup = (p5, canvasRef) => {
        p5.createCanvas(640, 480).parent(canvasRef);
    }

    const draw = (p5) => {
        //Flip the image.
        p5.scale(-1, 1);
        p5.translate(-p5.width, 0);

        //Draw camera image
        if (video) {
            p5.image(video, 0, 0, p5.width, p5.width * video.height / video.width);
        }

        //If pose was detected
        if (posePoints) {
            //Draw the skeleton
            for (let i = 0; i < poseSkeleton.length; i++) {
                //Get adjacent points
                let a = poseSkeleton[i][0];
                let b = poseSkeleton[i][1];
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
            for (let i = 0; i < posePoints.keypoints.length; i++) {
                //Get x and y coordinates of keypoint
                let x = posePoints.keypoints[i].position.x;
                let y = posePoints.keypoints[i].position.y;
                //Draw the keypoint
                p5.ellipse(x, y, 16, 16);
            }
        }


    }

    return (
        <Container>
            <div id={"label"}>{label}</div>
            <Sketch setup={setup} draw={draw}/>
            <div id="model_label"><b>Avaiable models:</b></div>
            <div id="centering_id">
                <ListGroup defaultActiveKey=":link0">
                    {
                        list.map((label, i) => {
                            return (
                                <ListGroup.Item action href={":link"+i}>
                                    {label}
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
                <button onClick={() => context.setLinkmodel("new_model")}>CLICK</button>
            </div>
        </Container>
    );
}

export default VideoFeed;
// export {User};

