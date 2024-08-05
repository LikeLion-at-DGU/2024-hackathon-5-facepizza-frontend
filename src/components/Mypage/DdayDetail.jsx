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
      happy: character.happy,
      sad: character.sad,
      angry: character.angry,
      surprised: character.surprised,
      disgusted: character.disgusted,
      fearful: character.fearful,
      neutral: character.neutral,
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

  // 감정 데이터를 배열로 변환하여 정렬
  const emotionData = [
    { emotion: 'happy', value: character.happy },
    { emotion: 'sad', value: character.sad },
    { emotion: 'angry', value: character.angry },
    { emotion: 'surprised', value: character.surprised },
    { emotion: 'disgusted', value: character.disgusted },
    { emotion: 'fearful', value: character.fearful },
    { emotion: 'neutral', value: character.neutral },
  ].sort((a, b) => b.value - a.value); // 값 기준 내림차순 정렬

  function getEmotionElements(data) {
    return data.map((entry, index) => (
      <span key={index} style={{ color: Interpret[entry.emotion].color }}>
        {`${Interpret[entry.emotion].name} ${entry.value.toFixed(2)}%`}
      </span>
    ));
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
          <Default style={{ color: Interpret[maxEmotion.emotion].color }}>
            {Interpret[maxEmotion.emotion].name} {maxEmotion.value.toFixed(2)}%
          </Default>
          <Explanation>
            <div style={{ gap: "15px;" }}>
              <div className="OtherExpression">
                {getEmotionElements(emotionData)}
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
