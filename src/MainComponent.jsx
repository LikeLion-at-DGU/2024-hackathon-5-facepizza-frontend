import React, { useRef } from "react";
import VideoComponent from "./components/FaceDetection/VideoComponent";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import LandmarkComponent from "./components/FaceDetection/LandmarkComponent";
import ExpressionComponent from "./components/FaceDetection/ExpressionComponent";

const MainComponent = ({}) => {
  const videoRef = useRef(); 
  const canvasRef = useRef();

  return (
    <>
      <VideoComponent videoRef={videoRef} />
      <FaceDetection videoRef={videoRef}/>
    </>
  );
};

export default MainComponent;
