import React, { useEffect, useState } from "react";
import LoadApiModels from "./LoadApiModels";
import * as faceapi from "face-api.js";

const ExpressionComponent = ({ videoRef, detections }) => {
  const [expressionsData, setExpressionsData] = useState([]);

  useEffect(() => {
    const setupExpressionAnalysis = async () => {
      if (!videoRef.current || detections.length === 0) {
        console.log("ExpressionComponent: Video element is not ready or no detections");
        return;
      }

      // 얼굴 표정 분석 모델 로드
      await LoadApiModels("Expressions");

      videoRef.current.onloadedmetadata = () => {
        const analyzeExpressions = async () => {
          try {
            // 감지된 얼굴에 대해 표정 분석 수행
            const faceExpressions = await Promise.all(
              detections.map(async (detection) => {
                return await faceapi.detectSingleFace(detection).withFaceExpressions();
              })
            );

            setExpressionsData(faceExpressions);
          } catch (error) {
            console.error("Error analyzing expressions:", error);
          }
        };

        setInterval(analyzeExpressions, 1000);
      };
    };

    setupExpressionAnalysis();
  }, [videoRef, detections]);

  return (
    <div>
      {/* 여기에서 expressionsData를 활용하여 표정 분석 결과를 표시하거나 활용할 수 있음 */}
    </div>
  );
};

export default ExpressionComponent;
