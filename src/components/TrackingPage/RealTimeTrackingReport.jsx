import React from 'react';
import { Section, Container } from '../../styles/StyledComponents';
import { useLocation } from 'react-router-dom';

const RealTimeTrackingReport = () => {
  const location = useLocation();
  const { emotionCounts, emotionPics, emotionPercentages, startTime, endTime } = location.state || {};

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };  // 날짜 출력 형식

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };  // 시간 출력 형식

  const emotionTranslations = {
    happy: '행복',
    sad: '슬픔',
    angry: '화남',
    surprised: '놀람',
    disgusted: '혐오',
    fearful: '두려움',
    neutral: '무표정',
  };  // 감정 출력시 이름 변경

  // 가장 비율이 높은 표정을 찾는 함수
  const BestEmotion = () => {
    let maxEmotion = null;
    let maxPercentage = -Infinity;

    Object.entries(emotionPercentages).forEach(([emotion, percentage]) => {
      if (parseFloat(percentage) > maxPercentage) {
        maxPercentage = parseFloat(percentage);
        maxEmotion = emotion;
      }
    });

    return maxEmotion ? { emotion: maxEmotion, percentage: maxPercentage } : null;
  };

  const bestEmotion = BestEmotion();

  const calculateElapsedTime = (start, end) => {
    const elapsedMs = new Date(end) - new Date(start);
    const seconds = Math.floor((elapsedMs / 1000) % 60);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);

    if (minutes === 0) {
      return `${String(seconds)}초`;
    } else {
      return `${String(minutes)}분 ${String(seconds)}초`;
    }
  };  // 총 트래킹 한 시간

  const elapsedTime = calculateElapsedTime(startTime, endTime);

  return (
    <Container>
      <Section>
        <h2>누적 표정 데이터</h2>
        {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
          <div key={emotion} style={{ marginRight: '10px' }}>
            <h4>{emotionTranslations[emotion]}: {percentage}%</h4>
          </div>
        ))}
        {bestEmotion && (
          <div>
            {emotionTranslations[bestEmotion.emotion] === '무표정' ? 
            <h3>{emotionTranslations[bestEmotion.emotion]}을 가장 많이 지었어요!</h3> 
            : emotionTranslations[bestEmotion.emotion] === '행복' ?
            <h3>행복한 표정을 가장 많이 지었어요!</h3>
            : <h3>{emotionTranslations[bestEmotion.emotion]} 표정을 가장 많이 지었어요!</h3>
          }  
          </div>
        )}
        <h3>총 {elapsedTime} 트래킹</h3>
        <h3>시작 {formatDate(startTime)} {formatTime(startTime)}&nbsp;&nbsp; 종료 {formatDate(endTime)} {formatTime(endTime)}</h3>
        <div>
          <h3>하이라이트 사진</h3>
          {emotionPics && Object.entries(emotionPics).map(([emotion, { img, maxValue }]) => (
            img ? (
              <div key={emotion}>
                <img src={img} alt={emotion} width="300" />
                <p>{emotionTranslations[emotion]} {(maxValue * 100).toFixed(5)}%</p><br />
              </div>
            ) : null
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default RealTimeTrackingReport;
