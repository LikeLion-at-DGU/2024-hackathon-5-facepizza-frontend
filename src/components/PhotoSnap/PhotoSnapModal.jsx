// src/components/PhotoSnapModal.jsx  정상코드
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import * as C from '../../styles/CameraStyled';


//수정코드
const PhotoSnapModal = ({ onClose, children, setTakePhoto, yourEmotion, selectedEmotion}) => {
  const nodeRef = useRef(null);

  return (
    <C.ModalBackground onClick={onClose}>
      <Draggable handle=".handle" nodeRef={nodeRef}>
        <C.ModalContent ref={nodeRef} onClick={(e) => e.stopPropagation()}>
          {/* 내부를 클릭했을 때 닫히지 않게 함 */}
          <C.TopBar className="handle">
            <C.Feedback $yourEmotion={yourEmotion}>
              감지된 표정 : {yourEmotion}
              <div className="spinner" />
            </C.Feedback>
            <button onClick={onClose}> ✕ </button>
          </C.TopBar>
          
          {children}
          
          <C.BottomBar>
            <C.CaptureButton onClick={() => setTakePhoto(true)} emotion={selectedEmotion}>
            </C.CaptureButton>
          </C.BottomBar>
        </C.ModalContent>
      </Draggable>
    </C.ModalBackground>
  );
};

export default PhotoSnapModal;
