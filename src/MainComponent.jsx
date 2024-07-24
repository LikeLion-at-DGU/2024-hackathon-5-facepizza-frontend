import React, { useRef } from "react";
import VideoComponent from "./components/VideoComponent";
import FaceDetection from "./components/FaceDetection";
import LandmarkComponent from "./components/LandmarkComponent";
import ExpressionComponent from "./components/ExpressionComponent";

const MainComponent = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  return (
    <>
      <VideoComponent videoRef={videoRef} />
      <FaceDetection videoRef={videoRef} canvasRef={canvasRef} />
      <ExpressionComponent/>
    </>
  );
};

export default MainComponent;
