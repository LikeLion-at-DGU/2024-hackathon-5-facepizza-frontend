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
            <button onClick={openStretchModal}>표정 스트레칭</button>
            <button onClick={openExerciseModal}>표정 연습</button>
            <S.Blink to="/tracking">실시간 표정 트래킹</S.Blink>
          </div>
        </div>
        <div id="Head_Right">
          <div class="left_box">
            <S.Blink to="/snap">표정 스냅 찍기</S.Blink>
            <S.Blink to="/album">표정 앨범</S.Blink>
            <S.Blink to="/challenge">표정 챌린지</S.Blink>
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
