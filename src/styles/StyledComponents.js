// src/styles/StyledComponents.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  h1 {
    margin: 0 0 10px 0;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  background: #FFF;
  padding: 10px;
  /* text-align: center; */

`;

export const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline;
    margin: 0 10px;
  }
`;

export const Main = styled.main`
  padding: 20px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;
