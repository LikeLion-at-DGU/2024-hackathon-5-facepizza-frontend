// src/components/Header.jsx
import React from 'react';
import * as S from '../styles/StyledComponents';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';


const Header = ({ openModal }) => {
  const location = useLocation();
  const isNotHome = location.pathname !== '/';

  return (
    <S.HeaderContainer isNotHome={isNotHome}>
      <S.Nav>
        <div id="Head_Left">
          <div class="left_box">
            <Link to="/aboutus">team 얼굴피자</Link>
          </div>
          <div class="right_box">
            <button onClick={openModal}>표정 스트레칭</button>
            <Link to="/exercise">표정 연습</Link>
            <Link to="/tracking">실시간 표정 트래킹</Link>
          </div>
        </div>
        <div id="Head_Right">
          <div class="left_box">
            <Link to="/snap">표정 스냅 찍기</Link>
            <Link to="/album">표정 앨범</Link>
            <Link to="/challenge">표정 챌린지</Link>
          </div>
          <div class="right_box">
            <Link to="/">로그인</Link>
            <Link to="/">회원가입</Link>
          </div>
        </div>
      </S.Nav>
    </S.HeaderContainer>
  );
};

export default Header;
