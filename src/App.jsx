import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//컴포넌트 파일들 풀러오기 여기부터
import Header from './components/Header';
import AppRouter from './Router';
//컴포넌트 파일들 풀러오기 여기까지
import { Main, Container } from './styles/StyledComponents';

const Title = () => {
  return (
    <Container>
    <h1>Facial Snap!</h1>
    나를 더 건강하게, 나를 더 풍부하게
    </Container>
  )
}

const App = () => {  //함수형 컴포넌트 선언
  return (
    <Container>
    <Router>
        <Title/>
      <Header /> {/*Header 바 컴포넌트*/}
      <Main>  {/*정의된 styled.div*/}
        <AppRouter/>
      </Main>
      {/* <h1>본문내용</h1> */}
    </Router>
    </Container>
  );
};

export default App;
