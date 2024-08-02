import React, { useState } from "react";
import { BaseGauge, StyledGauge } from "../../styles/MypageStyled";

const Gauge = () => {

  const [exp, setExp] = useState(1);
  const [maxExp, setMaxExp] = useState(7);
  const ratio = parseFloat(exp % maxExp);

  return (
    <div className="Guage">
      <BaseGauge>
        <StyledGauge width={ratio}/>
      </BaseGauge>
      <span className="GuageInfo">2살까지 경험치 15p더!</span>
      <img src="src\assets\MoreInfo.svg"/>
    </div>
  );
};

export default Gauge;
