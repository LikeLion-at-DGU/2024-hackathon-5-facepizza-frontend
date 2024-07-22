// src/components/Header.jsx
import React from 'react';
import * as S from '../styles/StyledComponents';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Nav>
        <Link to="/aboutus">team 얼굴피자</Link>
        <Link to="/stretch">표정 스트레칭</Link>
        <Link to="/exercise">표정 연습</Link>
        <Link to="/tracking">실시간 표정 트래킹</Link>
        <Link to="/snap">표정 스냅 찍기</Link>
        <Link to="/album">표정 앨범</Link>
        <Link to="/challenge">표정 챌린지</Link>

      </S.Nav>
    </S.HeaderContainer>
  );
};

export default Header;
