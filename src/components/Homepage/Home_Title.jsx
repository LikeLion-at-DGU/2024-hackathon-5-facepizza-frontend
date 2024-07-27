import React from 'react';
import * as S from '../../styles/StyledComponents';
import Logo_Smile from '../../assets/Logo_Smile.png'; // 사진 경로 수정 필요
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 30px 0;
`
const Logo = styled.img`
  width: 80px;
  height: auto;
  margin: 10px 0 20px 0;
`

const Home_Title = () => {
  return (
    <Title>
      <Logo src={Logo_Smile} alt="Logo" id="Logo_Smile" />
      나를 더 건강하게, 나를 더 풍부하게
    </Title>
  );
};

export default Home_Title;
