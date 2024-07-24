import React, { useEffect } from "react";
import FaceDetectionCanvas from "./FaceDetectionCanvas";
import LoadApiModels from "./LoadApiModels";

const ExpressionComponent = ({ videoRef, canvasRef, isDetectionSuccessful }) =>
  useEffect(() => {
    const setupApi = async () => {
      await LoadApiModels("Expressions");
    };
  });

export default ExpressionComponent;
