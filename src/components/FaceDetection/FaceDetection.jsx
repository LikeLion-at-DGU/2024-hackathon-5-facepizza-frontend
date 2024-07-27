import React, { useRef, useState, useEffect } from "react";
import FaceExpression from "./FaceExpression";

const TakePicture = ({ ExpressionType }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [capturing, setCapturing] = useState(false);
  
  // Use this to track if videoRef is ready
  const [videoRefReady, setVideoRefReady] = useState(false);

  useEffect(() => {
    // Check if videoRef is available every 100ms
    const checkVideoRef = setInterval(() => {
      if (videoRef.current) {
        setVideoRefReady(true);
        clearInterval(checkVideoRef);
      }
    }, 100); // Check every 100ms

    return () => clearInterval(checkVideoRef); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (capturing) {
      console.log("capturing processing ...");
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
          setCapturing(false); // 사진 촬영 후 capturing 상태를 false로 변경
        } else {
          console.error("video or canvas reference is null.");
        }
      }, 3000); // 3초 후 캡처
      return () => clearTimeout(timer);
    }
  }, [capturing]);

  const handleExpressions = (expressions) => {
    if (expressions.maxKey === ExpressionType) {
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
      {!videoRefReady && <p>Video is loading...</p>} {/* Optionally display a loading message */}
    </>
  );
};

export default TakePicture;
