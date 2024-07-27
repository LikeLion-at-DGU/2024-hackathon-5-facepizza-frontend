import React from "react";
import * as S from '../../styles/StyledComponents';


const Facial_Health_Home = () => {
    return (
        <S.Face_Health_Home>
            <S.Section>
                <h2>표정 건강 가꾸기</h2>
                <div id='content_wrraper'>
                    <div class="cont_box">
                        <div class="example"></div>
                        <h3>표정 스트레칭하기</h3>
                    </div>
                    <div class="cont_box">
                        <div class="example"></div>
                        <h3>표정 연습하기</h3>
                    </div>
                    <div class="cont_box">
                        <div class="example"></div>
                        <h3>실시간 표정 트래킹하기</h3>
                    </div>
                </div>
            </S.Section>
        </S.Face_Health_Home>
    );
};

export default Facial_Health_Home;
