import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
// 컴포넌트 파일들 불러오기
import Header from './components/Header';
import AppRouter from './Router';
import FacialStretch from './components/FacialStretch';
import FacialExercise from './components/FacialExercise';
import Home_Title from './components/Homepage/Home_Title';
import Home_Content from './components/Homepage/Home_Content';
// 스타일 컴포넌트 불러오기
import { Main, Container } from './styles/StyledComponents';

const AppContent = () => {
  const [isStretchModalOpen, setIsStretchModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const openStretchModal = () => setIsStretchModalOpen(true);
  const closeStretchModal = () => setIsStretchModalOpen(false);

  const openExerciseModal = () => setIsExerciseModalOpen(true);
  const closeExerciseModal = () => setIsExerciseModalOpen(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && <Home_Title />}
      <Header openStretchModal={openStretchModal} openExerciseModal={openExerciseModal} />
      <Main>
        <AppRouter />
      </Main>
      <FacialStretch isOpen={isStretchModalOpen} onRequestClose={closeStretchModal} />
      <FacialExercise isOpen={isExerciseModalOpen} onRequestClose={closeExerciseModal} />
      {isHome && <Home_Content />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Container>
        <AppContent />
      </Container>
    </Router>
  );
};

export default App;
