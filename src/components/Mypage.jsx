import React from "react";
import "../styles/Mypage.css";
import { Container } from "../styles/StyledComponents";
import {
  Account,
  BoldBig,
  Boldsmall,
  Default,
  DetailContent,
  Subname,
  CharacterBox,
  WidthBox,
} from "../styles/MypageStyled";
import Home_Title from "./Homepage/Home_Title";
import Gauge from "./Mypage/Gauge";
import Tracking from "./Mypage/Tracking";
import Attendence from "./Mypage/Attendance";
import AccountDetail from "./Mypage/AccountDetail";
import DdayDetail from "./Mypage/DdayDetail";
import Profile from "./Mypage/Profile";
import DetailTracking from "./Mypage/DetailTracking";
import Character from "./Mypage/Chracter";

const Mypage = () => {
  return (
    <WidthBox>
      {/* <Home_Title/> */}
      <Subname>마이페이지</Subname>
      <Container className="Border">
        {/* 캐릭터 정보가 들어간 창 */}
        <CharacterBox className="CharacterBox">
          <Character />
          <hr />
          <Profile /> {/*1살 김치즈*/}
          <Gauge /> {/*게이지*/}
        </CharacterBox>
        {/* 트래킹 정보가 들어간 창 */}
        <Tracking />
        {/* 출석과 1/1 기록이 들어간 창 */}
        <DetailContent className="DetailContent">
          <Attendence /> {/*출석*/}
          <DdayDetail />
          <DetailTracking />
        </DetailContent>
        {/* 계정 정보가 들어간 창 */}
        <Account>
          <BoldBig>계정 정보</BoldBig>
          <AccountDetail />
        </Account>
      </Container>
      <button className="Exit">계정 탈퇴</button>
    </WidthBox>
  );
};

export default Mypage;
