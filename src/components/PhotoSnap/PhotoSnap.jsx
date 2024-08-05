import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 추가
import PhotoSnapModal from './PhotoSnapModal';
import TakePicture from '../FaceDetection/TakePicture';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
import SelectPhoto from './SelectPhoto';
import usePrompt from './usePrompt';
import illust_Snap from '../../assets/illustration/illust_Snap.png'


const PhotoSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(true);
  const [yourEmotion, setYourEmotion] = useState('미감지'); //현재 감정 출력을 위한 상태
  const [isFormDirty, setIsFormDirty] = useState(false); // 페이지 이동을 감지하는 상태 추가

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {  //창 밖클릭하면 닫히게
    setIsModalOpen(false);
  };
  const handlePhotoTaken = (newPhoto, emotion) => {
    // console.log('New photo taken:', newPhoto);
    setCapturedPhotos((prevPhotos) => [...prevPhotos, { photo: newPhoto, emotion }]); //캡처 정보에 감정 추가
    setTakePhoto(false);
    setIsFormDirty(true); // 사진이 찍혔을 때 페이지 이동 경고 준비
  };
  const modalVideoStyle = {  //모달창 카메라 스타일
    width: "100%",
    height: '46vw',
    maxHeight: '630px',
    objectFit: 'cover'
  };
  const handleToggle = () => { setIsExplainOpen(!isExplainOpen); }
  const goToFourCut = () => { navigate('/snap/FourCut')}
  usePrompt('정말 나가시겠습니까?\n앨범에 저장하지 않은 스냅은 그대로 삭제됩니다', isFormDirty);


  return (
    <C.Main_Container>
      <div id="title_bar">
        <S.H2_title>표정 스냅사진 찍기📸</S.H2_title>
      </div>
      <div class='rowBox' >
          <C.IllustInPage src={illust_Snap} />
        <div class='description'>   {/* 설명박스 (새로)*/}
          <C.LetPhoto onClick={handleOpenModal}>사진 촬영하기</C.LetPhoto>
          <C.LetPhoto onClick ={goToFourCut}>치즈 네컷</C.LetPhoto>
          <p style={{ textAlign: 'left', paddingLeft: '7px' }}>친구와 함께 찍어보아요~</p>
        </div>
      </div>

      <div class='description'> {/* 설명박스 (새로)*/}
        <div id='title_bar' style={{ borderBottom: 'none' }}>
          <S.H2_title onClick={handleToggle} style={{ color: '#6D6D6D', fontSize: '20px' }}>표정 스냅 이용방법</S.H2_title>
          <button id="descriptionBtn" onClick={handleToggle}>
            {isExplainOpen ? '▲' : '▼'}
          </button>
        </div>

        <C.SubTitle>
          <div id='instructions' style={{ display: isExplainOpen ? 'block' : 'none' }}>
            <ol>
              <li>버튼을 누르면 팝업창이 켜지며 웹캠으로 작동됩니다</li>
              <li>우측 패널에서 찍고 싶은 감정을 선택해주세요</li>
              <span>선택한 감정으로는 한장의 사진만 찍을 수 있습니다</span><br />
              <span>같은 감정을 한장 더 찍고 싶다면 다른 감정 스냅을 찍은 후 도전!</span><p></p>
              <li>'치즈'의 학습모델이 표정을 인식하면 자동으로 사진이 찍혀요,  찰칵~!</li>
              <li>다 찍은 뒤 저장할 사진을 선택할 수 있어요 : )</li>
              <p>치즈 스냅을 찍으며 몰랐던 나의 다양한 표정을 기록해봐요!</p>
            </ol>
          </div>
        </C.SubTitle>
      </div>


      {/* 포토스냅 모달창 칠드런 */}
      {isModalOpen && (
        <PhotoSnapModal
          onClose={handleCloseModal}
          setTakePhoto={setTakePhoto}
          yourEmotion={yourEmotion}
          selectedEmotion={selectedEmotion}
          capturedPhotos={capturedPhotos}
        >
          <C.Snap_Container>
            <C.CameraView>
              {/* <h3>{selectedEmotion} 표정을 지어주세요</h3> */}
              <TakePicture
                onPhotoTaken={handlePhotoTaken}
                ExpressionType={selectedEmotion}//선택된 목표 감정 상태
                TakePhoto={TakePhoto}
                style={modalVideoStyle}
                setYourEmotion={setYourEmotion}//현재 감지된 상태
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
                  <img src={capturedPhotos[capturedPhotos.length - 1].photo} alt="Captured" />
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
