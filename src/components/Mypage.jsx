import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Character from "./Character/Chracter";

const Mypage = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
  const [userId, setUserId] = useState(null);  // 유저 ID 관리

  // 유저 로그인 상태와 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
        setToken(token);
        console.log('Token:', token); // 토큰 값 확인용 콘솔 로그 추가
        const response = await axios.get('http://127.0.0.1:8000/api/mypage/profile', {
          headers: {
            Authorization: `Token ${token}`  // 인증 헤더에 토큰을 추가합니다.
          }
        });
        console.log('User data response:', response); // 응답 확인용 콘솔 로그 추가
        if (response.data.id) {
          setIsLoggedIn(true);
          setUserId(response.data.id);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <WidthBox>
      {/* <Home_Title/> */}
      <Subname id='Subname'>마이페이지</Subname>
      <Container id="Border">
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
