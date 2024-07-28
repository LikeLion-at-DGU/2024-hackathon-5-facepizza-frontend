import React, { useEffect } from "react";
import LoadApiModels from "./LoadApiModels"; // 얼굴 인식 모델을 로드하는 함수
import VideoComponent from "./VideoComponent"; // 비디오 스트림을 렌더링하는 컴포넌트
import * as faceapi from "face-api.js"; // 얼굴 인식 라이브러리

const FaceDetection = ({ videoRef, onDetections }) => {
  useEffect(() => {
    let intervalId; // setInterval의 ID를 저장할 변수

    const setupFaceDetection = async () => {
      if (!videoRef.current) { // videoRef가 유효한지 확인
        console.log("FaceDetection: Video element is not ready");
        return;
      }

      await LoadApiModels(); // 모델 로드

      const handleLoadedMetadata = () => {
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };

        const detectFaces = async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            // 1. 얼굴 감지 수행
            const detections = await faceapi
              .detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions() // TinyFaceDetector를 사용해 얼굴 감지
              )
              .withFaceLandmarks() // 얼굴 랜드마크 감지
              .withFaceExpressions(); // 얼굴 표정 감지
        
            // 2. 감지된 얼굴 결과를 비디오 크기에 맞게 조정
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize // 비디오의 크기로 조정
            );
        
            // 3. 감지된 얼굴이 있을 경우 처리
            if (resizedDetections.length > 0) {
              resizedDetections.forEach(detection => {
                // 3.1 감지된 각 얼굴에 대한 처리
                const totalScore = detection.detection.score; // 예측 정확도를 알려주는 점수
                const expressions = detection.expressions; // 표정 object
                const landmarks = detection.landmarks; // 랜드마크 object
        
                // 3.2 가장 높은 확률의 표정 찾기
                const [maxKey, maxValue] = Object.entries(expressions).reduce((acc, [key, value]) => { 
                  if (value > acc[1]) {
                    return [key, value]; // 더 높은 확률의 표정으로 갱신
                  } else {
                    return acc; // 현재 가장 높은 확률 유지
                  }
                }, [null, -Infinity]);
        
                // 3.3 감지된 얼굴 결과를 부모 컴포넌트로 전달
                if (onDetections && totalScore > 0.5) { // 예측 정확도가 0.5 이상일 때만 콜백 호출
                  onDetections(resizedDetections); // 감지된 얼굴 정보를 부모 컴포넌트로 전달
                }
              });
            } else {
              // 4. 얼굴이 감지되지 않은 경우 처리
              console.log("No face detected");
              if (onDetections) {
                onDetections([], 0); // 빈 배열을 전달하여 얼굴이 감지되지 않았음을 알림
              }
            }
          } else {
            console.log("감지 실행중/카메라 준비 안됨!!", videoRef.current?.readyState);
          }
        };

        intervalId = setInterval(detectFaces, 500); // 0.5초마다 얼굴 감지 실행
      };

      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
        clearInterval(intervalId); // 컴포넌트 언마운트 시 setInterval 클리어
      };
    };

    setupFaceDetection();
  }, [videoRef, onDetections]);

  return (
    <VideoComponent videoRef={videoRef} />
  );
};

export default FaceDetection;
