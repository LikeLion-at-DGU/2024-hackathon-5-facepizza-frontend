import * as faceapi from "face-api.js";

const LoadApiModels = async () => {
  const timestamp = new Date().getTime(); // 캐시 무효화를 위한 타임스탬프 추가
  await faceapi.nets.tinyFaceDetector.loadFromUri(`/models?${timestamp}`);
  await faceapi.nets.faceLandmark68Net.loadFromUri(`/models?${timestamp}`);
  await faceapi.nets.faceExpressionNet.loadFromUri(`/models?${timestamp}`);
};

export default LoadApiModels;
