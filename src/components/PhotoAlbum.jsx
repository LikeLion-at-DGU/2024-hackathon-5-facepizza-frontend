// src/components/PhotoAlbum.jsx
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';
import axios from 'axios';

const PhotoAlbum = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
  const [userId, setUserId] = useState(null);  // 유저 ID 관리

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
        setToken(token);
        console.log('Token:', token); // 토큰 값 확인용 콘솔 로그 추가

        if (!token) {
          alert('로그인이 필요합니다.');
          navigate('/login'); // 로그인 페이지로 이동
        }

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
  }, [navigate]);


  return (
    <S.Album>
      <S.Iner_Section>
        <div id="title_bar">
          <h2>내 표정 앨범</h2>
        </div>
        <div id="album_content">
          <h3>행복</h3>
          <div id="photo_warpper">
            <div class="example"></div>
            <div class="example"></div>
          </div>
        </div>
        {/* <S.Image src={album} alt="Album" /> */}
      </S.Iner_Section>
    </S.Album>
  );
};

export default PhotoAlbum;
