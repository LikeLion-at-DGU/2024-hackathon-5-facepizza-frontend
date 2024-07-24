// src/styles/StyledComponents.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  h1 {
    margin: 0 0 10px 0;
  }
`;

export const desc = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: 5px;
    padding-left: 15px;
  `
export const Face_Camera_Home = styled.div`
//Face_Camera_Home에서 사용하는 스타일
  padding: 20px; 
  text-align: center;

  * {
  /* border: 1px solid black; */
  }
  h2{ 
    text-align: start;
    padding-left: 10px;
  }
  h3{ margin: 0;}
  #cont_box {
    display: flex;
    flex-direction: row;
    padding: 0 10px;
    }
  #left_box {
    display: flex;
    flex-direction: row;
    width: 50%;
  }
  #camera_cover {
    height: 70%;
    object-fit: cover;
  }
  #right_box {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  #face_album {
    display: flex;
    flex-direction: row;
    height: 50%;
  }
  #album_cover {
    width: 50%;
    height: 80%;
    object-fit: cover;
  }

  #face_calendar {
    display: flex;
    flex-direction: row;
    background-color: #FFF6E4;
    padding: 30px;
    border-radius: 8px;
  }
  #icon_box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  img {
    height: 50px;
  }
`


export const HeaderContainer = styled.header`
  background-color: ${props => (props.isNotHome ? 'black' : '#FFC42B')};
  color: ${props => (props.isNotHome ? '#FFC42B' : 'black')};
  display: flex;
  flex-direction: row;  
  border-radius: 8px;
  /* background-color: #FFC42B; */
  padding: 10px;
  height: 60px;
`;

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
 
  #Head_Left {
    /* background-color: burlywood; */
    display: flex;
    width: 50%;
    justify-content: space-between;
    padding: 0 1em;
    border-right: 2px solid white;
  }

  #Head_Right {
    /* background-color: skyblue; */
    display: flex;
    width: 50%;
    justify-content: space-between;
    padding: 0 1em;
  }

  .left_box{
    display: flex;
    gap: 1em;
    margin: 0 6px 0 6px;
  }
  .right_box{
    display: flex;
    gap: 1em;
    margin: 0 6px 0 6px;
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
  width: 70%;
  /* height: 50%; */
  border-radius: 8px;
`;

