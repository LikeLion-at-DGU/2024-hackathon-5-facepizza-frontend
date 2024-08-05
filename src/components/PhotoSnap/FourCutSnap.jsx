import React, { useState, useEffect } from 'react';
import FourCutModal from './FourCutModal';
import TakePicture from '../FaceDetection/TakePicture';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
import illust_Snap from '../../assets/illustration/illust_Snap.png'
import { createFourCutImage } from './MakeUtils';
import SelectPhoto from './SelectPhoto';



const FourCutSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);
//   const [isExplainOpen, setIsExplainOpen] = useState(true);
  const [yourEmotion, setYourEmotion] = useState('미감지'); //현재 감정 출력을 위한 상태
  const [selectedEmotion, setSelectedEmotion] = useState('행복'); // 기본값은 '행복'
  const [fourCutImage, setFourCutImage] = useState(null); // 네컷 이미지를 저장하는 상태

  const emotionsSequence = ['행복', '슬픔', '분노', '놀람']; // 감정 순서

  const handleOpenModal = () => {setIsModalOpen(true);};

  const handleCloseModal = () => {  
    setIsModalOpen(false);  //창 밖클릭하면 닫히게
    setCapturedPhotos([]); // 모달이 닫힐 때 캡쳐된 사진 초기화
    setSelectedEmotion('행복'); // 초기 감정으로 재설정
  };

  const handlePhotoTaken = (newPhoto, emotion) => {
    console.log('New photo taken:', newPhoto);
    setCapturedPhotos((prevPhotos) => [...prevPhotos, { photo: newPhoto, emotion }]); //캡처 정보에 감정 추가
    setTakePhoto(false);

    const nextEmotionIndex = (capturedPhotos.length + 1) % emotionsSequence.length;
    setSelectedEmotion(emotionsSequence[nextEmotionIndex]);

    if (capturedPhotos.length === 3) {
      // 네장이 모두 찍힌 경우
      setTimeout(() => {
        handleCloseModal();
        const fourCutImage = createFourCutImage([...capturedPhotos, { photo: newPhoto, emotion }]);
        console.log('Four cut image created:', fourCutImage); // 디버깅 로그
      }, 1000);
    }
  };

  useEffect(() => {
    const handleFourCutImageReady = (event) => {
      setFourCutImage(event.detail);
    };

    window.addEventListener('fourCutImageReady', handleFourCutImageReady);

    return () => {
      window.removeEventListener('fourCutImageReady', handleFourCutImageReady);
    };
  }, []);
  
  const modalVideoStyle = {  //모달창 카메라 스타일
    width: "100%",
    height: '100%',
    objectFit: 'cover'
  };



  return (
    <C.Main_Container>
      <div id="title_bar">
        <S.H2_title>치~즈 네컷 📸</S.H2_title>
      </div>
      <div class='rowBox' >
          <C.IllustInPage src={illust_Snap} />
        <div class='description'>   {/* 설명박스 (새로)*/}
          <C.LetPhoto onClick={handleOpenModal}>사진 촬영하기</C.LetPhoto>
          <p style={{ textAlign: 'left', paddingLeft: '7px' }}>친구와 함께 찍어보아요~</p>
        </div>
      </div>



      {/* 포토스냅 모달창 칠드런 */}
      {isModalOpen && (
        <FourCutModal
          onClose={handleCloseModal}
          setTakePhoto={setTakePhoto}
          yourEmotion={yourEmotion}
          selectedEmotion={selectedEmotion}
          capturedPhotos={capturedPhotos}
        >
            <C.FourCutCameraView>
              {/* <h3>{selectedEmotion} 표정을 지어주세요</h3> */}
              <TakePicture
                onPhotoTaken={handlePhotoTaken}
                ExpressionType={selectedEmotion}
                TakePhoto={TakePhoto}
                style={modalVideoStyle}
                setYourEmotion={setYourEmotion}
              />
            </C.FourCutCameraView>
        </FourCutModal>
      )}
      {fourCutImage && (
        <C.FourCutImageContainer>
          <img src={fourCutImage} alt="Four Cut" />
        </C.FourCutImageContainer>
      )}
    </C.Main_Container>

  );
};

export default FourCutSnap;
