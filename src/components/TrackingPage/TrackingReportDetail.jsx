// TrackingReportDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import * as RT from '../../styles/RealTimeTrackingStyled';
import * as C from '../../styles/CameraStyled';

const TrackingReportDetail = () => {
  const { reportid } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const emotionTranslations = {
    happy: '행복',
    sad: '슬픔',
    angry: '화남',
    surprised: '놀람',
    disgusted: '혐오',
    fearful: '두려움',
    neutral: '무표정',
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
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

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/report/${reportid}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setReport(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <C.Main_Container>
      <div id='title_bar'>
        <S.H2_title>레포트 상세 데이터</S.H2_title>
      </div>
      <div>
        <h3>{report.title}</h3>
        <p>{`시작: ${formatDate(report.created_at)} ${formatTime(report.created_at)}`}</p>
        <p>{`종료: ${formatDate(report.ended_at)} ${formatTime(report.ended_at)}`}</p>
        {Object.entries(report).map(([key, value]) => (
          emotionTranslations[key] && (
            <RT.EmotionText key={key} className={key}>
              <p key={key}>{`${emotionTranslations[key]}: ${value}%`}</p>
            </RT.EmotionText>
          )
        ))}
      </div>
    </C.Main_Container>
  );
};

export default TrackingReportDetail;
