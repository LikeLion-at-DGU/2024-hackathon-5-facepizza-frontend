// src/components/PhotoSnap.jsx
import React, { useState } from 'react';
import { PicModal_Container, Container } from '../styles/StyledComponents';
import PhotoSnapModal from './PhotoSnapModal';
import TakePicture from './FaceDetection/TakePicture';
import * as P from './PhotoSnapModal';

const PhotoSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMinimizeModal = () => {
    // Minimize logic here
  };

  const handleMaximizeModal = () => {
    // Maximize logic here
  };

  const handlePhotoTaken = (newPhoto) => {
    setCapturedPhotos([...capturedPhotos, newPhoto]);
    setTakePhoto(false);
  };

  return (
    <Container>
      <h2>표정 사진 찍기</h2>
      <button onClick={handleOpenModal}>찍으러 가기</button>
      {isModalOpen && (
        <PhotoSnapModal
          onClose={handleCloseModal}
          onMinimize={handleMinimizeModal}
          onMaximize={handleMaximizeModal}
        >         {/* 여기부터 모달창 (chileren) */}
          <PicModal_Container>
            <P.CameraContainer>
              <P.CameraView>
                <h3>{selectedEmotion} 표정을 지어주세요</h3>
                <TakePicture
                  id="take-picture-component"
                  onPhotoTaken={handlePhotoTaken}
                  ExpressionType={selectedEmotion}
                  TakePhoto={TakePhoto}
                />
              </P.CameraView>
              <P.RightPanel>
                {['행복', '슬픔', '분노', '놀람'].map(emotion => (
                  <P.EmotionButton
                    key={emotion}
                    selected={emotion === selectedEmotion}
                    onClick={() => setSelectedEmotion(emotion)}
                  >
                    {emotion}
                  </P.EmotionButton>
                ))}
              </P.RightPanel>
            </P.CameraContainer>
            <P.BottomBar>
              <P.CaptureButton onClick={() => setTakePhoto(true)}>
                촬영
              </P.CaptureButton>
            </P.BottomBar>
          </PicModal_Container>
        </PhotoSnapModal>
      )}
      <div>
        {capturedPhotos.map((photo, index) => (
          <img key={index} src={photo} alt={`Captured ${index}`} style={{ width: '400px', height: '300px', margin: '10px' }} />
        ))}
      </div>
    </Container>
  );
};

export default PhotoSnap;
