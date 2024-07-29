import React from 'react';
import { Section, Container } from '../styles/StyledComponents';
import { useLocation } from 'react-router-dom';

const RealTimeTrackingReport = () => {
  const location = useLocation();
  const { emotionCounts, emotionPics, emotionPercentages, startTime, endTime } = location.state || {};

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <Container>
      <Section>
        <h2>트래킹 기록</h2>
        <h3>시작 {formatDate(startTime)} {formatTime(startTime)}&nbsp;&nbsp; 종료 {formatDate(endTime)} {formatTime(endTime)}</h3>
        <div>
          <h3>하이라이트 사진</h3>
          {emotionPics && Object.entries(emotionPics).map(([emotion, { img }]) => (
            img ? (
              <div key={emotion}>
                <p>{emotion} &nbsp; 비율 : {emotionPercentages[emotion]}%</p>
                <img src={img} alt={emotion} width="300" /><br/><br/><br/>
              </div>
            ) : null
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default RealTimeTrackingReport;
