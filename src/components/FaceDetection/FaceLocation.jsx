import React, { useState, useEffect } from 'react';
import FaceDetection from './FaceDetection';

const FaceLocation = ({ videoRef, onLandmarks }) => {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    if (detections.length > 0) {
      
      const landmarks = detections.map(detection => detection.landmarks);
      const mouthLandmarks = landmarks.map(lm => lm.getMouth());
      
      console.log(mouthLandmarks);

      const expressions = mouthLandmarks.map(mouth => detectExpression(mouth));

      console.log(expressions);

      if (onLandmarks) {
        onLandmarks(expressions);
      }
    }
  }, [detections, onLandmarks]);

  const detectExpression = (mouth) => {
    // 입술 랜드마크를 분석하여 발음을 추정하는 로직
    const isA = isMouthShapeCloseToA(mouth);
    const isE = isMouthShapeCloseToE(mouth);
    const isI = isMouthShapeCloseToI(mouth);
    const isO = isMouthShapeCloseToO(mouth);
    const isU = isMouthShapeCloseToU(mouth);

    if (isA) return 'A';
    if (isE) return 'E';
    if (isI) return 'I';
    if (isO) return 'O';
    if (isU) return 'U';
    return 'Unknown';
  };

  // 각 발음에 따른 입술 모양 특징을 정의
  const isMouthShapeCloseToA = (mouth) => {
    // 입술 랜드마크를 분석하여 'A' 발음인지 판별하는 로직
    return true; // 예시 코드, 실제로는 랜드마크 좌표를 분석하여 구현
  };

  const isMouthShapeCloseToE = (mouth) => {
    // 입술 랜드마크를 분석하여 'E' 발음인지 판별하는 로직
    return true; // 예시 코드
  };

  const isMouthShapeCloseToI = (mouth) => {
    // 입술 랜드마크를 분석하여 'I' 발음인지 판별하는 로직
    return true; // 예시 코드
  };

  const isMouthShapeCloseToO = (mouth) => {
    // 입술 랜드마크를 분석하여 'O' 발음인지 판별하는 로직
    return true; // 예시 코드
  };

  const isMouthShapeCloseToU = (mouth) => {
    // 입술 랜드마크를 분석하여 'U' 발음인지 판별하는 로직
    return true; // 예시 코드
  };

  const handleDetections = (resizedDetections) => {
    setDetections(resizedDetections);
  };

  return <FaceDetection videoRef={videoRef} onDetections={handleDetections} />;
};

export default FaceLocation;
