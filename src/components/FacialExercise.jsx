//coponents/FacialExercise.jsx
import React, {useRef} from 'react';
import Modal from 'react-modal';
import * as S from '../styles/StyledComponents';
import VideoComponent from "./FaceDetection/VideoComponent";
import FaceDetection from "./FaceDetection/FaceDetection";

Modal.setAppElement('#root'); // accessibility를 위한 설정

const FacialExercise = ({ isOpen, onRequestClose }) => {
  const videoRef = useRef(null);

  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Facial Stretch"
      style={{
        overlay: { //모달 뒤에 표시되는 오버레이(배경)의 스타일
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: { //모달 내용의 스타일입니다
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
          // background: 'black'
        }
      }}
    >
      <div style = {{display: 'flex', flexDirection: 'row', 
        justifyContent: 'space-between', width: '100%', gap: '20px', alignItems: 'center'}}>
        <h2>(이모티콘)</h2>
        <button onClick={onRequestClose} style = {{height: '5vh'}}>Close</button>
      </div>
      <S.CameraWrapper style = {{position : 'relative', 
        display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <VideoComponent videoRef={videoRef} />
        <FaceDetection videoRef={videoRef} />
        <S.Overlay>
          <S.GuideText>
            <p style = {{Color: 'white'}}>표정 연습하기 튜토리얼</p>
            <p style = {{Color: '#FFC700'}}>표정 연습 진행 방식을 설정해주세요</p>
            <p>1. 단일 표정 계속 연습하기</p>
            <p>2. 여러 표정 한번에 연습하기</p>
          </S.GuideText>
        </S.Overlay>
      </S.CameraWrapper>
      <button onClick={onRequestClose}>Start</button>
    </Modal>
  );
};

export default FacialExercise;
