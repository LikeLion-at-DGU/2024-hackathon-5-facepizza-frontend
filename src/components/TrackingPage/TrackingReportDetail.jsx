import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import * as RT from '../../styles/RealTimeTrackingStyled';
import * as C from '../../styles/CameraStyled';
import { API } from '../../api';

const TrackingReportDetail = () => {
  const { reportid } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
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

  const emotionHighlightFields = {
    happy: 'happy_highlight',
    sad: 'sad_highlight',
    angry: 'angry_highlight',
    surprised: 'surprised_highlight',
    disgusted: 'disgusted_highlight',
    fearful: 'fearful_highlight',
    neutral: 'neutral_highlight',
  };

  const emotionMaxValueFields = {
    happy: 'happy_maxValue',
    sad: 'sad_maxValue',
    angry: 'angry_maxValue',
    surprised: 'surprised_maxValue',
    disgusted: 'disgusted_maxValue',
    fearful: 'fearful_maxValue',
    neutral: 'neutral_maxValue',
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

  const calculateElapsedTime = (start, end) => {
    const elapsedMs = new Date(end) - new Date(start);
    const seconds = Math.floor((elapsedMs / 1000) % 60);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);

    if (minutes === 0) {
      return `${String(seconds)}초`;
    } else {
      return `${String(minutes)}분 ${String(seconds)}초`;
    }
  };

  const BestEmotion = (report) => {
    let maxEmotion = null;
    let maxPercentage = -Infinity;

    Object.entries(report).forEach(([key, value]) => {
      if (emotionTranslations[key] && parseFloat(value) > maxPercentage) {
        maxPercentage = parseFloat(value);
        maxEmotion = key;
      }
    });

    return maxEmotion ? { emotion: maxEmotion, percentage: maxPercentage } : null;
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/api/report/${reportid}`, {
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

  const deleteReport = async () => {
    if (window.confirm("정말로 이 레포트를 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/api/report/${reportid}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        alert('레포트가 삭제되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error("Failed to delete the report:", error);
        alert('레포트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bestEmotion = report ? BestEmotion(report) : null;

  return (
    <C.Main_Container>
      <h3>{report.title}</h3>
      <button onClick={deleteReport}>삭제하기</button>
      <h2>누적 표정 데이터</h2>
      <div>
        {Object.entries(report).map(([key, value]) => (
          emotionTranslations[key] && (
            <RT.EmotionText key={key} className={key}>
              <p key={key}>{`${emotionTranslations[key]}: ${value}%`}</p>
            </RT.EmotionText>
          )
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

        <p>총 {calculateElapsedTime(report.created_at, report.ended_at)} 트래킹</p>
        <p>{`시작: ${formatDate(report.created_at)} ${formatTime(report.created_at)}`}</p>
        <p>{`종료: ${formatDate(report.ended_at)} ${formatTime(report.ended_at)}`}</p>
      </div>
      <div>
        <h3>하이라이트 사진</h3>
        {Object.entries(emotionHighlightFields).map(([emotion, field]) => (
          report[field] ? (
            <div key={emotion}>
              <img src={report[field]} alt={emotion} width="300" />
              <p>{`${emotionTranslations[emotion]}`} |{`${(report[emotionMaxValueFields[emotion]] * 100).toFixed(5)}`}%</p>
            </div>
          ) : null
        ))}
      </div>
    </C.Main_Container>
  );
};

export default TrackingReportDetail;
