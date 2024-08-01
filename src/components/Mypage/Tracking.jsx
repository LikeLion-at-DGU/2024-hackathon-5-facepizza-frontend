import React from "react";
import { Boldsmall, BoldTiny, Thinsmall, TrackingBox } from "../../styles/MypageStyled";
const Tracking = () => {
  return (
    <>
      <TrackingBox>
        <Boldsmall>최근 표정 트래킹 비율</Boldsmall>
        <div className="detail">
          <div>
            <Thinsmall>행복 15%</Thinsmall>
            <Thinsmall>놀람 33%</Thinsmall>
            <Thinsmall>분노 17%</Thinsmall>
            <Thinsmall>슬픔 3%</Thinsmall>
            <Thinsmall>무표정 33%</Thinsmall>
            <Thinsmall>두려움 3%</Thinsmall>
            <Thinsmall>혐오 33%</Thinsmall>
          </div>
        </div><br/>
        <BoldTiny>가장 최근의 표정 트래킹에 기반해서 표정이 나타나요!</BoldTiny>
      </TrackingBox>
    </>
  );
};

export default Tracking;
