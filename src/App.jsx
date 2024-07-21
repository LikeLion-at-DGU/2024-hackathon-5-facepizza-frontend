import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

const App = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const photoCanvasRef = useRef();
  const [isExpressionMet, setIsExpressionMet] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false); // 추가: 사진을 이미 찍었는지 여부를 추적

  useEffect(() => {
    const loadModels = async () => { //비동기 함수로 선언
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models'); //신경망 모델
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    const startVideo = () => { 
      navigator.mediaDevices.getUserMedia({ video: {} }) //비디오 미디어 접근 요청
        .then(stream => { //??
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("카메라 접근이 거부되었습니다:", err));
    };

    const dataURLToBlob = (dataURL) => { //찍은 사진을 png 파일로 변환
      const [header, base64] = dataURL.split(',');
      const binary = atob(base64);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: 'image/png' });
    };

    const takePhoto = () => { 
      const photoCanvas = photoCanvasRef.current;
      const context = photoCanvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, photoCanvas.width, photoCanvas.height);
      const dataUrl = photoCanvas.toDataURL('image/png');
      console.log("사진이 저장되었습니다: ", dataUrl);

      const blob = dataURLToBlob(dataUrl);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'photo.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setPhotoTaken(true); // 사진을 찍었다고 표시
    };

    const handleVideoPlay = () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.append(canvas);
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        if (photoTaken) return; // 이미 사진을 찍었으면 더 이상 실행하지 않음

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections, 0.05);

        if (resizedDetections.length > 0) {
          const detection = resizedDetections[0];
          const expressions = detection.expressions;
          const score = detection.detection.score;

          if (score > 0.7 && expressions.happy > 0.7) { //신뢰도가 70%, happy가 70% 이상일 때
            if (!isExpressionMet) {
              setIsExpressionMet(true);
              const newTimerId = setTimeout(() => {
                takePhoto();
                setIsExpressionMet(false);
                setTimerId(null);
              }, 3000); //3초 뒤에 촬영
              setTimerId(newTimerId);
            }
          } else {
            if (isExpressionMet) {
              clearTimeout(timerId);
              setIsExpressionMet(false);
              setTimerId(null);
            }
          }
        } else {
          if (isExpressionMet) {
            clearTimeout(timerId);
            setIsExpressionMet(false);
            setTimerId(null);
          }
        }
      }, 100);
    };

    loadModels().then(startVideo);

    videoRef.current.addEventListener('play', handleVideoPlay);

    return () => {
      videoRef.current && videoRef.current.removeEventListener('play', handleVideoPlay);
    };
  }, [isExpressionMet, timerId, photoTaken]); // photoTaken을 추가하여 의존성 배열 업데이트
 
  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <div ref={canvasRef}></div>
      <canvas ref={photoCanvasRef} width="720" height="560" style={{ display: 'none' }} />
    </div>
  );
};

export default App;
