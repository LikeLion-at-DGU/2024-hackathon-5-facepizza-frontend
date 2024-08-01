import React from 'react';
import * as S from '../../styles/StyledComponents';
import Logo_Cheese from '../../assets/Logo_Cheese.png'; // 사진 경로 수정 필요
import styled from 'styled-components';


const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 0 0 30px 0;
  flex-wrap: nowrap;
  span{
    font-size: 12px;
  }
`
const Logo = styled.img`
  width: 80px;
  height: auto;
  margin: 0px 0 5px 0;
  margin-left: auto;
  margin-right: auto
`


const Home_Title = () => {
  return (
    <S.Nav>
      <div id="Head_Left">
        <S.Blink to="/aboutus">team 얼굴피자</S.Blink>
      </div>
      <Title>
        <Logo src={Logo_Cheese} alt="Logo" id="Logo_Cheese" />
        <span>웃으면 복이 와요!</span>
      </Title>
      <div id="Head_Right">
        <S.Blink to="/Login">로그인</S.Blink>
      </div>
    </S.Nav>
  );
};

export default Home_Title;
