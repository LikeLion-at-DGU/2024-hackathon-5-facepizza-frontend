import React, { useState, useEffect } from "react";
import {
  BaseGauge,
  EndPoint,
  PointFont,
  StartPoint,
  StyledGauge,
} from "../../styles/MypageStyled";
import MoreInfo from "../../assets/MoreInfo.png";
import QuestionMark from "./QuestionMark";

const Gauge = ({ info }) => {
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(10);
  const [level, setLevel] = useState(1);
  const ratio = parseFloat(exp / maxExp) * 100;

  useEffect(()=>{
    if(info){
      setExp(info.exp);
      setMaxExp(info.max_exp);
      setLevel(info.level);
    }
  },[info])

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
            {level+1}까지 {maxExp - exp}P 더!
          </PointFont>
          <EndPoint>
            <PointFont>{maxExp}p</PointFont>
          </EndPoint>
        </BaseGauge>
        <img src={MoreInfo} style={{ marginLeft: "10px" }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
      </div>
      <QuestionMark isHovering={isHovering}/>
    </>
  );
};

export default Gauge;
