import React from 'react';
import { Section, Container } from '../styles/StyledComponents';
import { useLocation } from 'react-router-dom';

const RealTimeTrackingReport = () => {
  const location = useLocation();
  const { emotionCounts, emotionPics, emotionPercentages } = location.state || {};

  return (
    <Container>
      <Section>
        <h2>감정 트래킹 결과</h2>
        <div>
          <h3>Emotion Percentages:</h3>
          <pre>{JSON.stringify(emotionPercentages, null, 2)}</pre>
          <h3>Emotion Pictures:</h3>
          {emotionPics && Object.entries(emotionPics).map(([emotion, { img, maxValue }]) => (
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

export default RealTimeTrackingReport;
