import React, { useRef, useState, useEffect } from "react";
import FaceExpression from "./FaceExpression";
import * as C from '../../styles/CameraStyled';

const emotionMap = {
  happy: "행복",
  sad: "슬픔",
  angry: "분노",
  surprised: "놀람",
  neutral: "중립",
  fearful: "두려움",
  disgusted: "혐오",
};

const TakePicture = ({ onPhotoTaken, ExpressionType, TakePhoto, setYourEmotion, style }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [flash, setFlash] = useState(false); // 깜빡이기 위한 상태 추가
  const [photoTaken, setPhotoTaken] = useState(false);
  const [emotionTranslate, setEmotionTranslate] = useState('');

  useEffect(() => {
    setPhotoTaken(false);
  }, [ExpressionType]);

  useEffect(() => {
    if (capturing || TakePhoto) {
      const timer = setTimeout(() => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          // 캔버스 크기 설정
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          // 좌우 반전 적용
          context.translate(canvas.width, 0); // 캔버스의 오른쪽으로 이동
          context.scale(-1, 1); // x축을 기준으로 스케일을 -1로 설정

          // 이미지 그리기
          context.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          );

          // 이미지 데이터 URL 생성
          const imageSrc = canvas.toDataURL("image/jpeg");
          setImageSrc(imageSrc);
          onPhotoTaken(imageSrc, emotionTranslate);
          setCapturing(false); // 캡처 후 상태를 다시 false로 설정
          setFlash(true); // 캡처 후 flash 상태를 true로 설정
          setTimeout(() => setFlash(false), 200);
        } else {
          console.error("Video or canvas reference is null.");
        }
      }, 500); // 0.5초 후 캡처
      return () => {
        clearTimeout(timer);
        setPhotoTaken(true);
      };
    }
  }, [TakePhoto, capturing]);

  const handleExpressions = (expressions) => {
    const { maxKey, maxValue } = expressions;
    const emotionTranslate = emotionMap[maxKey];
    console.log("현재 표정 :", emotionTranslate); // 현재 감지되고 있는 표정 출력

    if (emotionTranslate === ExpressionType && maxValue > 0.5 && !photoTaken) {
      setCapturing(true); // 얼굴이 맞는 경우 capturing 상태를 true로 설정
    } else {
      setCapturing(false); // 얼굴이 맞지 않는 경우 capturing 상태를 false로 설정
    }
    console.log("캡쳐 진행 상태:", capturing);
    setEmotionTranslate(emotionTranslate);
  };

  // yourEmotion 상태를 업데이트(모달창 탑바에서 디스플레이)
  useEffect(() => {
    setYourEmotion(emotionTranslate);
  }, [emotionTranslate]);

  return (
    <>
      <FaceExpression videoRef={videoRef} onExpressions={handleExpressions} style={style}/>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <C.FlashOverlay flash={flash} /> {/* 깜빡이는 효과를 위한 div */}
    </>
  );
};

export default TakePicture;
