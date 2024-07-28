import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Container } from '../styles/StyledComponents';
import FaceDetection from "./FaceDetection/FaceDetection";
import axios from 'axios';

const RealTimeTracking = () => {
  const videoRef = useRef(null);
  const [tracking, setTracking] = useState(true);
  const [emotions, setEmotions] = useState(Array(5 * 600).fill(null));  // 최대 5분 0.1초 간격으로 감정 저장할 수 있는 배열
  const [emotionCounts, setEmotionCounts] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    disgusted: 0,
    fearful: 0,
    neutral: 0,
  });
  const [emotionPics, setEmotionPics] = useState({
    happy: { img: null, maxValue: -Infinity },
    sad: { img: null, maxValue: -Infinity },
    angry: { img: null, maxValue: -Infinity },
    surprised: { img: null, maxValue: -Infinity },
    disgusted: { img: null, maxValue: -Infinity },
    fearful: { img: null, maxValue: -Infinity },
    neutral: { img: null, maxValue: -Infinity },
  });

  const navigate = useNavigate();

  const handleDetections = (resizedDetections) => {
    const currentTime = Math.floor(Date.now() / 100);

    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => (value > acc[1] ? [key, value] : acc),
        [null, -Infinity]
      );    // maxKey, maxValue 탐지

      setEmotions((prevEmotions) => {
        const newEmotions = [...prevEmotions];
        newEmotions[currentTime % newEmotions.length] = maxKey;

        // 감정 배열이 꽉 찼는지 확인하고 트래킹 종료
        if (newEmotions.every(emotion => emotion !== null)) {
          handleEndTracking();
        }

        return newEmotions;
      });

      setEmotionCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        newCounts[maxKey] += 1;

        setEmotionPics((prevPics) => {
          const newPics = { ...prevPics };
          if (maxValue > newPics[maxKey].maxValue) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const img = canvas.toDataURL('image/jpeg');
            newPics[maxKey] = { img, maxValue };
          }
          return newPics;
        });   // 감정이 탐지된 경우, maxValue가 더 큰 경우에 비디오 캡쳐
        return newCounts;
      });
    });
  };

  const handleEndTracking = () => {
    setTracking(false);

    const totalEmotions = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
    const emotionPercentages = Object.keys(emotionCounts).reduce((obj, key) => {
      obj[key] = ((emotionCounts[key] / totalEmotions) * 100).toFixed(2);
      return obj;
    }, {});

    console.log('Emotion Percentages:', emotionPercentages);

    // 트래킹 종료 후 결과 페이지로 이동
    navigate('/tracking/report', { state: { emotionCounts, emotionPics, emotionPercentages } });
  };

  return (
    <Container>
      <Section>
        <h2>실시간 표정 트래킹하기</h2>
        <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
        <button onClick={handleEndTracking}>트래킹 종료</button>
        <div>
          <h3>Emotion Counts:</h3>
          <pre>{JSON.stringify(emotionCounts, null, 2)}</pre>
          <h3>Emotion Pictures:</h3>
          {Object.entries(emotionPics).map(([emotion, { img, maxValue }]) => (
            img ? (
              <div key={emotion}>
                <p>{emotion} (max value: {maxValue.toFixed(10)})</p>
                <img src={img} alt={emotion} width="100" />
              </div>
            ) : null
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default RealTimeTracking;
