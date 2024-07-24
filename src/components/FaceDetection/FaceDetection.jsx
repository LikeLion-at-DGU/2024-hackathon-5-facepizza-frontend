import React, { useEffect, useState } from "react";
import LoadApiModels from "./LoadApiModels";
import * as faceapi from "face-api.js";

const FaceDetection = ({ videoRef, onDetections }) => {
  useEffect(() => {
    const setupFaceDetection = async () => {
      if (!videoRef.current) {
        console.log("Video element is not ready");
        return;
      }

      await LoadApiModels();

      videoRef.current.onloadedmetadata = () => {
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };

        const detectFaces = async () => {
          if (videoRef.current.readyState === 4) {
            const detections = await faceapi.detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            );
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            if (resizedDetections.length > 0) {
              const totalScore = resizedDetections.reduce(
                (acc, detection) => acc + detection.score,
                0
              );
              
              const average = totalScore / resizedDetections.length;

              console.log("Detected face:", resizedDetections);
              console.log("Average Score: ", average);
              
              if (onDetections) {
                onDetections(resizedDetections, average);
              }
            } else {
              console.log("No face detected");
              if (onDetections) {
                onDetections([], 0);
              }
            }
          }
        };

        setInterval(detectFaces, 1000);
      };
    };

    setupFaceDetection();
  }, [videoRef, onDetections]);

  return null;
};

export default FaceDetection;
