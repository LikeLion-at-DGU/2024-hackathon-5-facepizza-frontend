// src/components/PhotoAlbum.jsx
import React from 'react';
import album from '../assets/album.jpg'; // 사진 경로 수정 필요
import * as S from '../styles/StyledComponents';


const PhotoAlbum = () => {
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
