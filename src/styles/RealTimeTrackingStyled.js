import styled from 'styled-components';

// RealTimeTrackingList.jsx
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
  font-family: IM_Hyemin;
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

// RealTimeTracking.jsx
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

  .dataContainer h3 {
    text-align: center;
    padding: 10px 20px;
    margin: 0px;
  }

  .dataContainer h4 {
    padding: 10px 20px;
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
`;

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
