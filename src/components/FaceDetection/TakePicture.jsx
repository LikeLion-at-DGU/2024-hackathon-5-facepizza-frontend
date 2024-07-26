import React, { useEffect, useRef, useState } from "react";
import FaceDetection from "./FaceDetection";
import { max } from "@tensorflow/tfjs";

const TakePicture = ({ExpressionType}) => {
  const videoRef = useRef(); // videoRef 생성
  const canvasRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [detections, setDetections] = useState(false);
  const [expressions, setExpressions] = useState("start", 0);

  useEffect(() => {
    const captureImage = () => {
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
        setPhotoTaken(true);
      }
    };

    if (detections === true) {
      setExpressions(expressions);
      //추적 됐을 때만 찍기
      console.log(expressions);
      if (expressions.maxKey === ExpressionType) {
        console.log("나는~행복합니다.");
        const timer = setTimeout(captureImage, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [detections, expressions.maxKey]);

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      // console.log("TakePicture expressions: ", expressions);
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => {
          //가장 큰 확률의 표정
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
        //0.5 이상일 때 추적 상태 true로 변경
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
