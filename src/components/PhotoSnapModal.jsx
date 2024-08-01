// src/components/PhotoSnapModal.jsx  정상코드
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import * as C from '../styles/CameraStyled';
//import Logo_Smile from '../assets/Logo_Smile.png'; // 사진 경로 수정 필요



//수정코드
const PhotoSnapModal = ({ onClose, children, setTakePhoto, isDetecting }) => {
  const nodeRef = useRef(null);

  return (
    <C.ModalBackground onClick={onClose}>
      <Draggable handle=".handle" nodeRef={nodeRef}>
        <C.ModalContent ref={nodeRef} onClick={(e) => e.stopPropagation()}>
          {/* 내부를 클릭했을 때 닫히지 않게 함 */}
          <C.TopBar className="handle">
            <C.Feedback $isDetecting={isDetecting}>
              탐지 진행중
              <div className="spinner" />
            </C.Feedback>
            <button onClick={onClose}> ✕ </button>
          </C.TopBar>
          {children}
          <C.BottomBar>
            <C.CaptureButton onClick={() => setTakePhoto(true)}>
              촬영
              {/* <img src={Logo_Smile} alt="Logo" id="Logo_Smile" /> */}
            </C.CaptureButton>
          </C.BottomBar>
        </C.ModalContent>
      </Draggable>
    </C.ModalBackground>
  );
};

export default PhotoSnapModal;
