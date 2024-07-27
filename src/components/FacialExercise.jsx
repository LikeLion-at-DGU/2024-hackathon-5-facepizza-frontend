//coponents/FacialExercise.jsx
import React, {useRef, useState, useEffect} from 'react';
import Modal from 'react-modal';
import * as S from '../styles/StyledComponents';
import FaceExercise from './FaceDetection/FaceExercise';

Modal.setAppElement('#root'); // accessibility를 위한 설정

const FacialExercise = ({ isOpen, onRequestClose }) => {
  const videoRef = useRef(null);
  const [selectedEmotion, setSelectedEmotion] = useState('행복');
  const [exerciseType, setExerciseType] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(10); // 초기 횟수 설정

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  }

  const handleExerciseTypeChange = (type) => {
    setExerciseType(type);
  };

  const decreaseCount = () => {
    setExerciseCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  useEffect(() => {
    if (exerciseType !== null) {
      console.log("Exercise Type: ", exerciseType);
    }
  }, [exerciseType]);

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
        <FaceExercise />
        <S.Overlay>
          <S.GuideText>
            <p style = {{color: 'white'}}>표정 연습하기 튜토리얼</p>
            <p style = {{color: '#FFC700'}}>표정 연습 진행 방식을 설정해주세요</p>
            <S.CheckboxContainer>
              <p>단일 표정 계속 연습하기</p>
              <input 
                type="checkbox" 
                onChange={e => handleExerciseTypeChange(e.currentTarget.checked ? 1 : null)}
                checked={exerciseType === 1}
              />
            </S.CheckboxContainer>
            <S.ButtonContainer>
              <S.EmotionButton onClick={() => handleEmotionClick('행복')} selected={selectedEmotion === '행복'}>행복</S.EmotionButton>
              <S.EmotionButton onClick={() => handleEmotionClick('슬픔')} selected={selectedEmotion === '슬픔'}>슬픔</S.EmotionButton>
              <S.EmotionButton onClick={() => handleEmotionClick('분노')} selected={selectedEmotion === '분노'}>분노</S.EmotionButton>
              <S.EmotionButton onClick={() => handleEmotionClick('놀람')} selected={selectedEmotion === '놀람'}>놀람</S.EmotionButton>
              <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <S.PracticeNum onClick={decreaseCount}>연습횟수: {exerciseCount}
                </S.PracticeNum>
              </div>
            </S.ButtonContainer>
            <S.CheckboxContainer>
              <p>2. 여러 표정 한번에 연습하기</p>
              <input 
                type="checkbox" 
                onChange={e => handleExerciseTypeChange(e.currentTarget.checked ? 2 : null)}
                checked={exerciseType === 2}
              />
            </S.CheckboxContainer>
          </S.GuideText>
        </S.Overlay>
      </S.CameraWrapper>
      <button onClick={onRequestClose}>Start</button>
    </Modal>
  );
};

export default FacialExercise;
