import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';


const Tracking_Home = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        console.log('토큰:', storedToken);
    }, []);

    return (
        <H.Tracking_Home>
            <H.ComponentName>
                <h2>표정 트래킹하기</h2>
                <p>내 평소 표정을 체크해보세요</p>
            </H.ComponentName>
            <H.Sectin_Y>
                <H.Blink to="/tracking/list">
                    <H.Example />
                    <H.Description>
                        카메라를 통해 내가 평소 짓는 표정의 비율을 체크해볼 수 있는 기능입니다.
                        행복, 놀람, 슬픔 등 다양한 감정이 표정에 드러나는 실시간 비율을 측정해 보세요!
                    </H.Description>
                </H.Blink>
                <H.Child_ComponentName>
                    <h2>최근 트래킹 보러가기</h2>
                </H.Child_ComponentName>
                <p>최근 트래킹1</p>
                <p>최근 트래킹2</p>
                <p>최근 트래킹3</p>
            </H.Sectin_Y>
        </H.Tracking_Home>
    )
}

export default Tracking_Home;