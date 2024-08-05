//FaceExpression.jsx 기존 정상코드
import React, { useRef, useState, useEffect } from "react";
import FaceDetection from "./FaceDetection";

const FaceExpression = ({ videoRef, onExpressions, style }) => {
  const [detections, setDetections] = useState(false);  ///인식이 성공적으로 이뤄졌는지 여부
  const [expressions, setExpressions] = useState({ maxKey: "start", maxValue: 0 });   //인식된 감정 객체 {감정, 강도}

  useEffect(() => {
    if (detections && videoRef.current) {
      setExpressions(expressions);
      // console.log(expressions);
      if (onExpressions) {
        onExpressions(expressions); // on: 부모컴포넌트에 상태 전달     
      }
    }
  }, [detections, expressions, onExpressions]); 

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      // console.log(detection);
      const expressions = detection.expressions;   //감지된 감정
      // console.log(expressions);
      const [maxKey, maxValue] = Object.entries(expressions).reduce(    //reduce매서드 : 객체를 돌면서 가장 큰 값을 찾음
        (acc, [key, value]) => value > acc[1] ? [key, value] : acc,  //acc[1] 누산된 값중 가장 큰 값
        [null, -Infinity]
      );
      const faceExpression = { maxKey, maxValue };   //max값을 faceExpression에 저장 후 
      if (maxValue > 0.5) {             
        setDetections(true);             //확률값이 0.5이상이면 Detections을 true로 설정
        setExpressions(faceExpression);   // 감정상태 업데이트
      } else {
        setDetections(false);
      }
    });
  };

  return (
    <FaceDetection videoRef={videoRef} onDetections={handleDetections} style={style} /> //FaceDetection에서 얼굴을 탐지할 때마다 handleDetections 호출
  );
};

export default FaceExpression;
