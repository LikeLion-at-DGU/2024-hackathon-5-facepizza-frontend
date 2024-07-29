import React, { useEffect, useState } from "react";
import FaceDetection from "./FaceDetection";

const FaceLocation = ({videoRef, onLandmarks}) => {
  const [detections, setDetections] = useState([])

  useEffect(() => {
    console.log(detections);
    if(detections.length > 0){
      const landmarks = detections.map(detection => detection.landmarks);
      const mouthLandmarks = landmarks.map(lm => lm.getMouth());

      const expressions = mouthLandmarks.map(mouth => detectExpression(mouth));

      if(onLandmarks){
        onLandmarks(expressions);
      }
    }
  },[detections, onLandmarks]);

  const handleLandmarks = (resizedDetections) => {
    setDetections(resizedDetections);
  }

  return(
    <FaceDetection videoRef={videoRef} onDetections={handleLandmarks}/>
  )
}

export default FaceLocation;