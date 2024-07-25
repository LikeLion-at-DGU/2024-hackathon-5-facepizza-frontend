// src/components/PhotoSnap.jsx
import React from 'react';
import { Section, Container, Image } from '../styles/StyledComponents';
import photo from '../assets/photo.jpg'; // 사진 경로 수정 필요
import TakePicture from './FaceDetection/TakePciture';

const PhotoSnap = () => {
  return (
    <Container>
      <Section>
        <h2>표정 사진 찍기</h2>
        <TakePicture/>
      </Section>
    </Container>
  );
};

export default PhotoSnap;
