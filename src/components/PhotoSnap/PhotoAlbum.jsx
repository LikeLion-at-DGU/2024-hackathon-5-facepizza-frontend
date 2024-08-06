// src/components/PhotoAlbum.jsx
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import EmotionalAlbum from "./EmotionalAlbum";
import { API } from '../../api';

const PhotoAlbum = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }

        const response = await API.get('/api/albums', {
          headers: {
            Authorization: `Token ${token}`  // 인증 헤더에 토큰을 추가합니다.
          }
        });
        console.log('album data response:', response); // 응답 확인용 콘솔 로그 추가
        if (response.data) {
          setData(response.data);
          setIsLoggedIn(true);
          setUserId(response.data.id);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEmotionClick = (emotion) => {
    navigate(`/album/detail/${emotion}`);
  };

  return (
    <>
      <S.Container style={{display:"flex", alignItems:"flex-start", width:"100%", padding:"15px"}}>
        <S.Default>스냅 앨범</S.Default>
        <hr style={{background:"#C5C5C5"}}/>
        <EmotionalAlbum Emotion={'happy'} onClick={() => handleEmotionClick('happy')} />
        <EmotionalAlbum Emotion={'sad'} onClick={() => handleEmotionClick('sad')} />
        <EmotionalAlbum Emotion={'angry'} onClick={() => handleEmotionClick('angry')} />
        <EmotionalAlbum Emotion={'surprised'} onClick={() => handleEmotionClick('surprised')} />
      </S.Container>
    </>
  );
};

export default PhotoAlbum;
