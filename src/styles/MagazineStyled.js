import styled from "styled-components";

//Magazine 에서 쓰이는 스타일
export const MagContainder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 20px 20px;
  text-align: center;
  
  #title_bar{
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
    border-bottom: 2px solid #C5C5C5;
  }
`
export const ContentBox = styled.div`
 display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 30px 0px;
  gap: 20px;
  max-width: 1024px;
  /* margin: 20px; */

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 770px) {
    grid-template-columns: 1fr;
  }
`

export const CardWrapper = styled.div`
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;
export const Thumbnail = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  object-position: 50%;
`;
export const ContentWrapper = styled.div`
  margin: 20px;
  padding: 0px;
  display: flex;
  height: 165px;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;
export const Title = styled.h3`
  margin: 0 0 10px 0;
  text-align: left;
  font-size: 1em;
  color: #333;
`;
export const Content = styled.p`
  margin: 0;  
  text-align: justify;
  color: #666;
`;

export const Date = styled.div`
  width: 100%;
  text-align: right;;
`

/////////////MagzineDtail.jsx 스타일
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 800px;
  }
  h3{
    width: 100%;
    text-align: LEFT;
    padding-top: 20px;
    margin: 20PX 0;
  }
  p{
    margin: 20px 0;
    line-height: 2em;
    text-align: left;
  }
  span{
    background-color: #2E2E2E;
    line-height: 2em;
    white-space: nowrap;
    color: white;
  }
`

export const Head_Wrapper = styled.div `
  margin: 15px 0 60px 0;
`
export const Info_bar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 10px 0;
`
export const HashTag = styled.div `
  display: flex;
  align-items: flex-start;
`
export const HT = styled.div`
    margin-bottom: 0.875rem;
    background: #E9ECEF;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    border-radius: 1rem;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.875rem;
    color: #12B886;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
`