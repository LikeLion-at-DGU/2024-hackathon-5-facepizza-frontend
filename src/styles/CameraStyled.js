import styled, { keyframes, css } from 'styled-components';
import smileLogo from '../assets/Logo_happy.png';
import sadLogo from '../assets/Logo_sad.png';
import angryLogo from '../assets/Logo_angry.png';
import supriseLogo from '../assets/Logo_suprise.png';



/////포토스냅모달
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; //창의 위치 인덱스
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vw;
  max-width: 1000px;
  max-height: 690px; /* 반응형 높이 */
  align-items: center;
`;
export const TopBar = styled.div`
  /* padding: 0 15px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px; 
  width: 100%;
  background-color: #f0f0f0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  cursor: move; /* 드래그 가능하도록 커서 변경 */

  button{
  border: none;
  background-color: transparent;
  margin-right: 20px;
  font-size: 20px;
}
`;
export const Feedback = styled.div`
  margin-left: 20px;
  width:90px;
  background-color: black;
  border-radius: 13px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 11px;
`;
export const BottomBar = styled.div`
  height: 80px; 
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 0 0 50px 50px;
`;

export const CaptureButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 33px;
  background-size: cover; /* 필요에 따라 조정 */
  background-color: transparent;
  background-position: center; /* 필요에 따라 조정 */
  border: none;
  cursor: pointer;

  background-image: ${({ emotion }) => {
    switch (emotion) {
      case '행복':
        return `url(${smileLogo})`;
      case '슬픔':
        return `url(${sadLogo})`;
      case '분노':
        return `url(${angryLogo})`;
      case '놀람':
        return `url(${supriseLogo})`;
      default:
        return 'none';
    }
  }};

  &:hover{
    transform: scale(1.03);
    transition: 0.2s;
  }

  color: white;
  font-size: 16px;
`;
export const FourModalContain = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 90vh; */
  width: 60vh;
  margin-bottom: 5vh;
  align-items: center;
`;



//////촬영 효과 
const flashAnimation = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(255, 255, 255, 0.7); }
  100% { background-color: transparent; }
`;

// 깜빡이는 오버레이를 위한 styled div
export const FlashOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 93%;
  border-radius: 30px;
  pointer-events: none;
  z-index: 1000;
  ${props => props.flash && css`
    animation: ${flashAnimation} 0.2s;
  `}
  `;



//////////////포토스냅(모달창 칠드런)
export const Snap_Container = styled.div` /// 카메라 창과 바텀 바를 연결
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 900px;
  justify-content: center;
`
export const CameraView = styled.div`
  flex: 1;
  display: flex;
  width: 75vw;
  /* height: 44vw; */
  max-height: 600px;
  /* background: transparent; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    position: absolute;
    top: 100px;
    color: white;
    margin: 0;
  }
`;

export const FourCutCameraView = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    position: absolute;
    top: 100px;
    color: white;
    margin: 0;
  }
`;
export const FourCutImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  img {
    width: 300px; // 원하는 크기로 설정
    height: auto;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 13vw;
  /* height: 45vw; */
  max-height: 590px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  
  #btn_wapper{
    display: flex;
    flex-direction: column;
  }
`;

export const EmotionButton = styled.button`
  width: 13vw;
  margin: 5px 0;
  padding: 10px;
  color: #FFFFFF;
  background-color: ${({ selected, selectedEmotion }) => {
    if (!selected) return '#554E4E';
    switch (selectedEmotion) {
      case '행복':
        return '#FFCF55'; // 빨강
      case '슬픔':
        return '#5EBBFF'; // 주황
      case '분노':
        return '#FF9472'; // 노랑
      case '놀람':
        return '#84DE5A'; // 초록
      default:
        return '#554E4E'; // 기본값
    }
  }};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Thumbnail = styled.div`
    position: relative;
    width: 10vw;
    bottom: 10px;

  img {
    width: 10vw;
    object-fit: cover;
    height: auto;
    border: 4px solid #8181F7;
    border-radius: 5px;
    }
`
export const Thumbnail_Count = styled.div`
  position: absolute;
  top: -12px;
  right: -21px;
  background-color: #8181F7;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

export const CameraContainer = styled.div`
  display: flex;
  width: 100%;
  height: 45vw; /* 비율에 따른 높이 */
  background-color: white;
  position: relative;
`;


//////////포토스냅 내부 페이지////////////////
export const Main_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  text-align: center;
  
  #title_bar{
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
    border-bottom: 2px solid #C5C5C5;
  }

  .rowBox{
    display: flex;
    width: 100%;
    padding: 20px;
    align-items: flex-start;
  }

  .description{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 40px;
  }

  #descriptionBtn {
    border: none;
    width: 100%;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: #6D6D6D;
    align-items: flex-start;
    width: 0;
  }
  
`
export const LetPhoto = styled.button`
    display: inline-block;
    background-color: #2E2E2E;
    color: #FFFFFF;
    width: 180px;
    padding: 10px 25px;
    border-radius: 20px;
    font-size: 20px;
    border: none;

    &:hover{
       transition: 0.2s;
       transform: scale(1.02);
    }
  `
  export const LetTracking = styled.button`
  display: inline-block;
  background-color: #2E2E2E;
  color: #FFFFFF;
  width: 250px;
  padding: 9px 25px;
  border-radius: 20px;
  font-size: 20px;
`
export const SubTitle = styled.div`
margin: 0px 0px;
display: flex;
align-items: center;
white-space: nowrap;
width: 100%;
/* color: #6D6D6D; */
background-color: #FFF;

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
  padding: 20px;
  white-space: normal;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
ol{
 text-align: left;
}
li{
  line-height: 2em;
  font-size: 20px;
}
p{
  font-size: 20px; 
  font-weight: bold;
  }

  .face_example{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
  }
  
`;
export const IllustInPage = styled.img`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 35vw;
  height: auto;
  min-height: 200px;
  object-fit: cover;
`

/////////PhotoSnanp 사진 고르는 칸
export const SeletPhoto = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0 20px 0;
  #topbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }
  #galleryBtn{
    display: flex;
    padding: 5px 10px;;
    gap: 16px;
  }

  button{
    border: 0px;
    color: #FFFFFF;
    background-color: #6D6D6D;
    padding: 5px 10px;
    border-radius: 5px;

    &:hover{
      background-color: #848484;
  }}
  #save{
    background-color: #FFB700;
  }
`
export const PhotoWrapper = styled.div`
  position: relative;
  height: auto;
  border: 3px solid transparent;

  ${({ isSelected }) => isSelected && css`
    box-shadow: 0 0 0 2px #2E2E2E;
    border-radius: 4px;
  `}

  p{
    margin: 0px;
  }
`;

export const CapturedPhoto = styled.img`
  width: 100%;
  object-fit: cover;
  height: ${props => {
    const count = props.photoCount;
    if (count === 1) return '600px';
    if (count === 2 ) return '350px';
    return '180px';
  }};
`

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr'; // 0장일 때 1개의 칸
    if (count === 1) return '1fr'; // 1장일 때 1개의 칸
    if (count === 2) return 'repeat(2, 1fr)'; // 2장일 때 2개의 칸
    return 'repeat(5, 1fr)'; // 3장 이상일 때 5개의 칸
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

  @media (max-width: 1300px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    return 'repeat(4, 1fr)';
  }};
  }

  @media (max-width: 900px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    return 'repeat(2, 1fr)';
  }};
  }

  @media (max-width: 450px) {
    grid-template-columns: ${props => {
    const count = props.photoCount;
    if (count === 0) return '1fr';
    if (count === 1) return '1fr';
    return '1fr';
  }};
  }

  #zero{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p{
    text-align: center;
    font-size: 20px;
  }

`;

export const FlexRow = styled.div`
display: flex;
flex-direction: row;
`

export const FakeEndBtn = styled.div`
  padding: 4px 20px;
  border-radius: 12px;
  margin: 10px;
  margin-bottom: 30px;

  &:hover{
    cursor: pointer;
    transform: scale(1.01);
    transition: transform 0.2s;
  }
`
