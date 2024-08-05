import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import Logo_Cheese from '../../assets/Logo_Cheese.png';
import styled from 'styled-components';
import { API } from '../../api';

const Title = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0 0 30px 0;
  flex-wrap: nowrap;
  span{
    font-size: 20px;
    width: 400px;
  }
`

const Home_Title = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); //토큰이 존재하면 true값
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await API.post('/api/accounts/logout', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('로그아웃 성공');
        navigate('/'); //홈페이지로 이동
      } else {
        const errorData = await response.json();
        alert('로그아웃 실패: ' + errorData.detail);
      }
    } catch (error) {
      alert('로그아웃 중 오류 발생: ' + error.message);
    }
  };

  let subtitle;
  switch (location.pathname) {
    case '/':
      subtitle = '풍부한 표정을 위한 냉동 치즈의 여정'
      break;
    case '/mypage':
      subtitle = '마이페이지';
      break;
    default:
      subtitle: '기본';
  }

  return (
    <S.Nav>
      <div id="Head_Left">
        <S.Blink to="/aboutus">{/*team 얼굴피자*/}</S.Blink> 
      </div>
      <Title>
        <S.Blink to="/" style={{padding: '0'}}>
          <S.Logo src={Logo_Cheese} alt="Logo" id="Logo_Cheese" />
        </S.Blink>
        <span>{subtitle}</span>
      </Title>
      <div id="Head_Right">
        {!isLoggedIn && <S.Blink to="/Login">로그인</S.Blink>}
        {isLoggedIn && <S.Blink onClick={handleLogout}>로그아웃</S.Blink>}
      </div>
    </S.Nav>
  );
};

export default Home_Title;
