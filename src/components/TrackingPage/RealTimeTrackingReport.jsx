import React from 'react';
import * as S from '../../styles/StyledComponents';
import * as RT from '../../styles/RealTimeTrackingStyled';
import * as C from '../../styles/CameraStyled';
import { Section, Container } from '../../styles/StyledComponents';
import { useLocation } from 'react-router-dom';
import ImportCharacter from "../Character/ImportCharacter";

const RealTimeTrackingReport = () => {
  const location = useLocation();
  const { emotionCounts, emotionPics, emotionPercentages, startTime, endTime } = location.state || {};

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };  // 날짜 출력 형식

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };  // 시간 출력 형식

  const emotionTranslations = {
    happy: '행복',
    sad: '슬픔',
    angry: '화남',
    surprised: '놀람',
    disgusted: '혐오',
    fearful: '두려움',
    neutral: '무표정',
  };  // 감정 출력시 이름 변경

  // 가장 비율이 높은 표정을 찾는 함수
  const BestEmotion = () => {
    let maxEmotion = null;
    let maxPercentage = -Infinity;

    Object.entries(emotionPercentages).forEach(([emotion, percentage]) => {
      if (parseFloat(percentage) > maxPercentage) {
        maxPercentage = parseFloat(percentage);
        maxEmotion = emotion;
      }
    });

    return maxEmotion ? { emotion: maxEmotion, percentage: maxPercentage } : null;
  };

  const bestEmotion = BestEmotion();

  const calculateElapsedTime = (start, end) => {
    const elapsedMs = new Date(end) - new Date(start);
    const seconds = Math.floor((elapsedMs / 1000) % 60);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);

    if (minutes === 0) {
      return `${String(seconds)}초`;
    } else {
      return `${String(minutes)}분 ${String(seconds)}초`;
    }
  };  // 총 트래킹 한 시간

  const elapsedTime = calculateElapsedTime(startTime, endTime);

  const emotionSequence = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'afraid', 'disgusted'];
  const getEmoticonKey = (emotion, characterType) => {
    const emotionIndex = emotionSequence.indexOf(emotion);
    if (emotionIndex === -1) return null;
    return `${characterType}_${emotionSequence[emotionIndex]}`;
  };

  const CharacterDisplay = ({ bestEmotion, characterType = 's' }) => {
    const emoticonKey = getEmoticonKey(bestEmotion.emotion, characterType);
    const emoticonsrc = ImportCharacter[emoticonKey] || images['s_neutral'];
    const imgstyle = {
      width: '350px',
      hieght: '200px',
      objectFit: 'cover'
    }
    return (
      <img src={emoticonsrc} alt={bestEmotion.emotion} style={imgstyle} />
    );
  };

  return (
      <RT.TrackingContainer>
        <C.Main_Container>
          <div id='title_bar' style={{ justifyContent: 'space-between', borderBottom: 'none' }}>
            {/* <h3 style={{ margin: '0px', paddingLeft: '0px' }}>{report.title}</h3> */}
          </div>
          <div className='dataContainer2'>
            <RT.HeadP>data</RT.HeadP>

            <h2>누적 표정 데이터</h2>

            <div>
              <RT.Data1 style={{ justifyContent: 'center' }}>
                {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
                  <div key={emotion} style={{ marginRight: '10px' }}>
                    <h4>{emotionTranslations[emotion]}: {percentage}%</h4>
                  </div>
                ))}
              </RT.Data1>

              <CharacterDisplay bestEmotion={bestEmotion} characterType="s" />

              {bestEmotion && (
                <div>
                  {emotionTranslations[bestEmotion.emotion] === '무표정' ?
                    <RT.H3magin>{emotionTranslations[bestEmotion.emotion]}을 가장 많이 지었어요!</RT.H3magin>
                    : emotionTranslations[bestEmotion.emotion] === '행복' ?
                      <RT.H3magin>행복한 표정을 가장 많이 지었어요!</RT.H3magin>
                      : <RT.H3magin>{emotionTranslations[bestEmotion.emotion]} 표정을 가장 많이 지었어요!</RT.H3magin>
                  }
                </div>
              )}
            </div>
          </div>


          <C.FlexRow style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%', gap: '18px' }} >
            <p style={{ fontSize: '18px' }}>총 {elapsedTime} 트래킹</p>
            <p>시작 {formatDate(startTime)} {formatTime(startTime)}&nbsp;&nbsp; </p>
            <p>종료 {formatDate(endTime)} {formatTime(endTime)}</p>
          </C.FlexRow>
          <div>
            <h3>하이라이트 사진</h3>
            <RT.Gallery>
              {emotionPics && Object.entries(emotionPics).map(([emotion, { img, maxValue }]) => (
                img ? (
                  <div key={emotion}>
                    <img src={img} alt={emotion} width="300" />
                    <p>{emotionTranslations[emotion]} {(maxValue * 100).toFixed(1)}%</p><br />
                  </div>
                ) : null
              ))}
            </RT.Gallery>
          </div>
        </C.Main_Container>
      </RT.TrackingContainer>
  );
};

export default RealTimeTrackingReport;
