// src/components/PhotoAlbum.jsx
import React from 'react';
import { Section, Container, Image } from '../styles/StyledComponents';
import album from '../assets/album.jpg'; // 사진 경로 수정 필요

const PhotoAlbum = () => {
  return (
    <Container>
      <Section>
        <h2>표정 앨범</h2>
        <Image src={album} alt="Album" />
      </Section>
    </Container>
  );
};

export default PhotoAlbum;
