import React, { useState } from 'react';
import PhotoSnapModal from './PhotoSnapModal';
import TakePicture from '../FaceDetection/TakePicture';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
import SelectPhoto from './SelectPhoto';

const PhotoSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(true);
  const [yourEmotion, setYourEmotion] = useState('미감지'); //현재 감정 출력을 위한 상태

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {  //창 밖클릭하면 닫히게
    setIsModalOpen(false);
  };
  const handlePhotoTaken = (newPhoto) => {
    // console.log('New photo taken:', newPhoto);
    setCapturedPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    setTakePhoto(false);
  };
  const modalVideoStyle = {  //모달창 카메라 스타일
    width: "100%",
    height: '46vw',
    maxHeight: '630px',
    objectFit: 'cover'
  };
  const handleToggle = () => { setIsExplainOpen(!isExplainOpen); }

  return (
    <C.Main_Container>
      <div id="title_bar">
        <S.H2_title>표정 스냅사진 찍기📸</S.H2_title>
      </div>
      <div class='box'>
        <S.Example100 style={{ width: '500px' }} />
        <div class='description'>   {/* 설명박스 (새로)*/}
          <C.LetPhoto onClick={handleOpenModal}>사진 촬영하기</C.LetPhoto>
          <p style={{ textAlign: 'left' }}>친구와 함께 찍어보아요~</p>
        </div>
      </div>

      <div class='description'> {/* 설명박스 (새로)*/}
        <div id='title_bar' style={{ borderBottom: 'none' }}>
          <S.H2_title style={{ color: '#6D6D6D' }}>표정 스냅 이용방법</S.H2_title>
          <button id="descriptionBtn" onClick={handleToggle}>
            {isExplainOpen ? '▲' : '▼'}
          </button>
        </div>

        <C.SubTitle>
          <div id='instructions' style={{ display: isExplainOpen ? 'block' : 'none' }}>
            <ol>
              <li>버튼을 누르면 팝업창이 켜지며 웹캠으로 작동됩니다</li>
              <li>우측 패널에서 찍고 싶은 감정을 선택해주세요</li>
              <li>'치즈'의 학습모델이 표정을 인식하면 자동으로 사진이 찍혀요,  찰칵~!</li>
              <li>다 찍은 뒤 저장할 사진을 선택할 수 있어요 : )</li>
              <p>치즈 스냅을 찍으며 몰랐던 나의 다양한 표정을 기록해봐요!</p>
            </ol>
          </div>
        </C.SubTitle>

      </div>


      {/* 모달창 칠드런 */}
      {isModalOpen && (
        <PhotoSnapModal
          onClose={handleCloseModal}
          setTakePhoto={setTakePhoto}
          yourEmotion={yourEmotion}
          selectedEmotion={selectedEmotion}
        >
          <C.Snap_Container>
            <C.CameraView>
              {/* <h3>{selectedEmotion} 표정을 지어주세요</h3> */}
              <TakePicture
                onPhotoTaken={handlePhotoTaken}
                ExpressionType={selectedEmotion}
                TakePhoto={TakePhoto}
                style={modalVideoStyle}
                setYourEmotion={setYourEmotion}
              />
            </C.CameraView>
            <C.RightPanel>
              <div id="btn_wapper">
                {['행복', '슬픔', '분노', '놀람'].map(emotion => (
                  <C.EmotionButton
                    key={emotion}
                    selected={emotion === selectedEmotion}
                    onClick={() => setSelectedEmotion(emotion)}
                    selectedEmotion={selectedEmotion}
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

      <SelectPhoto
        capturedPhotos={capturedPhotos}
        setCapturedPhotos={setCapturedPhotos}
      />
    </C.Main_Container>

  );
};

export default PhotoSnap;
