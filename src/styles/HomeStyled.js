import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Sectin_Y = styled.section`
  margin-bottom: 20px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFCF0;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

export const Sectin_G = styled.section`
  margin-bottom: 20px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #9E9E9E;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

//Home_Title에서 쓰이는 스타일


// Facial_Character_Home 에서 쓰이는 스타일
export const Facial_Character_Home = styled.div`
  /* padding: 20px; */
  h2{
    text-align: start;
    padding-left: 10px;
  }
  h3{
    margin: 0;
  }
  #content_wrraper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .cont_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`
//Home_Content에서 쓰이는 스타일
export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button{
    background-color: black;
    color: white;
    border-radius: 25px;
    width: 115px;
    height: 40px;
  }
`
export const ComponentName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;

  h2{
    color: var(--, #000);
/* 디폴트 1 */
  font-family: IM_Hyemin;
  font-size: 28.5px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  }
  p{
    color: #393939;
  /* 설명 */
  font-family: IM_Hyemin;
  font-size: 23.75px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  }
`
export const Component_Card = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 15px;

  #video_box {
    width: 40%;
    height: 31%
  }
  #illust_box {
    width: 54%;
    height: 31%;
  }
`

export const Child_ComponentName = styled.div`
  display: flex;
  border-bottom: 1px solid #9E9E9E;
`
export const Example = styled.div`
  width: 15vw;
  aspect-ratio: 1 / 1; //가로 세로 비율 1:1
  background-color: lightgray; /* 시각적으로 확인하기 위한 배경색 */
  object-fit: cover;
  `
export const Example100 = styled.div`
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 5.4 / 3.1; //가로 세로 비율 1:1
  background-color: lightgray; /* 시각적으로 확인하기 위한 배경색 */
  object-fit: cover;
`
export const Hlink = styled(NavLink)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  padding: 0.3em;
  color: black;

  &:hover {
    background-color: #ffd966;
  }

  &.active {
    background-color: #FAB400;
  }
`;

export const Description = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

// Tracking_Home 에서 쓰이는 스타일
export const Tracking_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px;
`

// Face_Camera_Home 에서 쓰이는 스타일
export const Face_Camera_Home = styled.div`
   width: 50%;
  text-align: center;
  border-radius: 10px;
  border: 1px solid var(--, #9E9E9E);
`;

///AboutUs_Home에서 쓰이는 스타일
export const AboutUs_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px; 
`

///Magazine_Home 에서 쓰이는 스타일
export const Magazine_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px; 
`