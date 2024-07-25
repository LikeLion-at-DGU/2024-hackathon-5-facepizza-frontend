import React, { useEffect } from "react";
import LoadApiModels from "./LoadApiModels";
import VideoComponent from "./VideoComponent";
import * as faceapi from "face-api.js";

const FaceDetection = ({ videoRef, onDetections }) => {
  useEffect(() => {
    const setupFaceDetection = async () => {
      if (!videoRef.current) {
        console.log("FaceDetection: Video element is not ready");
        return;
      }
      
      await LoadApiModels(); // 모델 로드

      videoRef.current.onloadedmetadata = () => {
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };

        const detectFaces = async () => {
          if (videoRef.current.readyState === 4) {
            const detections = await faceapi
              .detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
              )
              .withFaceLandmarks()
              .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            if (resizedDetections.length > 0) {
              resizedDetections.forEach(detection => {
                // 각 얼굴에 대한 처리
                const totalScore  = detection.detection.score; //예측 정확도를 알려주는 점수
                const expressions = detection.expressions; //표정 object
                const landmarks = detection.landmarks; //landmark object

                // console.log("Detected face:", detection);
                // console.log("Score: ", totalScore);
                // console.log("Expression: ", expressions);
                // console.log("Landmark: ", landmarks);

                const [maxKey, maxValue] = Object.entries(expressions).reduce((acc, [key, value]) => { //가장 큰 확률의 표정
                  if (value > acc[1]) {
                    return [key, value];
                  } else {
                    return acc;
                  }
                }, [null, -Infinity]);
                
                // console.log("Key with maximum value:", maxKey); //현재의 표정
                // console.log("Maximum value:", maxValue); //표정의 정확도

                if (onDetections && totalScore > 0.5) {  //0.5 이상의 정확도를 가질 떄
                  // console.log("FaceDetection Score: ", totalScore);
                  // console.log("FaceDetection resizedDetection: ", resizedDetections);
                  onDetections(resizedDetections);
                }
              });
            } else {
              console.log("No face detected");
              if (onDetections) {
                onDetections([], 0);
              }
            }
          }
        };

        setInterval(detectFaces, 1000); // 1초마다 얼굴 탐지
      };
    };

    setupFaceDetection();
  }, [videoRef, onDetections]);

  return(
    <VideoComponent videoRef={videoRef}/>
  );
};

export default FaceDetection;
