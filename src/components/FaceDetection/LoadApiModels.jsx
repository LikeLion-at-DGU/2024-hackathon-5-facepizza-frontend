import * as faceapi from "face-api.js";

const LoadApiModels = async (DetectionType) => {
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models"); // 항상 로드
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
};

export default LoadApiModels;
