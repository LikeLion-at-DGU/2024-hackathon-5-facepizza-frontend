import React, { useState, useEffect } from 'react';
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import Facial_Character from './Facial_Character';
import Face_Camera_Home from './Face_Camera_Home';
import Tracking_Home from './Tracking_Home';
import Magazine_Home from './Magazine_Home';
import AboutUs_Home from './AboutUs_Home';
import axios from 'axios';

const Home_Content = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
  const [userId, setUserId] = useState(null);  // 유저 ID 관리

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
        setToken(token);
        console.log('Token:', token); // 토큰 값 확인용 콘솔 로그 추가
        const response = await axios.get('http://127.0.0.1:8000/api/mypage/profile', {
          headers: {
            Authorization: `Token ${token}`  // 인증 헤더에 토큰을 추가합니다.
          }
        });
        console.log('User data response:', response); // 응답 확인용 콘솔 로그 추가
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
  
  return (
    <>
      <Facial_Character />
      <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
        <Tracking_Home />
        <Face_Camera_Home />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: '30px', width: '100%'}}>
        <Magazine_Home/>
        <AboutUs_Home/>
      </div>
    </>
  );
};

export default Home_Content;
