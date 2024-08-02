import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
// 컴포넌트 파일들 불러오기
import Header from './components/Header';
import AppRouter from './Router';
import Home_Title from './components/Homepage/Home_Title';
import Home_Content from './components/Homepage/Home_Content';
import RouteBar from './components/RouteBar';
// 스타일 컴포넌트 불러오기
import { Main, Container } from './styles/StyledComponents';

const AppContent = () => {
  
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMyapge = location.pathname === '/Mypage' ;

  return (
    <>
      { isHome && <Home_Title />}
      {!isHome && <Header />}
      {!isHome && <RouteBar />}
      <Main>
        <AppRouter />
      </Main>
      {isHome && <Home_Content />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Container id='Container'>
        <AppContent />
      </Container>
    </Router>
  );
};

export default App;
