import React from "react";
import "../styles/Mypage.css";
import { Container } from "../styles/StyledComponents";
import { Account, Boldsmall, Character, Default, DetailContent, Profile, Subname } from "../styles/MypageStyled";
import Home_Title from "./Homepage/Home_Title";
import Gauge from "./Mypage/Gauge";
import Tracking from "./Mypage/Tracking";
import Attendence from "./Mypage/Attendance";

const Mypage = () => {
  return (
    <>
      <Home_Title></Home_Title>
      <Subname>마이페이지</Subname>
      <Container className="Border">
        <Character className="Character">
          <img src="src\assets\Polygon.svg" style={{ marginBottom: "23px" }} />
          <hr />
          <Profile>
            <Default>1살 김치즈</Default>
            <img src="src\assets\rename.svg" className="rename" />
          </Profile>
          <Gauge />
        </Character>
        <Tracking/>
        <DetailContent>
          <Attendence/>
        </DetailContent>
        <Account></Account>
      </Container>
    </>
  );
};

export default Mypage;
