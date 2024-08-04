import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import * as RT from '../../styles/RealTimeTrackingStyled';
import * as C from '../../styles/CameraStyled';

const RealTimeTrackingReportData = () => {
  const [token, setToken] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  const emotionTranslations = {
    happy: '행복',
    sad: '슬픔',
    angry: '화남',
    surprised: '놀람',
    disgusted: '혐오',
    fearful: '두려움',
    neutral: '무표정',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        setToken(token);
        const response = await axios.get('http://127.0.0.1:8000/api/mypage/profile', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (response.data.user.id) {
          setIsLoggedIn(true);
          setUserId(response.data.user.id);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      if (!token || !userId) return;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/report', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userReports = response.data.filter(report => report.user === userId);
        setReports(userReports);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <C.Main_Container>
      <div id='title_bar'>
        <S.H2_title>누적 표정 데이터</S.H2_title>
      </div>
      {reports.map((report) => (
        <div key={report.id} style={{ marginBottom: '20px' }}>
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
      ))}
    </C.Main_Container>
  );
};

export default RealTimeTrackingReportData;
