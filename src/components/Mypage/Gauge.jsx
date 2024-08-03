import React, { useState } from "react";
import { BaseGauge, StyledGauge } from "../../styles/MypageStyled";

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
      </BaseGauge>
      <span className="GuageInfo">{age+1}살까지 경험치 {maxExp - exp}p더!</span>
      <img src="src\assets\MoreInfo.svg" />
    </div>
  );
};

export default Gauge;
