import React, { useState, useEffect } from "react";
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import F_sad from '../../assets/character/f_sad.png'
import T_disgusted from '../../assets/character/t_disgusted.png'



const Facial_Character = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); //토큰이 존재하면 true값
        console.log(isLoggedIn)
    }, []);

    return (
        <H.Facial_Character_Home>
            <S.Section>
                <S.Blink to="/Mypage" style={{justifyContent: 'center'}}>
                    {isLoggedIn &&

                        <H.characterLogin>
                            <img src={F_sad}/>
                            <div>
                                <h2>아직 준비중인 서비스 입니다</h2>
                                <p>금방 준비해보겠짜렐라 ㅠㅅㅠ</p>
                            </div>
                            <img src={T_disgusted}/>
                        </H.characterLogin>
                    }

                    {!isLoggedIn &&
<>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <h2>내 캐릭터 가꾸기</h2>
                            <div id='content_wrraper'>
                                <div class="cont_box">
                                    <H.Example />
                                </div>
                                <div class="cont_box">
                                    <h3>1살 김치즈</h3>
                                    <H.Example />
                                </div>
                                <div class="cont_box">
                                    <h3>임무</h3>
                                    <H.Example />
                                </div>
                            </div>
                        </div>
                        </>
                    }
                </S.Blink>
            </S.Section>
        </H.Facial_Character_Home>
    );
};

export default Facial_Character;
