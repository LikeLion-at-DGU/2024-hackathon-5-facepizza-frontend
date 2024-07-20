import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

const App = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("카메라 접근이 거부되었습니다:", err));
    };

    const handleVideoPlay = () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.append(canvas);
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections, 0.05);
      }, 100);
    };

    loadModels().then(startVideo);

    videoRef.current.addEventListener('play', handleVideoPlay);

    return () => {
      videoRef.current && videoRef.current.removeEventListener('play', handleVideoPlay);
    };
  }, []);

  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <div ref={canvasRef}></div>
    </div>
  );
};

export default App;
