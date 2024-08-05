import React, { useState, useRef, useEffect } from 'react';
import FourCutModal from './FourCutModal';
import TakePicture from '../FaceDetection/TakePicture';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
import illust_Snap from '../../assets/illustration/illust_Snap.png';
import Frame1 from '../../assets/Frame_W.png';
import Frame2 from '../../assets/Frame_CW.png';
import Frame3 from '../../assets/Frame_CY.png';
import domtoimage from 'dom-to-image'; // dom-to-image 임포트 추가

const FourCutSnap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [TakePhoto, setTakePhoto] = useState(false);
  const [yourEmotion, setYourEmotion] = useState('미감지'); //현재 감정 출력을 위한 상태
  const [selectedEmotion, setSelectedEmotion] = useState('행복'); // 기본값은 '행복'
  const [readyToSave, setReadyToSave] = useState(false); // 네컷 이미지를 저장하는 상태
  const [frameSrc, setFrameSrc] = useState(Frame1); // 프레임 소스를 저장하는 상태
  const [selectedFrame, setSelectedFrame] = useState('Frame1');
  const frameRef = useRef(null); // FourFrame을 참조하기 위한 useRef

  const emotionsSequence = ['행복', '슬픔', '분노', '놀람']; // 감정 순서

  const handleOpenModal = () => { setIsModalOpen(true); };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // 창 밖 클릭하면 닫히게

  };

  const handlePhotoTaken = (photo) => {
    setCapturedPhotos(prevPhotos => [...prevPhotos, { photo }]);
  };

  useEffect(() => {
    if (capturedPhotos.length === 4) {
      generateCombinedPhoto();
    } 
    else {
      if ( isModalOpen === false ) {
        setCapturedPhotos([]);
      }
      const nextEmotionIndex = capturedPhotos.length % emotionsSequence.length;
      setSelectedEmotion(emotionsSequence[nextEmotionIndex]);
    }
  }, [capturedPhotos, isModalOpen]);

  const generateCombinedPhoto = () => {
        setReadyToSave(true); // 이미지를 띄우고 설명을 숨김
        setIsModalOpen(false);
        setSelectedEmotion('행복'); // 초기 감정으로 재설정
    }
  

    const savePhoto = () => {
      const frame = frameRef.current;
      if (frame) {
        domtoimage.toJpeg(frame, { quality: 0.95 }).then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'Cheese_naecut.jpg';
          link.click();
        }).catch((error) => {
          console.error('Oops, something went wrong!', error);
        });
      }
    };
  

  const reset = () => {
    setReadyToSave(false);
    setCapturedPhotos([]);
  }

  const modalVideoStyle = {  // 모달창 카메라 스타일
    width: "100%",
    height: '100%',
    objectFit: 'cover'
  };

  return (
    <C.Main_Container>
      {!readyToSave && (
        <>
          <div id="title_bar">
            <S.H2_title>치~즈 네컷 📸</S.H2_title>
          </div>
          <div className="rowBox">
            <C.IllustInPage src={illust_Snap} />
            <div className="description">
              <C.LetPhoto onClick={handleOpenModal}>사진 촬영하기</C.LetPhoto>
              <p style={{ textAlign: 'left', paddingLeft: '7px' }}>
                
                네컷을 다찍으면 사진이 보여져요!<br/><br/>
                친구와 함께 찍어보아요~
              </p>
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <FourCutModal
          onClose={handleCloseModal}
          setTakePhoto={setTakePhoto}
          yourEmotion={yourEmotion}
          selectedEmotion={selectedEmotion}
          capturedPhotos={capturedPhotos}
        >
          <C.FourCutCameraView>
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

      {readyToSave && (
        <>
          <div id="title_bar">
            <S.H2_title>치즈 네컷이 완성되었어요📸</S.H2_title>
            <div id='BTNBOX'>
            <C.FrameChoice
              onClick={() => {
                setFrameSrc(Frame1);
                setSelectedFrame('Frame1');
              }}
              isSelected={selectedFrame === 'Frame1'} // isSelected prop 추가
            >
              Frame1
            </C.FrameChoice>
            <C.FrameChoice
              onClick={() => {
                setFrameSrc(Frame2);
                setSelectedFrame('Frame2');
              }}
              isSelected={selectedFrame === 'Frame2'} // isSelected prop 추가
            >
              Frame2
            </C.FrameChoice>
            <C.FrameChoice
              onClick={() => {
                setFrameSrc(Frame3);
                setSelectedFrame('Frame3');
              }}
              isSelected={selectedFrame === 'Frame3'} // isSelected prop 추가
            >
              Frame3
            </C.FrameChoice>
            <C.FrameChoice onClick={savePhoto}>저장하기</C.FrameChoice>
            <C.FrameChoice onClick={reset}>다시찍기</C.FrameChoice>
            </div>
          </div>
          <C.FourFrame ref={frameRef}>
            <C.Frame src={frameSrc} />
            {capturedPhotos.map((photo, index) => (
              <C.EXPhoto key={index}>
                <img 
                src={photo.photo} 
                alt={`snap-${index}`}
                style={{
                  width: '101%',
                  height: '101%',
                  objectFit: 'cover'
                }}
                />
              </C.EXPhoto>
            ))}
          </C.FourFrame>
        </>
      )}
    </C.Main_Container>
  );
};

export default FourCutSnap;
