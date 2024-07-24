//src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//컴포넌트 파일들 풀러오기 여기부터
import Header from './components/Header';
import AppRouter from './Router';
import Facial_Health_Home from './components/Homepage/Facial_Health_Home';
import Face_Camera_Home from './components/Homepage/Face_Camera_Home';
import FacialStretch from './components/FacialStretch';
// 스타일 컴포넌트 불러오기
import { Main, Container } from './styles/StyledComponents';

const Title = () => { //Title
  return (
    <Container>
      <h1>Facial Snap!</h1>
      나를 더 건강하게, 나를 더 풍부하게
    </Container>
  );
}

const App = () => {  //함수형 컴포넌트 선언
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <Container>
        <Router>
          <Title />
          <Header openModal = {openModal} /> {/*Header 바 컴포넌트*/}
          <Main>  {/*정의된 styled.div*/}
            <AppRouter />
          </Main>
          <FacialStretch isOpen={isModalOpen} onRequestClose={closeModal} />
          <Facial_Health_Home />
          <Face_Camera_Home />
        </Router>
      </Container>
  );
};

export default App;