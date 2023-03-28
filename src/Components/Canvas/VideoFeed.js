import Sketch from "react-p5";
import {useContext} from "react";
import {ModelContext} from "../Context/ModelContext";


function VideoFeed() {

    const context = useContext(ModelContext);
    let video = context.data.video;
    let posePoints = context.data.points;
    let poseSkeleton = context.data.skeleton;


    const setup = (p5, canvasRef) => {
        p5.createCanvas(640,480).parent(canvasRef);
    }

    const draw = (p5) => {
        //Flip the image.
        p5.scale(-1, 1);
        p5.translate(-p5.width, 0);

        //Draw camera image
        if(video){
            p5.image(video, 0, 0, p5.width, p5.width * video.height / video.width);
        }

        //If pose was detected
        if(posePoints){
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

    return <Sketch setup={setup} draw={draw}/>;
}

export default VideoFeed;

