import React, { useRef, useState, useEffect } from "react";
import LoadApiModels from "./LoadApiModels";
import VideoComponent from "./VideoComponent";
import * as faceapi from "face-api.js";

const FaceDetection = ({ videoRef, onDetections, style }) => {
  useEffect(() => {
    const setupFaceDetection = async () => {
      if (!videoRef.current) {
        console.error("FaceDetection: 비디오가 준비되지 않았습니다.");
        return;
      }

      try {
        await LoadApiModels();
        if (videoRef.current){
          videoRef.current.onloadedmetadata = () => {
            const displaySize = {
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            };

            const detectFaces = async () => {
              // videoRef.current이 여전히 유효한지 확인
              if (videoRef.current && videoRef.current.readyState === 4) {
                try {
                  const detections = await faceapi
                    .detectAllFaces(
                      videoRef.current,
                      new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();

                  // 디버깅: 감지된 결과 로그
                  console.log("Detected faces and expressions:", detections);

                  const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                  );

                  if (onDetections) {
                    onDetections(resizedDetections);
                  }
                } catch (error) {
                  console.error("Error during face detection:", error);
                }
              }
            };

            const intervalId = setInterval(detectFaces, 500); // 0.5초마다 얼굴 탐지
            return () => clearInterval(intervalId); // Cleanup function
          
          };
        }
      } catch (error) {
        console.error("Error가 감지되었습니다(FaceDetection.jsx):", error);
      }
    };

    setupFaceDetection();

    // Cleanup function for useEffect
    return () => {
      if (videoRef.current) {
        videoRef.current.onloadedmetadata = null;
      }
    };
  }, [videoRef, onDetections]);

  return (
    <>
      <VideoComponent videoRef={videoRef} style={style} />
      <p>FaceDetection Component Loaded</p> {/* 디버깅: 컴포넌트 로드 확인 */}
    </>
  );
};

export default FaceDetection;