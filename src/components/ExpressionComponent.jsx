import React from "react";
import FaceDetectionCanvas from "./FaceDetectionCanvas"

const ExpressionComponent = ({ videoRef, canvasRef, isDetectionSuccessful }) => (
  <FaceDetectionCanvas
    videoRef={videoRef}
    canvasRef={canvasRef}
    isDetectionSuccessful={isDetectionSuccessful}
    detectionType="expressions"
  />
);

export default ExpressionComponent;