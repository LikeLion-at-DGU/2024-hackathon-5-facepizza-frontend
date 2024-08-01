// src/components/Header.jsx
import React from 'react';
import * as S from '../styles/StyledComponents';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';


const Header = ({ openStretchModal, openExerciseModal }) => {
  const location = useLocation();

  return (
    <S.HeaderContainer>
      <S.Nav>
        <div id="Head_Left">
          <div class="left_box">
            <S.Blink to="/aboutus">team 얼굴피자</S.Blink>
          </div>
          <div class="right_box">
            
            
          </div>
        </div>
        <div id="Head_Right">
          <div class="left_box">
          <S.Blink to="/tracking">실시간 표정 트래킹</S.Blink>
            <S.Blink to="/snap">표정 스냅 찍기</S.Blink>
            <S.Blink to="/magazine">인사이트 창고</S.Blink>
            <S.Blink to="/mypage">마이페이지</S.Blink>
          </div>
          <div class="right_box">
            <S.Blink to="/Login">로그인</S.Blink>
            <S.Blink to="/Acount">회원가입</S.Blink>
          </div>
        </div>
      </S.Nav>
    </S.HeaderContainer>
  );
};

export default Header;
