import React, { useRef } from "react";
import FaceExpression from "./FaceExpression";

const FaceExercise = () => {
    const videoRef = useRef();
    return(
        <FaceExpression videoRef={videoRef}/>
    )
}

export default FaceExercise;