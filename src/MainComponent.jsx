import React, { useRef } from "react";
import VideoComponent from "./components/VideoComponent";
import FaceDetection from "./components/FaceDetection";
import LandmarkComponent from "./components/LandmarkComponent";

const MainComponent = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  return (
    <>
      <VideoComponent videoRef={videoRef} />
      <FaceDetection videoRef={videoRef} canvasRef={canvasRef} />
      <LandmarkComponent/>
    </>
  );
};

export default MainComponent;
