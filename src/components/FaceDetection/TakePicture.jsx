// src/components/FaceDetection/TakePicture.jsx
import React, { useEffect, useRef, useState } from 'react';
import FaceDetection from './FaceDetection';
import * as P from '../PhotoSnapModal';

const emotionMap = {
  happy: '행복',
  sad: '슬픔',
  angry: '분노',
  surprised: '놀람',
};

const TakePicture = ({ onPhotoTaken, ExpressionType }) => {
  const videoRef = useRef(); // videoRef 생성
  const canvasRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [detections, setDetections] = useState(false);
  const [expressions, setExpressions] = useState({ maxKey: null, maxValue: 0 });

  useEffect(() => {
    // 이미지를 캡처하는 함수 정의
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        // 캔버스 크기를 비디오 크기로 설정
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // 캔버스에 비디오 프레임을 그리기
        const context = canvasRef.current.getContext('2d');
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        // 캡처된 이미지를 데이터 URL로 변환
        const imageSrc = canvasRef.current.toDataURL('image/jpeg');
        setImageSrc(imageSrc); // imageSrc 상태 업데이트
        onPhotoTaken(imageSrc);
        setPhotoTaken(true);
      }
    };

    // 추적 됐을 때만 찍기
    if (detections && ExpressionType) {
      console.log(expressions, ExpressionType);
      const emotionTrnaslate = emotionMap[expressions.maxKey];
      // 감지된 표정이 지정된 표정과 일치할 경우
      if (emotionTrnaslate === ExpressionType) {
        console.log(`나는~${ExpressionType}합니다.`);
        const timer = setTimeout(captureImage, 3000);
        // cleanup 함수: 다음 감지 시도 전에 타이머를 클리어
        return () => clearTimeout(timer);
      }
    }
  }, [detections, expressions.maxKey, onPhotoTaken, ExpressionType]);
  // [ 감지여부, 감지된표정.맥스키, 사진전달함수, 목표표정]

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => {
          // 가장 큰 확률의 표정
          if (value > acc[1]) {
            return [key, value];
          } else {
            return acc;
          }
        },
        [null, -Infinity]
      );
      const faceExpression = { maxKey, maxValue };
      if (maxValue > 0.5) {
        // 0.5 이상일 때 추적 상태 true로 변경
        setDetections(true);
        setExpressions(faceExpression);
      } else {
        setDetections(false);
      }
    });
  };

  return (
    <>
      <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
      <P.CameraCanvas>
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </P.CameraCanvas>
      {imageSrc && (
        <div>
          <h2>촬영된 사진</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </>
  );
};

export default TakePicture;
