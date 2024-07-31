// RealTimeTrackingList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Section } from '../styles/StyledComponents';

const RealTimeTrackingList = () => {
  const [trackingReports, setTrackingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingReports = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/report');
        setTrackingReports(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Section>
        <h2>트래킹 기록 리스트</h2>
        <ul>
          {trackingReports.map((report) => (
            <li key={report.id}>
              <h3>{report.title}</h3>
              <p>시작 시간: {new Date(report.created_at).toLocaleString()}</p>
              <p>종료 시간: {new Date(report.ended_at).toLocaleString()}</p>
              <div>
                <h4>감정 비율:</h4>
                <p>행복: {report.happy}%</p>
                <p>슬픔: {report.sad}%</p>
                <p>화남: {report.angry}%</p>
                <p>놀람: {report.surprised}%</p>
                <p>혐오: {report.disgusted}%</p>
                <p>두려움: {report.fearful}%</p>
                <p>중립: {report.neutral}%</p>
              </div>
              <div>
                <h4>하이라이트 이미지:</h4>
                {report.happy_highlight && (
                  <div>
                    <h5>행복</h5>
                    <img src={report.happy_highlight} alt="happy" width="200" />
                  </div>
                )}
                {report.sad_highlight && (
                  <div>
                    <h5>슬픔</h5>
                    <img src={report.sad_highlight} alt="sad" width="200" />
                  </div>
                )}
                {report.angry_highlight && (
                  <div>
                    <h5>화남</h5>
                    <img src={report.angry_highlight} alt="angry" width="200" />
                  </div>
                )}
                {report.surprised_highlight && (
                  <div>
                    <h5>놀람</h5>
                    <img src={report.surprised_highlight} alt="surprised" width="200" />
                  </div>
                )}
                {report.disgusted_highlight && (
                  <div>
                    <h5>혐오</h5>
                    <img src={report.disgusted_highlight} alt="disgusted" width="200" />
                  </div>
                )}
                {report.fearful_highlight && (
                  <div>
                    <h5>두려움</h5>
                    <img src={report.fearful_highlight} alt="fearful" width="200" />
                  </div>
                )}
                {report.neutral_highlight && (
                  <div>
                    <h5>중립</h5>
                    <img src={report.neutral_highlight} alt="neutral" width="200" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
};

export default RealTimeTrackingList;
