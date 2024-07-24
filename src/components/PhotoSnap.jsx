// src/components/PhotoSnap.jsx
import React from 'react';
import { Section, Container, Image } from '../styles/StyledComponents';
import photo from '../assets/photo.jpg'; // 사진 경로 수정 필요

const PhotoSnap = () => {
  return (
    <Container>
      <Section>
        <h2>표정 사진 찍기</h2>
        <Image src={photo} alt="Selfie" />
      </Section>
    </Container>
  );
};

export default PhotoSnap;
