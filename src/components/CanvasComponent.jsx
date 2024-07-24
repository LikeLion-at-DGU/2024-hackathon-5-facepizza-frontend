import React, { useRef } from "react";
import * as faceapi from "face-api.js";
import VideoComponent from "./VideoComponent";
import FaceDetection from "./FaceDetection"; // FaceDetection 컴포넌트 불러오기

const CanvasComponent = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const setupVideoAndCanvas = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing video stream: ", err);
    }

    videoRef.current.onloadedmetadata = () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.innerHTML = "";
      canvasRef.current.append(canvas);

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);
    };
  };

  setupVideoAndCanvas();

  return (
    <>
      <VideoComponent videoRef={videoRef} />
      <canvas ref={canvasRef} />
      <FaceDetection canvasRef={canvasRef} videoRef={videoRef} />
    </>
  );
};

export default CanvasComponent;
