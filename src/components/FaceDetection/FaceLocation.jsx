import React, { useRef } from "react";
import FaceDetection from "./FaceDetection";

const FaceLocation = () => {
    const videoRef = useRef();
    console.log(FaceDetection);

    return(
        <FaceDetection videoRef={videoRef}/>
    )
}

export default FaceLocation;