import React from "react";
import { Default, Explanation } from "../../styles/MypageStyled";
import Ellipse from "../../assets/Ellipse.svg";

const DetailTracking = () => {
  return (
    <div style={{display:"inline-block"}}>
      <div>
        <img src={Ellipse} />
        <Explanation className="TrackingTitle">표정 트래킹 총 시간</Explanation>
        <div className="TrackingContent">
          <Default>1시간 35분 56초</Default>
        </div>
      </div>
      <div style={{marginTop:"41px"}}>
        <img src={Ellipse} />
        <Explanation className="TrackingTitle">표정 스냅 촬영 개수</Explanation>
        <div className="TrackingContent">
          <Default>총 45개</Default>
        </div>
      </div>
    </div>
  );
};

export default DetailTracking;
