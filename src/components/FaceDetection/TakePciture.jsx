import React, { useEffect, useRef, useState } from "react";
import FaceDetection from "./FaceDetection";

const TakePicture = () => {
  const videoRef = useRef(); // videoRef 생성
  const canvasRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);

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

    const timer = setTimeout(captureImage, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDetections = (detections, score) => {
    console.log(handleDetections);
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
