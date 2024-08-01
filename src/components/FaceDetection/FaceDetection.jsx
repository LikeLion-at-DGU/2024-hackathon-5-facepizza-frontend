//FaceDetection 정상코드 
import React, { useEffect } from "react";
import LoadApiModels from "./LoadApiModels"; // 얼굴 인식 모델을 로드하는 함수
import VideoComponent from "./VideoComponent"; // 비디오 스트림을 렌더링하는 컴포넌트
import * as faceapi from "face-api.js"; // 얼굴 인식 라이브러리

const FaceDetection = ({ videoRef, onDetections }) => {
  useEffect(() => {
    // console.log(videoRef.current);
    const setupFaceDetection = async () => {
      if (!videoRef.current) {
        console.error("FaceDetection: Video element is not ready");
        return;
      }

      try {
        await LoadApiModels(); // 모델 로드
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

                  // console.log(detections);

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

          // videoRef.current이 null이 아닌지 확인
          if (videoRef.current) {
            const intervalId = setInterval(detectFaces, 500); // 0.5초마다 얼굴 탐지

            // Cleanup function
            return () => clearInterval(intervalId);
          } else{
            console.error("videoRef is null");
          }
        };
      } catch (error) {
        console.error("Error loading models or setting up face detection:", error);
      }
    };

    setupFaceDetection();
  }, [videoRef, onDetections]);

  return (
    <VideoComponent videoRef={videoRef} />
  );
};

export default FaceDetection;
