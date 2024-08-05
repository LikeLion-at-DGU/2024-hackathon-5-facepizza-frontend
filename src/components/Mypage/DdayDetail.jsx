import React, { useEffect, useState } from "react";
import { Default, Explanation, ThinTiny } from "../../styles/MypageStyled";
import { API } from '../../api';

const DdayDetail = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옵니다.
        setToken(token);
        //console.log("Token:", token); // 토큰 값 확인용 콘솔 로그 추가
        const response = await API.get(
          "/api/characters/tracking-time",
          {
            headers: {
              Authorization: `Token ${token}`, // 인증 헤더에 토큰을 추가합니다.
            },
          }
        );
        
        console.log("User data response:", response); // 응답 확인용 콘솔 로그 추가
        setResponse(response.data); // response.data만 설정합니다.
        if (response.data.id) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div style={{display: "inline-block"}}>
      <div className="DdayDetail">
        
        <Explanation>이만큼 성장했어요!</Explanation>
        <br />
        <Default id="Point">
          오늘 하루 얻은 경험치 <span style={{ color: "#FFB700" }}>15P</span>
        </Default>
        <div id="OtherExpression">
          <Explanation>오늘 어떤 표정을 가장 많이 지었을까요?</Explanation>
          <Default style={{ color: "#FFB700" }}>행복 45%</Default>
          <Explanation>
            <div style={{gap:"15px;"}}>
              <div className="OtherExpression">
                <span>놀람 15%</span>
                <span>무표정 33%</span>
                <span>혐오 33%</span>
              </div>
              <div className="OtherExpression">
                <span>분노 33%</span>
                <span>슬픔 33%</span>
                <span>분노 33%</span>
              </div>
            </div>
          </Explanation>
          <ThinTiny>표정 트래킹과 표정 스냅에서 측정된 모든 표정을 합산한 결과입니다.</ThinTiny>
        </div>
      </div>
    </div>
  );
};
export default DdayDetail;
