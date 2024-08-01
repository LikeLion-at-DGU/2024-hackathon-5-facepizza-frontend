// src/components/PhotoAlbum.jsx
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';


const PhotoAlbum = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
    console.log('로그인 유지중');
    console.log(token);
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
