// src/components/PhotoSnap/PhotoAlbum.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/StyledComponents";
import axios from "axios";
import EmotionalAlbum from "./EmotionalAlbum";

const PhotoAlbum = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/mypage/profile",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.data.id) {
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
    navigate(`/album/${emotion}`);
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
