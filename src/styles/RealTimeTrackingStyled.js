import styled from 'styled-components';

////// 트래킹 리스트페이지 RealTimeTrackingList.jsx 
export const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 20px 20px;
  text-align: center;
  max-width: 1024px;
  font-size: 18px;
  
  #title_bar{
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
    border-bottom: 2px solid #C5C5C5;
  }

  #title_bar2{
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
  }

  .ButtonContainer {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-left: 40px;
  }

  button {
    width: 75%;
    height: 20%;
    font-size: 18px;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 20px;
    color: white;
    background-color: black;
    margin: 10px 20px 20px;
  }

  .explain {
    text-align: left;
    margin-left: 40px;
  }

  .instructions {
    color: white;
    background-color: gray;
    padding: 10px;
    margin: 0;
  }

  #instrucions {
    flex-direction: column;
  }
`;

export const Tracking = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1024px;
  margin: 10px 0px;
`;

export const H2_title = styled.h2`
  color: var(--, #000);
  margin: 0;
  ;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
`

export const SubTitle = styled.div`
  margin: 40px 0px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 10%;
  color: #6D6D6D;

  button {
    margin-top: 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: #6D6D6D;
    align-items: flex-start;
    width: 0;
  }

  #instructions{
    width: 100%;
    border-radius: 10px;
    /* background-color: #FFFCF0 */
    background-color: blueviolet;
  }
`;
///////트레킹 리스트 카드 스타일
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 95%;
  padding: 15px 20px;
  margin: 6px 0;
  border-radius: 6px;
  border: 1px solid #9E9E9E;
  background: #FFFCF0;

  @media (max-width: 1055px) {
    #FlexRow{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    }
}

#FlexRow{
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
  gap: 25px;
}
 
#leftWrapper{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
#rightWrapper{
  text-align: left;
}
 h3 { margin: 10px 0 20px 0; 
    font-weight: 500;
    font-size: 20px;    
}
 h4 {
  margin: 0;

  }
 p{ 
  margin: 0; 
  text-align: left;
}
 .timebox{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0 20px;
 }
 .facialData{
  display: flex;
  gap: 16px;  
 }
`

export const EmotionText = styled.h4`
  color: ${(props) => {
    switch (props.className) {
      case '행복한 표정을 가장 많이 지었어요!':
        return '#FFB700';
      case '슬픔 표정을 가장 많이 지었어요!':
        return '#5EBBFF';
      case '분노 표정을 가장 많이 지었어요!':
        return '#FF9472';
      case '놀람 표정을 가장 많이 지었어요!':
        return '#84DE5A';
      case '무표정을 가장 많이 지었어요!':
        return '#08298A';
      case '두려움 표정을 가장 많이 지었어요!':
        return '#5F04B4';
      case '혐오 표정을 가장 많이 지었어요!':
        return '#8A4B08';
      default:
        return '#000000';
    }
  }};
;`


///////트래킹하기 페이지 RealTimeTracking.jsx 
export const TrackingContainer = styled.div`
  text-align: left;
  width: 100%;

  #title_bar{
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
    border-bottom: 2px solid #C5C5C5;
  }

  #trackingData {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  .dataContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    /* height: 350px; */
  }

  #deledtBTN{
    background-color: #FF7575;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
  }

  .dataContainer h4 {
    padding: 10px 10px;
    margin: 0px;
  }
  .dataContainer p {
    margin: 0px;
    padding: 3px 0;
    width: 100%;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom: 1px solid #ccc;
    background-color: #FFF0B6;
  }

  #videoDeo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 380px;
    background-color: #F1EFF4;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

    .dataContainer2{
      display: flex;
     flex-direction: column;
     align-items: center;
     border-radius: 8px;
     border: 1px solid #9E9E9E;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
     width: 100%;
    }
`;


export const HeadP = styled.p`
    margin: 0px;
    padding: 3px 0;
    width: 100%;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom: 1px solid #ccc;
    background-color: #FFF0B6;
`

export const Sspan = styled.span`
width: 100%;
text-align: left;
padding: 5px;
`
export const FinBtn = styled.button`
font-size: 20px;
color: #FFF;
padding: 6px 20px;
border-radius: 20px;
background: #554E4E;
border: none;
`
export const Data1 = styled.div`
  display: flex;
  flex-wrap: wrap;

  h4{
    padding: 10px;
    margin: 0px;
  }
`

export const H3magin = styled.h3`
  margin: 0px;
  padding: 0px;
  margin-bottom: 15px;
`

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr'; // 0장일 때 1개의 칸
    if (count === 1) return '1fr'; // 1장일 때 1개의 칸
    if (count === 2) return 'repeat(2, 1fr)'; // 2장일 때 2개의 칸
    return 'repeat(4, 1fr)'; // 3장 이상일 때 4개의 칸
  }};
  gap: 10px;
  width: 100%;
  max-width: 1600px;
  min-height: 150px;
  margin: 0px 0 0 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 10; // 모달 창보다 낮게 설정

  @media (max-width: 1385px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  }};
  }

  @media (max-width: 1045px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    return 'repeat(2, 1fr)';
  }};
  }

  @media (max-width: 700px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    return '1fr';
  }};
  }
  `