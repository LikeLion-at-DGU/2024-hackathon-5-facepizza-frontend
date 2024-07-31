import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Container } from '../styles/StyledComponents';
import FaceDetection from "./FaceDetection/FaceDetection";
import axios from 'axios';

const RealTimeTracking = () => {
  const videoRef = useRef(null);
  const [tracking, setTracking] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState({ key: '', value: 0 });
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
  const [userId, setUserId] = useState(null);  // 유저 ID 관리

  const navigate = useNavigate();
  const startTime = useRef(null);
  const endTime = useRef(null);
  const timerRef = useRef(null);

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

  // 유저 로그인 상태와 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/mypage/profile');  // 배포 후 api 주소 수정
        if (response.data.id) {
          setIsLoggedIn(true);
          setUserId(response.data.id);
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

  const handleDetections = (resizedDetections) => {
    if (!startTime.current) {
      startTime.current = new Date();
      timerRef.current = setTimeout(() => {
        handleEndTracking();
      }, 5 * 60000); // 5분 후 트래킹 종료
    }

    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => (value > acc[1] ? [key, value] : acc),
        [null, -Infinity]
      );    // maxKey, maxValue 탐지
      setCurrentEmotion({ key: maxKey, value: maxValue });

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

  // 감정 비율 계산 함수
  const calculateEmotionPercentages = () => {
    const totalEmotions = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
    if (totalEmotions === 0) return {};
    return Object.keys(emotionCounts).reduce((obj, key) => {
      obj[key] = ((emotionCounts[key] / totalEmotions) * 100).toFixed(2);
      return obj;
    }, {});
  };

  const emotionPercentages = calculateEmotionPercentages();

  // 트래킹 종료 함수
  const handleEndTracking = async () => {
    if (!tracking) return;

    setTracking(false);
    endTime.current = new Date();

    if (isLoggedIn) {
      try {
        const reportData = {
          happy: parseFloat(emotionPercentages.happy),
          sad: parseFloat(emotionPercentages.sad),
          angry: parseFloat(emotionPercentages.angry),
          surprised: parseFloat(emotionPercentages.surprised),
          disgusted: parseFloat(emotionPercentages.disgusted),
          fearful: parseFloat(emotionPercentages.fearful),
          neutral: parseFloat(emotionPercentages.neutral),
          created_at: startTime.current.toISOString(),
          ended_at: endTime.current.toISOString(),
          title: startTime.current.toISOString(),
          highlights: Object.entries(emotionPics).map(([emotion, { img }]) => ({
            image: img,
            emotion: emotion,
          })),
        };
  
        console.log('Sending Report Data:', reportData);
  
        // Report 데이터 전송
        // 배포 후 api 주소 변경
        const response = await axios.post('http://127.0.0.1:8000/api/report', reportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Response from server:', response.data); // 디버깅용 로그
  
      } catch (error) {
        console.error('Error saving report:', error);
      }
    }
    
    navigate('/tracking/report', { state: { emotionCounts, emotionPics, emotionPercentages, startTime: startTime.current, endTime: endTime.current } });
  };

  // 상태가 변경된 후에 navigate 호출
  useEffect(() => {
    if (!tracking && endTime.current) {
      handleEndTracking();
    }
  }, [tracking]);

  // 타이머와 상태 업데이트 동기화
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <Section>
        <h2>실시간 표정 트래킹하기</h2>
        <h3>{startTime.current && `${formatDate(startTime.current)} ${formatTime(startTime.current)}`}</h3>
        <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
        <h3>data</h3>
        <h4>{emotionTranslations[currentEmotion.key]} {(currentEmotion.value * 100).toFixed(7)}%</h4>
        <button onClick={handleEndTracking}>종료하기</button>
        <div>
          <h3>하이라이트 사진:</h3>
          {Object.entries(emotionPics).map(([emotion, { img, maxValue }]) => (
            img ? (
              <div key={emotion}>
                <img src={img} alt={emotion} width="300" />
                <p>{emotionTranslations[emotion]} {emotionPercentages[emotion]}%</p><br/>
              </div>
            ) : null
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default RealTimeTracking;