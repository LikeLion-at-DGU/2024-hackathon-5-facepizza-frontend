import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import Logo_Cheese from '../../assets/Logo_Cheese.png';
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

const Home_Title = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('사용자가 로그인하지 않았습니다.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/accounts/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        alert('로그아웃 성공');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('로그아웃 실패: ' + errorData.detail);
      }
    } catch (error) {
      alert('로그아웃 중 오류 발생: ' + error.message);
    }
  };


  return (
    <S.Nav>
      <div id="Head_Left">
        <S.Blink to="/aboutus">team 얼굴피자</S.Blink>
      </div>
      <Title>
        <S.Logo src={Logo_Cheese} alt="Logo" id="Logo_Cheese" />
        <span>웃으면 복이 와요!</span>
      </Title>
      <div id="Head_Right">
        <S.Blink to="/Login">로그인</S.Blink>
      </div>
      <div id="Head_Right">
        <S.Blink onClick={handleLogout}>로그아웃</S.Blink>
      </div>
    </S.Nav>
  );
};

export default Home_Title;
