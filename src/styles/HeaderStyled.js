import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Header에서 쓰이는 스타일
export const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
  height: 60px;
`;

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  #center_box{
    display: flex;
    justify-content: center;
    width: 60%;
    gap: 1em;
  }
`;

export const Logo = styled.img`
  width: 80px;
  height: auto;
  margin: 0px 0 5px 0;
  margin-left: auto;
  margin-right: auto
`

export const Hlink = styled(NavLink)`
  display: flex;
  text-align: center;
  text-decoration: none;
  font-family: Inter;
  font-size: 26px;
  border-bottom: ${(props) => (props.active ? '4px solid black' : 'none')};
  color: ${(props) => (props.active ? 'black' : '#6D6D6D')};
  padding-bottom: 0.2em;

  &:hover {
    color: black;
  }

  &.active {
    /* background-color: #FAB400; */
  }
`;