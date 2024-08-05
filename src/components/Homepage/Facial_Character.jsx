import React, { useState, useEffect } from "react";
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import * as C from '../../styles/CameraStyled';
import F_sad from '../../assets/character/f_sad.png'
import T_disgusted from '../../assets/character/t_disgusted.png'
import f_surprised from '../../assets/character/f_surprised.png'
import ExpBar from '../../assets/ExpBar.png';



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
                <S.Blink to="/Mypage" style={{ justifyContent: 'center' }}>
                    {isLoggedIn &&

                        <H.characterLogin>
                            <img src={F_sad} />
                            <div>
                                <h2>아직 준비중인 서비스 입니다</h2>
                                <p>금방 준비해보겠짜렐라 ㅠㅅㅠ</p>
                            </div>
                            <img src={T_disgusted} />
                        </H.characterLogin>
                    }

                    {!isLoggedIn &&

                        <H.characterLogin>
                            <img src={f_surprised} />
                            <div id='itembox'>
                                <h2>1살 김치즈</h2>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <img id='expbar' src={ExpBar} />
                                    
                                </div>
                                <p><b>"너 왜이리 딱딱해?"</b></p>
                                <span>그러고보니 원래 나는 풍부한 치즈였어..!<br />
                                    딱딱하게 굳어버린 냉동치즈의 표정을 녹여주세요!
                                </span>
                            </div>
                            <div id="loginbox">
                            로그인하고 <br/>치즈를 성장시켜 보세요!
                            <H.Blink to='/Login'>
                            <button>1분만에 로그인/회원가입 하기</button>
                            </H.Blink>
                            </div>
                        </H.characterLogin>
                    }
                </S.Blink>
            </S.Section>
        </H.Facial_Character_Home>
    );
};

export default Facial_Character;
