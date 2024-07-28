import React, { useRef, useState, useEffect } from "react";
import FaceExpression from "./FaceExpression";

const emotionMap = {
  happy: '행복',
  sad: '슬픔',
  angry: '분노',
  surprised: '놀람',
};

const TakePicture = ({ onPhotoTaken, ExpressionType, TakePhoto }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [capturing, setCapturing] = useState(false);


  useEffect(() => {
    if (capturing) {
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
        } else {
          console.error("Video or canvas reference is null.");
        }
      }, 3000); // 3초 후 캡처
      return () => clearTimeout(timer);
    }
  }, [ExpressionType, TakePhoto, capturing]);

  const handleExpressions = (expressions) => {
    const { maxKey, maxValue } = expressions;
    console.log(maxKey);
    const emotionTranslate = emotionMap[maxKey];
    console.log(emotionTranslate);
    console.log(ExpressionType);
    // console.log(expressions);
    if (emotionTranslate === ExpressionType && maxValue > 0.5) {
      if (!capturing) {
        setCapturing(true); // 얼굴이 맞는 경우 capturing 상태를 true로 설정
      }
    } else {
      if (capturing) {
        setCapturing(false); // 얼굴이 맞지 않는 경우 capturing 상태를 false로 설정
      }
    }

    console.log("Capturing state:", capturing);
  };

  return (
    <>
      <FaceExpression videoRef={videoRef} onExpressions={handleExpressions} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
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
