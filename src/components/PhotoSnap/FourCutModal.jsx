// src/components/PhotoSnapModal.jsx  정상코드
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import * as C from '../../styles/CameraStyled';


//수정코드
const FourCutModal = ({ onClose, children, setTakePhoto, yourEmotion, selectedEmotion, capturedPhotos }) => {
    const nodeRef = useRef(null);

    return (
        <C.ModalBackground onClick={onClose}>
            <Draggable handle=".handle" nodeRef={nodeRef}>
                <C.FourModalContain ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                    {/* 내부를 클릭했을 때 닫히지 않게 함 */}
                    <C.TopBar className="handle">
                        <C.Feedback $yourEmotion={yourEmotion}>
                            감지된 표정 : {yourEmotion}
                        </C.Feedback>
                        <button onClick={onClose}> ✕ </button>
                    </C.TopBar>

                    {children}

                    <C.BottomBar style={{gap: '20px'}}>
                        <div>
                            <p>현재 목표 감정: {selectedEmotion}</p>
                        </div>
                        <C.CaptureButton onClick={() => setTakePhoto(true)} emotion={selectedEmotion}>
                        </C.CaptureButton>
                        <div><p>찍힌 사진 수: {capturedPhotos.length}/4</p></div>
                    </C.BottomBar>
                </C.FourModalContain>
            </Draggable>
        </C.ModalBackground>
    );
};

export default FourCutModal;
