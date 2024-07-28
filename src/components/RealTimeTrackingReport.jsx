import React from 'react';
import { Section, Container } from '../styles/StyledComponents';
import { useLocation } from 'react-router-dom';

const RealTimeTrackingReport = () => {
  const location = useLocation();
  const { emotionCounts, emotionPics, emotionPercentages } = location.state || {};

  return (
    <Container>
      <Section>
        <h2>트래킹 기록</h2>
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
