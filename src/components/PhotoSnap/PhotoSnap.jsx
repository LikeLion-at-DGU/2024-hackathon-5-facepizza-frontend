import React, { useState } from 'react';
import { Container } from '../../styles/StyledComponents';
import PhotoSnapModal from './PhotoSnapModal';
import TakePicture from '../FaceDetection/TakePicture';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents'

const PhotoSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {  //창 밖클릭하면 닫히게
    setIsModalOpen(false);
  };
  const handlePhotoTaken = (newPhoto) => {
    setCapturedPhotos([...capturedPhotos, newPhoto]);
    setTakePhoto(false);
  };
  const modalVideoStyle = {  //모달창 카메라 스타일
    width: "100%",
    height: '46vw',
    maxHeight: '630px',
  };

  return (
    <C.Main_Container>
      <div id="title_bar">
        <S.H2_title>표정 스냅사진 찍기</S.H2_title>
      </div>
      <S.Example100 style={{width: '500px'}}>
      </S.Example100>
      <div></div>
      <button onClick={handleOpenModal}>찍으러 가기</button>
      
      
      
      
      
      
  {/* 모달창 칠드런 */}
      {isModalOpen && (
        <PhotoSnapModal
          onClose={handleCloseModal}
          setTakePhoto={setTakePhoto}
        >
          <C.Snap_Container>
            <C.CameraView>
              <h3>{selectedEmotion} 표정을 지어주세요</h3>
              <TakePicture
                onPhotoTaken={handlePhotoTaken}
                ExpressionType={selectedEmotion}
                TakePhoto={TakePhoto}
                style={modalVideoStyle}
              />
            </C.CameraView>
            <C.RightPanel>
              <div id="btn_wapper">
                {['행복', '슬픔', '분노', '놀람'].map(emotion => (
                  <C.EmotionButton
                    key={emotion}
                    selected={emotion === selectedEmotion}
                    onClick={() => setSelectedEmotion(emotion)}
                  >
                    {emotion}
                  </C.EmotionButton>
                ))}
              </div>
              {capturedPhotos.length > 0 && (
                <C.Thumbnail>
                  <img src={capturedPhotos[capturedPhotos.length - 1]} alt="Captured" />
                  <C.Thumbnail_Count>
                    {capturedPhotos.length}
                  </C.Thumbnail_Count>
                </C.Thumbnail>
              )}
            </C.RightPanel>
          </C.Snap_Container>
        </PhotoSnapModal>
      )}
      <div>
        {capturedPhotos.map((photo, index) => (
          <img key={index}
            src={photo} alt={`Captured ${index}`}
            style={{ width: '400px', height: '300px', margin: '10px' }} />
        ))}
      </div>
    </C.Main_Container>
  );
};

export default PhotoSnap;