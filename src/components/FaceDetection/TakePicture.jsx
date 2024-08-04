///연속으로 캡쳐되는 문제 해결 필요
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

const TakePicture = ({ onPhotoTaken, ExpressionType, TakePhoto, setYourEmotion }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [flash, setFlash] = useState(false); // 깜빡이기 위한 상태 추가
  const [photoTaken, setPhotoTaken] = useState(false);
  const [emotionTranslate, setEmotionTranslate] = useState('');

  // console.log(isModalOpen);
  useEffect(() => {
    setPhotoTaken(false);
  }, [ExpressionType]);

  useEffect(() => {
    // console.log(TakePhoto);
    if (capturing || TakePhoto) {
      //또는으로 변경
      console.log(TakePhoto);
      console.log("Capturing processing...");
      const timer = setTimeout(() => {
        if (videoRef.current && canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;

          const context = canvasRef.current.getContext("2d");
          context.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          );
          const imageSrc = canvasRef.current.toDataURL("image/jpeg");
          setImageSrc(imageSrc);
          onPhotoTaken(imageSrc);
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
    console.log("현재 표정 :", emotionTranslate); //현재 감지되고 있는 표정 출력

    if (emotionTranslate === ExpressionType && maxValue > 0.5 && !photoTaken) {
      setCapturing(true); //얼굴이 맞는 경우 capturing 상태를 true로 설정
    } else {
      setCapturing(false); //얼굴이 맞지 않는 경우 capturing 상태를 false로 설정
    }
    console.log("캡쳐 진행 상태:", capturing);
    setEmotionTranslate(emotionTranslate);
  };

  //yourEmotion상태를 업데이트(모달창 탑바에서 디스플레이)
  useEffect(() => {
    setYourEmotion(emotionTranslate);
  }, [emotionTranslate]);

  return (
    <>
      <FaceExpression videoRef={videoRef} onExpressions={handleExpressions} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <C.FlashOverlay flash={flash} /> {/* 깜빡이는 효과를 위한 div */}
    </>
  );
};

export default TakePicture;
