import React, { useState } from "react";
import {
  BaseGauge,
  EndPoint,
  PointFont,
  StartPoint,
  StyledGauge,
} from "../../styles/MypageStyled";
import MoreInfo from "../../assets/MoreInfo.png";
import QuestionMark from "./QuestionMark";

const Gauge = ({ level }) => {
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(20);
  const ratio = parseFloat(exp / maxExp) * 100;
  let age = 1;

  switch (level) {
    case "f":
      age = 1;
      break;
    case "s":
      age = 2;
      break;
    case "t":
      age = 3;
      break;
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }
  return (
    <>
      <div className="Guage">
        <BaseGauge>
          <StyledGauge width={ratio} />
          <StartPoint>
            <PointFont>0p</PointFont>
          </StartPoint>
          <PointFont>
            {age}까지 {maxExp - exp}P 더!
          </PointFont>
          <EndPoint>
            <PointFont>10p</PointFont>
          </EndPoint>
        </BaseGauge>
        <img src={MoreInfo} style={{ marginLeft: "10px" }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
      </div>
      <QuestionMark isHovering={isHovering}/>
    </>
  );
};

export default Gauge;
