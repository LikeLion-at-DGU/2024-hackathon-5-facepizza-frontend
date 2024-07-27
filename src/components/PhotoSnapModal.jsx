// src/components/PhotoSnapModal.jsx
import React from 'react';
import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: transparent;
  width: 90%;
  max-width: 1700px;
  height: 0;
  /* padding-top: calc(1260 / 1700 * 50%); */
  padding-bottom: calc(1260 / 1700 * 50%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//탑바
export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 90px;
  padding: 0 20px;
  width: 100%;
  background-color: #f0f0f0;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

//카메라 컨테이너 (가로 flex)
export const CameraContainer = styled.div`
  display: flex;
  /* flex: 1; */
  background-color: white;
  width: 100%;
  max-height: 1000px;
  position: relative;
`;

export const CameraView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    position: relative;
    top: 100px;
    color: white;
  }
`;

export const CameraCanvas = styled.div`
  /* position: relative; */
  width: 100%;
  padding-bottom: 66.67%; /* 1500:1000 비율 유지 */
  height: 0;
  /* background-color: blue; */

  video, canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* border: 1px solid black; */
  }
`;


export const RightPanel = styled.div`
  width: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const EmotionButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: ${({ selected }) => (selected ? '#FFD700' : '#f0f0f0')};
  border: none;
  cursor: pointer;
`;

export const BottomBar = styled.div`
  max-height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 0 0 50px 50px;
`;

export const CaptureButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: red;
  border: none;
  cursor: pointer;
`;






const PhotoSnapModal = ({ children, onClose, onMinimize, onMaximize }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 내부를 클릭했을 떄 닫히지 않게 함*/}
        <TopBar>
          <Button onClick={onMinimize}>–</Button>
          <Button onClick={onMaximize}>□</Button>
          <Button onClick={onClose}>×</Button>
        </TopBar>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default PhotoSnapModal;
