import React from 'react';
import * as S from '../styles/StyledComponents';
import * as T from '../styles/HeaderStyled';
import { useLocation } from 'react-router-dom';
import Logo_Cheese from '../assets/Logo_Cheese.png';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <T.HeaderContainer>
      <T.Nav>
        <S.Blink to="/">
          <T.Logo src={Logo_Cheese} alt="Logo" id="Logo_Cheese" />
        </S.Blink>
        <div id="center_box">
        <T.Hlink to="/tracking" active={currentPath.includes('/tracking')}>
          표정 트래킹
        </T.Hlink>
        <T.Hlink to="/snap" active={currentPath === '/snap'}>
          표정 스냅
        </T.Hlink>
        <T.Hlink to="/Magzine" active={currentPath.includes('/Magzine')}>
          인사이트 창고
        </T.Hlink>
        <T.Hlink to="/Mypage" active={currentPath === '/Mypage'}>
          마이페이지
        </T.Hlink>
        </div>
        <T.Hlink to="/Login" active={currentPath === '/Login'}>
          로그인
        </T.Hlink>
      </T.Nav>
    </T.HeaderContainer>
  );
};

export default Header;
