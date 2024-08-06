import React from "react";
import { Default, Explanation, ThinTiny } from "../../styles/MypageStyled";

const Interpret = {
  happy: { name: "행복", color: "#FFB700" },
  surprised: { name: "놀람", color: "#40C700" },
  angry: { name: "분노", color: "#FF6736" },
  sad: { name: "슬픔", color: "#5EBBFF" },
  disgusted: { name: "혐오", color: "#9621CC" },
  neutral: { name: "무표정", color: "#6D6D6D" },
  fearful: { name: "두려움", color: "#0FBED6" }
};

const DdayDetail = ({ character }) => {
  function getMaxEmotionValue(character) {
    const emotions = {
      happy: character.reports[0]?.happy ?? 0,
      sad: character.reports[0]?.sad ?? 0,
      angry: character.reports[0]?.angry ?? 0,
      surprised: character.reports[0]?.surprised ?? 0,
      disgusted: character.reports[0]?.disgusted ?? 0,
      fearful: character.reports[0]?.fearful ?? 0,
      neutral: character.reports[0]?.neutral ?? 0,
    };

    // 배열로 변환하여 최대값 찾기
    const maxEmotion = Object.entries(emotions).reduce(
      (max, [emotion, value]) => {
        return value > max.value ? { emotion, value } : max;
      },
      { emotion: null, value: -Infinity }
    );

    return maxEmotion;
  }

  // `character`가 정의된 경우 감정 값을 가져오기
  const maxEmotion = character ? getMaxEmotionValue(character) : { emotion: "None", value: 0 };

  // 감정 데이터를 배열로 변환, 값이 undefined인 경우 0으로 설정
  const emotionData = [
    { emotion: 'happy', value: character.reports[0]?.happy ?? 0 },
    { emotion: 'sad', value: character.reports[0]?.sad ?? 0 },
    { emotion: 'angry', value: character.reports[0]?.angry ?? 0 },
    { emotion: 'surprised', value: character.reports[0]?.surprised ?? 0 },
    { emotion: 'disgusted', value: character.reports[0]?.disgusted ?? 0 },
    { emotion: 'fearful', value: character.reports[0]?.fearful ?? 0 },
    { emotion: 'neutral', value: character.reports[0]?.neutral ?? 0 },
  ];

  // 감정 데이터를 value 기준으로 내림차순 정렬
  const sortedEmotionData = emotionData.sort((a, b) => b.value - a.value);

  function getEmotionElements(data) {
    // 1번 인덱스부터 시작
    const slicedData = data.slice(1);
  
    // 그룹을 나누기 위한 인덱스 범위 설정
    const group1 = slicedData.slice(0, 3); // 1~3번
    const group2 = slicedData.slice(3, 6); // 4~6번
  
    return (
      <>
        <div style={{display:"flex", marginBottom:"15px", gap: "30px"}}>
          {group1.map((entry, index) => {
            const value = typeof entry.value === 'number' ? entry.value.toFixed(2) : '0.00';
            return (
              <span key={index}>
                {`${Interpret[entry.emotion].name} ${value}%`}
              </span>
            );
          })}
        </div>
        <div style={{display:"flex", gap: "30px"}}>
          {group2.map((entry, index) => {
            const value = typeof entry.value === 'number' ? entry.value.toFixed(2) : '0.00';
            return (
              <span key={index + 3}>
                {`${Interpret[entry.emotion].name} ${value}%`}
                {/* 6번 요소 뒤에 줄바꿈 추가 (필요 시) */}
                {index === 2 && <br />}
              </span>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div style={{ display: "inline-block" }}>
      <div className="DdayDetail">
        <Explanation>이만큼 성장했어요!</Explanation>
        <br />
        <Default id="Point">
          오늘 하루 얻은 경험치{" "}
          <span style={{ color: "#FFB700" }}>{character.experience || 0}P</span>
        </Default>
        <div id="OtherExpression">
          <Explanation>오늘 어떤 표정을 가장 많이 지었을까요?</Explanation>
          <Default style={{ color: Interpret[maxEmotion.emotion]?.color || "#000000" }}>
            {Interpret[maxEmotion.emotion]?.name || "없음"} {typeof maxEmotion.value === 'number' ? maxEmotion.value.toFixed(2) : '0.00'}%
          </Default>
          <Explanation>
            <div style={{ gap: "15px;" }}>
              <div className="OtherExpression">
                {getEmotionElements(sortedEmotionData)}
              </div>
            </div>
          </Explanation>
          <ThinTiny>
            표정 트래킹과 표정 스냅에서 측정된 모든 표정을 합산한 결과입니다.
          </ThinTiny>
        </div>
      </div>
    </div>
  );
};

export default DdayDetail;
