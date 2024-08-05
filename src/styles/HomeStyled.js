import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import F_sad from '../assets/character/f_sad.png'


export const Sectin_Y = styled.section`
  /* margin-bottom: 20px; */
  padding: 10px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFCF0;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: transform 0.2s;
  }
`;

//Home_Title에서 쓰이는 스타일


// Facial_Character_Home 에서 쓰이는 스타일
export const Facial_Character_Home = styled.div`
  width: 100%;
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

export const characterLogin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  img{
    height: 200px;
    width: auto;
    opacity: 0.4;
  }
  h2{
    font-weight: bold;
  }
  p{
    font-size: 18px;
  }
`

//Home_Content에서 쓰이는 스타일
export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
export const FlexCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  #last{
    text-align: left;
    width: 100%;
  }
`
export const GoPhotoBtn = styled.button`
    background-color: black;
    font-size: 16px;
    color: white;
    border-radius: 25px;
    padding: 0 16px;
    height: 40px;

    &:hover{
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
   }
`

export const ComponentName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 1260px) {
    flex-direction: column;  //넓이 감소시 반응형
    align-items: flex-start;
    gap: 2px;

   h2{
    margin: 10px 0 0px 0px;
   }
   p{
    margin: 0 0 5px 0px;
   }
  }

  h2{
    color: var(--, #000);
  /* 디폴트 1 */
    ;
    font-size: 28.5px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  p{
    color: #393939;
  /* 설명 */
  ;
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
    /* height: 80% */
  }
  #illust_box {
    width: 57%;
    /* height: 80%; */
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

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    text-align: justify;
    justify-content: center;
    align-items: flex-start;
    padding: 0 10px 10px 10px;
    p{
      font-size: 18px;
      margin: 4px 0px;
    }
    span{
      font-size: 15px;
    }
    
`

// Tracking_Home 에서 쓰이는 스타일
export const Tracking_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px;
`

export const Blink = styled(NavLink)` //해더, 로그인
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 15px;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  padding: 0.3em;
  color: black;

  &:hover {
    background-color: #E0F8EC;
  }
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
    background-color: #E0F8EC;
  }
`;

// Face_Camera_Home 에서 쓰이는 스타일
export const Face_Camera_Home = styled.div`
  width: 50%;
  text-align: center;
  border-radius: 10px;
  border: 1px solid var(--, #9E9E9E);
`;

export const Camera_illrust = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

///AboutUs_Home에서 쓰이는 스타일
export const AboutUs_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px;
   `

///Magazine_Home 에서 쓰이는 스타일
export const Sectin_G = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 7px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0.5, 0, 0.3);
  border-radius: 10px;
  border: 1px solid var(--, #9E9E9E);
  background: #F4F4F4;
  
  #more{
    display: flex;
    align-items: center;
    text-align: center;
    /* padding-left: 20px; */
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }

`;

export const SecondH2 = styled.h2`
  padding: 10px 0;
`

export const ToMagLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  font-size: 20px;  
  text-decoration: none;
  color: white;
  border-radius: 10px;
  color: black;

  span{
    display: inline-block;
    font-weight: bold;
    padding: 0 4px;
  }
`
export const FakeBtn = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  
  &:hover {
    background-color: #EFFBFB;
    cursor: pointer;
    transform: scale(1.03);
    transition: transform 0.2s;
    border: 1px solid #58D3F7;
  }
`

export const Magazine_Home = styled.div`
   display: flex;
   width: 50%;
   flex-direction: column;
   border-radius: 10px; 
`

export const Example_mag = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
  background: #FFF;
  margin: 0px;
  gap: 6px;

  img{
    padding: 10px;
    width: 35%;
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }

  h3{ 
    text-align: left;
  }
  `
  //HomeAlbum스타일
  export const NoImg = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;  
    justify-content: center;
    background-image: url(${F_sad});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.5;
    padding: 60px 0;
  `

