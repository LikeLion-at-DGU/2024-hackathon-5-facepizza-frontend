//coponents/FacialStretch.jsx
import React, {useRef} from 'react';
import Modal from 'react-modal';
import * as S from '../styles/StyledComponents';
import VideoComponent from "./FaceDetection/VideoComponent";
import FaceDetection from "./FaceDetection/FaceDetection";

Modal.setAppElement('#root'); // accessibility를 위한 설정

const FacialStretch = ({ isOpen, onRequestClose }) => {
  const videoRef = useRef(null);

  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Facial Stretch"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'black'
        }
      }}
    >
      <h2>표정 스트레칭</h2>
      <S.CameraWrapper>
        <VideoComponent videoRef={videoRef} />
        <FaceDetection videoRef={videoRef} />
      </S.CameraWrapper>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default FacialStretch;
