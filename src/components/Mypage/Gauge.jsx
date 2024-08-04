import React, { useState } from "react";
import { BaseGauge, EndPoint, PointFont, StartPoint, StyledGauge } from "../../styles/MypageStyled";

const Gauge = ({ level }) => {
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(20);
  const ratio = parseFloat(exp / maxExp) * 100;
  let age = 1;

  switch (level) {
    case 'f':
      age = 1;
      break;
    case 's':
      age = 2;
      break;
    case 't':
      age = 3;
      break;
  }

  return (
    <div className="Guage">
      <BaseGauge>
        <StyledGauge width={ratio} />
        <StartPoint><PointFont>0p</PointFont></StartPoint>
        <PointFont>{age}까지 {maxExp - exp}P 더!</PointFont>
        <EndPoint><PointFont>10p</PointFont></EndPoint>
      </BaseGauge>
      <img src="src\assets\MoreInfo.png" style={{marginLeft:"10px"}}/>
    </div>
  );
};

export default Gauge;
