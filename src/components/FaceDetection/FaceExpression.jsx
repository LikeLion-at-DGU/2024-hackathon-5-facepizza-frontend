import React, { useState, useEffect, useRef } from "react";
import FaceDetection from "./FaceDetection";

const FaceExpression = ({ videoRef, onExpressions, style }) => {
  const [detections, setDetections] = useState(false); // 인식이 성공적으로 이뤄졌는지 여부
  const [expressions, setExpressions] = useState({ maxKey: "start", maxValue: 0 }); // 인식된 감정 객체 {감정, 강도}
  const [faceDetectionKey, setFaceDetectionKey] = useState(Date.now()); // FaceDetection 컴포넌트의 key를 관리

  useEffect(() => {
    console.log('FaceExpression component mounted.');
    setFaceDetectionKey(Date.now()); // 페이지가 로드될 때마다 새로운 key를 설정
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    console.log('Detections or expressions changed:', { detections, expressions });
    if (detections && videoRef.current) {
      setExpressions(expressions);
      if (onExpressions) {
        onExpressions(expressions); // on: 부모 컴포넌트에 상태 전달
      }
    }
  }, [detections, expressions, onExpressions]);

  const handleDetections = (resizedDetections) => {
    try {
      console.log('Handle detections called.');
      resizedDetections.forEach((detection) => {
        const expressions = detection.expressions; // 감지된 감정
        const [maxKey, maxValue] = Object.entries(expressions).reduce(
          (acc, [key, value]) => (value > acc[1] ? [key, value] : acc),
          [null, -Infinity]
        );
        const faceExpression = { maxKey, maxValue }; // max값을 faceExpression에 저장 후
        if (maxValue > 0.5) {
          setDetections(true); // 확률값이 0.5 이상이면 Detections을 true로 설정
          setExpressions(faceExpression); // 감정 상태 업데이트
        } else {
          setDetections(false);
        }
      });
    } catch (error) {
      console.error('Error in handleDetections:', error);
    }
  };

  return (
    <>
      <p>FaceDetection Key: {faceDetectionKey}</p> {/* 디버깅을 위한 키 출력 */}
      <FaceDetection key={faceDetectionKey} videoRef={videoRef} onDetections={handleDetections} style={style} />
    </>
  );
};

export default FaceExpression;
