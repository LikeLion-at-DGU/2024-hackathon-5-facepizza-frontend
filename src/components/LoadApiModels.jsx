import * as faceapi from 'face-api.js';

const LoadApiModels = async (ModelKind) => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    if (ModelKind === "Landmark") {
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    } else if (ModelKind === "Expression") {
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    }
};

export default LoadApiModels;