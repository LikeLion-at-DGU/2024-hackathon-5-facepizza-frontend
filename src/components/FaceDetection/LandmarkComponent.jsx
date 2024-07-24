import React, { useState, useRef } from "react";
import * as faceapi from "face-api.js";
import FaceDetection from "./FaceDetection";

const LandmarkComponent = () => {
  const videoRef = useRef();
  const [landmarks, setLandmarks] = useState([]);

  const handleDetections = async (detections, average) => {
    if (detections.length > 0) {
      const detectionsWithLandmarks = await faceapi.detectFaceLandmarks(videoRef.current);
      console.log(detectionsWithLandmarks);
      setLandmarks(detectionsWithLandmarks);
      console.log("Detections with landmarks:", detectionsWithLandmarks);
    } else {
      setLandmarks([]);
      console.log("No face detected");
    }
  };

  return (
    <>
      <video ref={videoRef} autoPlay={true} width="720" height="540" />
      <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
      <div>
        {landmarks.length > 0 ? (
          <div>
            <p>Detected landmarks:</p>
            {landmarks.map((landmark, index) => (
              <p key={index}>{JSON.stringify(landmark)}</p>
            ))}
          </div>
        ) : (
          <p>No landmarks detected</p>
        )}
      </div>
    </>
  );
};

export default LandmarkComponent;
