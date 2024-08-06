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

        const onVideoLoaded = () => {
          console.log("Video can play."); // 디버깅: 비디오 재생 가능

          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          };

          console.log("Video dimensions:", displaySize); // 디버깅: 비디오 크기 확인

          const detectFaces = async () => {
            if (videoRef.current && videoRef.current.readyState === 4) {
              console.log("Running face detection..."); // 디버깅: 얼굴 탐지 실행
              try {
                const detections = await faceapi
                  .detectAllFaces(
                    videoRef.current,
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
            }
          };

          // Check if intervalId is being set and cleared correctly
          const intervalId = setInterval(detectFaces, 500); // 0.5초마다 얼굴 탐지
          console.log("Interval ID:", intervalId); // 디버깅: interval ID 확인

          return () => {
            clearInterval(intervalId); // Cleanup function
            console.log("Interval cleared."); // 디버깅: interval이 클리어 되었는지 확인
          };
        };

        // oncanplay 이벤트 핸들러 설정
        videoRef.current.oncanplay = onVideoLoaded;

        // 비디오가 이미 로드된 상태라면, onVideoLoaded 콜백을 강제로 실행
        if (videoRef.current.readyState >= 3) {
          onVideoLoaded();
        }
      } catch (error) {
        console.error("Error가 감지되었습니다(FaceDetection.jsx):", error);
      }
    };

    setupFaceDetection();

    // Cleanup function for useEffect
    return () => {
      if (videoRef.current) {
        videoRef.current.oncanplay = null;
      }
    };
  }, [videoRef, onDetections]);

  return (
    <>
      <VideoComponent videoRef={videoRef} style={style} />
    </>
  );
};

export default FaceDetection;
