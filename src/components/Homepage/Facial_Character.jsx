import React from "react";
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';


const Facial_Character = () => {
    return (
        <H.Facial_Character_Home>
            <S.Section>
                <h2>내 키릭터 가꾸기</h2>
                <div id='content_wrraper'>
                    <div class="cont_box">
                        <H.Example/>
                    </div>
                    <div class="cont_box">
                        <h3>1살 김치즈</h3>
                        <H.Example/>
                    </div>
                    <div class="cont_box">
                        <h3>임무</h3>
                        <H.Example/>
                    </div>
                </div>
            </S.Section>
        </H.Facial_Character_Home>
    );
};

export default Facial_Character;