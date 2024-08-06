import React, { useRef, useEffect } from "react";
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
        console.log("Loading models..."); // 디버깅: 모델 로드 시작
        await LoadApiModels();
        console.log("Models loaded successfully."); // 디버깅: 모델 로드 완료
        
        const videoElement = videoRef.current;

        const detectFaces = async () => {
          if (videoElement && videoElement.readyState >= 3) {
            console.log("Running face detection..."); // 디버깅: 얼굴 탐지 실행
            try {
              const displaySize = {
                width: videoElement.videoWidth,
                height: videoElement.videoHeight,
              };

              const detections = await faceapi
                .detectAllFaces(
                  videoElement,
                  new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions();

              console.log("Detected faces and expressions:", detections); // 디버깅: 감지된 얼굴 및 감정 로그

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
          } else {
            console.log("Video is not ready."); // 디버깅: 비디오가 준비되지 않음
            videoRef.current = null;
          }
        };

        // Video metadata event listener
        const onLoadedMetadata = () => {
          console.log("Video metadata loaded."); // 디버깅: 비디오 메타데이터 로드 완료

          // Start face detection
          const intervalId = setInterval(detectFaces, 500); // 0.5초마다 얼굴 탐지
          console.log("Interval ID:", intervalId); // 디버깅: interval ID 확인

          // Cleanup function
          return () => {
            clearInterval(intervalId); // Cleanup function
            console.log("Interval cleared."); // 디버깅: interval이 클리어 되었는지 확인
          };
        };

        videoElement.addEventListener('loadedmetadata', onLoadedMetadata);

        // Cleanup function for useEffect
        return () => {
          if (videoElement) {
            videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
          }
        };

      } catch (error) {
        console.error("Error가 감지되었습니다(FaceDetection.jsx):", error);
      }
    };

    setupFaceDetection();

    // Cleanup function for useEffect
    return () => {
      // Cleanup logic if needed
    };
  }, [videoRef, onDetections]);

  return (
    <>
      <VideoComponent videoRef={videoRef} style={style} />
    </>
  );
};

export default FaceDetection;
