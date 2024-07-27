import React, { useRef, useState, useEffect } from "react";
import FaceDetection from "./FaceDetection";

const FaceExpression = ({ videoRef, onLandmarks }) => {
  const [detections, setDetections] = useState(false);
  const [landmarks, setLandmarks] = useState();

  useEffect(() => {
    // console.log(videoRef.current);
    if (detections && videoRef.current) {
      setLandmarks(landmarks);
      if (onLandmarks) {
        onLandmarks(landmarks); // onExpressions 콜백 호출
      }
    }
  }, [detections, landmarks, onLandmarks]);

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      console.log(detection);
      const landmarks = detection.landmarks;
    });
  };

  return <FaceDetection videoRef={videoRef} onDetections={handleDetections} />;
};

export default FaceExpression;
