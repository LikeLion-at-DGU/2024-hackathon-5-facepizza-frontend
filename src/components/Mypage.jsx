import React, { useState, useEffect } from 'react';
import "../styles/Mypage.css";
import { Container } from "../styles/StyledComponents";
import { WidthBox, Account, BoldBig, Boldsmall, Character, Default, DetailContent, Subname } from "../styles/MypageStyled";
import Home_Title from "./Homepage/Home_Title";
import Gauge from "./Mypage/Gauge";
import Tracking from "./Mypage/Tracking";
import Attendence from "./Mypage/Attendance";
import AccountDetail from "./Mypage/AccountDetail";
import DdayDetail from "./Mypage/DdayDetail";
import Profile from "./Mypage/Profile";
import DetailTracking from "./Mypage/DetailTracking";


const Mypage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    console.log('토큰:', storedToken);
  }, []);
  
  return (
    <WidthBox>
      {/* <Home_Title/> */}
      <Subname>마이페이지</Subname>
      <Container className="Border">
        {/* 캐릭터 정보가 들어간 창 */}
        <Character className="Character">
          <img src="src\assets\Polygon.svg" style={{ marginBottom: "23px" }} />
          <hr />
          <Profile/>
          <Gauge /> {/*게이지*/}
        </Character>
        {/* 트래킹 정보가 들어간 창 */}
        <Tracking/>
        {/* 출석과 1/1 기록이 들어간 창 */}
        <DetailContent className="DetailContent">
          <Attendence/> {/*출석*/}
          <DdayDetail/>
          <DetailTracking/>
        </DetailContent>
        {/* 계정 정보가 들어간 창 */}
        <Account>
          <BoldBig>계정 정보</BoldBig>
          <AccountDetail/>
        </Account>
      </Container>
      <button className="Exit">계정 탈퇴</button>
    </WidthBox>
  );
};

export default Mypage;
