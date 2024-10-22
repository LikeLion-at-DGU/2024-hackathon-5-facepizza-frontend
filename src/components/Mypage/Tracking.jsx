import React from "react";
import { Boldsmall, BoldTiny, Thinsmall, TrackingBox } from "../../styles/MypageStyled";

const Interpret = {
  happy: { name: "행복", color: "#FFB700" },
  surprised: { name: "놀람", color: "#40C700" },
  angry: { name: "분노", color: "#FF6736" },
  sad: { name: "슬픔", color: "#5EBBFF" },
  disgusted: { name: "혐오", color: "#9621CC" },
  neutral: { name: "무표정", color: "#6D6D6D" },
  fearful: { name: "두려움", color: "#0FBED6" }
};

const Tracking = ({ report }) => {

  
  console.log("Traking report:", report);
  // 감정 데이터를 배열로 변환
  const emotionData = [
    { emotion: 'happy', value: report === null ? 0 : report.happy },
    { emotion: 'sad', value: report === null ? 0 : report.sad},
    { emotion: 'angry', value: report === null ? 0 : report.angry},
    { emotion: 'surprised', value: report  === null ? 0 : report.surprised},
    { emotion: 'disgusted', value: report === null ? 0 : report.disgusted},
    { emotion: 'fearful', value: report === null ? 0 : report.fearful },
    { emotion: 'neutral', value: report === null ? 0 : report.neutral },
  ];

  console.log(emotionData);

  // 최대값을 찾기 위한 함수
  const getMaxEmotion = () => {
    return emotionData.reduce((max, entry) => entry.value > max.value ? entry : max, { emotion: null, value: -Infinity });
  };

  const maxEmotion = getMaxEmotion();

  function getEmotionElements(data) {
    console.log("Tracking: ", data);
    return data.map((entry, index) => (
      <Thinsmall key={index} style={{ color: entry.emotion === maxEmotion.emotion ? Interpret[entry.emotion].color : 'inherit' }}>
        {`${Interpret[entry.emotion].name} ${entry.value.toFixed(2)}%`}
      </Thinsmall>
    ));
  }

  return (
    <>
      <TrackingBox>
        <Boldsmall style={{marginBottom:"20px"}}>최근 표정 트래킹 비율</Boldsmall>
        <div className="detail">
          <div>
            {getEmotionElements(emotionData)}
          </div>
        </div>
        <br />
        <BoldTiny>가장 최근의 표정 트래킹에 기반해서 표정이 나타나요!</BoldTiny>
      </TrackingBox>
    </>
  );
};

export default Tracking;
