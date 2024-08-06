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

const Gauge = () => {
  const [token, setToken] = useState(null);
  const [info, setInfo] = useState(null);
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(10);
  const [level, setLevel] = useState(1);
  const ratio = parseFloat(exp / maxExp) * 100;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        const info = await Promise.all([
          API.get("/api/report", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);
        setInfo(info[0]);
        console.log(info.user);
        setName(info.user.first_name);
        console.log(info.characters[0]);
        setAge(info.characters[0].level);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserData();
  }, []);

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
