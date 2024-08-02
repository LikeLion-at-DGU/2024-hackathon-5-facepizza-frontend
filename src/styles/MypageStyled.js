import styled from "styled-components";

export const WidthBox = styled.div`
  width: 1620px;
`;
// 캐릭터 정보

export const CharacterBox = styled.div`
  width: 100%;
  height: 346px;
`;

export const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 38px;
  gap: 15px;
`;

//최근 표정 트래킹 비율

export const TrackingBox = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #9e9e9e;
  margin-top: 42.95px;
  padding: 34px 0px;
  .detail {
    margin-left: 57px;
    margin-bottom: 27px;
    display: inline-block;
    gap: 50px;
  }

  .detail div {
    display: flex;
    gap: 50px;
  }
`;

export const DetailContent = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #9e9e9e;
  margin-top: 40px;
`;

export const Account = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #9e9e9e;
  margin-top: 40px;
  background: #f4f4f4;
  padding: 39px 0px;
`;

export const Default = styled.span`
  /* 디폴트 1 */
  color: var(--, #000);
  font-family: IM_Hyemin;
  font-size: 28.5px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ThinDefault = styled.span`
  color: var(--, #000);
  font-family: IM_Hyemin;
  font-size: 28.5px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Explanation = styled.span`
  /* 설명 */
  color: var(--, #000);
  font-family: IM_Hyemin;
  font-size: 23.75px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Subname = styled.div`
  /*부제*/
  color: var(--, #000);
  font-family: IM_Hyemin;
  font-size: 33.25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 42px;
`;

export const Boldsmall = styled.span`
  color: #000;
  font-family: IM_Hyemin;
  font-size: 25.65px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Thinsmall = styled.span`
  color: var(--, #000);
  font-family: IM_Hyemin;
  font-size: 25.65px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BoldTiny = styled.span`
  color: #000;
  font-family: IM_Hyemin;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const BoldBig = styled.span`
  color: #000;
  font-family: IM_Hyemin;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ThinTiny = styled.span`
  color: #6d6d6d;
  font-family: IM_Hyemin;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BaseGauge = styled.div`
  width: 508.25px;
  height: 18.05px;
  flex-shrink: 0;
  border-radius: 19.95px;
  background: #d9d9d9;
`;

export const StyledGauge = styled.div`
  width: ${({ width }) => `${width}%`};
  height: 18.05px;
  border-radius: 19.95px;
  background: #ffcf55;
`;
