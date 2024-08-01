import React from "react";
import { Default, Explanation, ThinTiny } from "../../styles/MypageStyled";

const DdayDetail = () => {
  return (
    <span>
      <div className="DdayDetail">
        <Default id="Date">1/1 기록</Default>
        <Explanation>이만큼 성장했어요!</Explanation>
        <br />
        <Default id="Point">
          오늘 하루 얻은 경험치 <span style={{ color: "#FFB700" }}>15P</span>
        </Default>
        <div id="OtherExpression">
          <Explanation>오늘 어떤 표정을 가장 많이 지었을까요?</Explanation>
          <Default style={{ color: "#FFB700" }}>행복 45%</Default>
          <Explanation>
            <div style={{gap:"15px;"}}>
              <div className="OtherExpression">
                <span>놀람 15%</span>
                <span>무표정 33%</span>
                <span>혐오 33%</span>
              </div>
              <div className="OtherExpression">
                <span>분노 33%</span>
                <span>슬픔 33%</span>
                <span>분노 33%</span>
              </div>
            </div>
          </Explanation>
          <ThinTiny>표정 트래킹과 표정 스냅에서 측정된 모든 표정을 합산한 결과입니다.</ThinTiny>
        </div>
      </div>
    </span>
  );
};
export default DdayDetail;
