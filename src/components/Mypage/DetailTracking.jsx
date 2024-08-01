import React from "react";
import { Default, Explanation } from "../../styles/MypageStyled";

const DetailTracking = () => {
  return (
    <span className="DetailTracking">
      <div>
        <img src="src\assets\Ellipse.svg" />
        <Explanation className="TrackingTitle">표정 트래킹 총 시간</Explanation>
        <div className="TrackingContent">
          <Default>1시간 35분 56초</Default>
        </div>
      </div>
      <div style={{marginTop:"41px"}}>
        <img src="src\assets\Ellipse.svg" />
        <Explanation className="TrackingTitle">표정 스냅 촬영 개수</Explanation>
        <div className="TrackingContent">
          <Default>총 45개</Default>
        </div>
      </div>
    </span>
  );
};

export default DetailTracking;
