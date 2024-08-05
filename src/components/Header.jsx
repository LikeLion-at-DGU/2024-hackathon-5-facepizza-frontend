import React, { useState, useEffect } from 'react';
import * as S from '../styles/StyledComponents';
import * as T from '../styles/HeaderStyled';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo_Cheese from '../assets/Logo_Cheese.png';
import { API } from '../api';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); //토큰이 존재하면 true값
    // console.log(token);
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

  return (
    <T.HeaderContainer>
      <T.Nav>
        <T.Hlink to="/">
          <T.Logo src={Logo_Cheese} alt="Logo" id="Logo_Cheese" />
        </T.Hlink>
        <div id="center_box">
          <T.Hlink to="/tracking/list" active={currentPath.includes('/tracking')}>
            표정 트래킹
          </T.Hlink>
          <T.Hlink to="/snap" active={currentPath.includes('/snap')}>
            표정 스냅
          </T.Hlink>
          <T.Hlink to="/album" active={currentPath.includes('/album')}>
            표정 앨범
          </T.Hlink>
          <T.Hlink to="/Magzine" active={currentPath.includes('/Magzine')}>
            인사이트 창고
          </T.Hlink>
          <T.Hlink to="/Mypage" active={currentPath.includes('/Mypage')}>
            마이페이지
          </T.Hlink>
        </div>
        {isLoggedIn && <T.Hlink onClick={handleLogout}>로그아웃</T.Hlink>}
        {!isLoggedIn && <T.Hlink to="/Login" active={currentPath === '/Login'}>로그인</T.Hlink>}
      </T.Nav>
    </T.HeaderContainer>
  );
};

export default Header;