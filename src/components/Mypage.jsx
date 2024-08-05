import React, { useState, useEffect } from "react";
import "../styles/Mypage.css";
import { Container } from "../styles/StyledComponents";
import {
  Account,
  BoldBig,
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
import axios from "axios";
import Character from "./Character/Chracter";
import AccountModal from "./Mypage/AccountModal";
import { API } from "../api";

const Mypage = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(null); // 유저 ID 관리
  const [response, setResponse] = useState(null);
  const [character, setCharacter] = useState(null);
  const [number, setNumber] = useState(null);
  const [report, setReport] = useState(null);

  let today = new Date();
  let month = today.getMonth();
  let day = today.getDate();

  // 유저 로그인 상태와 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);
        console.log("Token:", token);

        // 여러 요청을 병렬로 처리합니다.
        const [
          profileResponse,
          characterResponse,
          numberResponse,
          reportResponse,
        ] = await Promise.all([
          API.get("/api/mypage/profile", {
            headers: { Authorization: `Token ${token}` },
          }),
          API.get("/api/characters/tracktime", {
            headers: { Authorization: `Token ${token}` },
          }),
          API.get("/api/albums/count", {
            headers: { Authorization: `Token ${token}` },
          }),
          API.get("/api/report", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        console.log("Profile response:", profileResponse.data);
        console.log("Character response:", characterResponse.data);
        console.log("Number response:", numberResponse.data);
        console.log("Report response:", reportResponse.data);

        // 상태 업데이트
        const characterData = characterResponse.data;
        const reportData = reportResponse.data;

        // reports가 null인 경우 감정 값들을 0으로 설정
        if (!characterData.reports || characterData.reports.length === 0) {
          characterData.reports = [
            {
              happy: 0,
              sad: 0,
              angry: 0,
              surprised: 0,
              disgusted: 0,
              fearful: 0,
              neutral: 0,
            },
          ];
        }

        if (!reportResponse || reportData.length === 0) {
          reportData = [
            {
              happy: 0,
              sad: 0,
              angry: 0,
              surprised: 0,
              disgusted: 0,
              fearful: 0,
              neutral: 0,
            },
          ];
        }

        // 상태 업데이트
        setResponse(profileResponse.data);
        setCharacter(characterResponse.data);
        setNumber(numberResponse.data);
        setReport(reportResponse.data);

        if (profileResponse.data.user.id) {
          setIsLoggedIn(true);
          setUserId(profileResponse.data.user.id);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    fetchUserData();
  }, []);

  // 데이터 로딩 여부 확인
  if (!response) {
    return <div>Loading...</div>; // 로딩 중일 때의 표시
  }

  return (
    <>
      <WidthBox>
        {/* <Home_Title/> */}
        <Subname id="Subname">마이페이지</Subname>
        <Container id="Border">
          {/* 캐릭터 정보가 들어간 창 */}
          <CharacterBox className="CharacterBox">
            <Character />
            <hr />
            <Profile data={response} /> {/* 데이터가 로드된 후에 렌더링 */}
            <Gauge info={response.characters[0]} /> {/*게이지*/}
          </CharacterBox>
          {/* 트래킹 정보가 들어간 창 */}
          <Tracking report={report} />
          {/* 출석과 1/1 기록이 들어간 창 */}
          <DetailContent className="DetailContent">
            {/* <Attendence /> 출석 */}
            <div style={{ marginTop: "50px" }}>
              <Default id="Date">
                {month}/{day} 기록
              </Default>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 200px",
              }}
            >
              <DdayDetail character={character} />
              <DetailTracking character={character} count={number.count} />
            </div>
          </DetailContent>
          {/* 계정 정보가 들어간 창 */}
          <Account>
            <BoldBig>계정 정보</BoldBig>
            <AccountDetail user={response.user} />
          </Account>
        </Container>
        <AccountModal />
      </WidthBox>
    </>
  );
};

export default Mypage;
