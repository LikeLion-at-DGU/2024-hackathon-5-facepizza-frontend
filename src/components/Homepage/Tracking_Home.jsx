import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import illust_Tracking from '../../assets/illustration/illust_Tracking.png'
import { NavLink } from "react-router-dom";


const Tracking_Home = ({sectionHeight }) => {
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
            <H.Sectin_Y > {/* style={{ height: sectionHeight }} */}
            <NavLink to='/tracking/list' style={{textDecoration: 'none'}}>
                <H.Blink to="/tracking/list">
                    <H.Camera_illrust src={illust_Tracking} />
                    <H.Description style={{padding: '13px 0 0px 0'}}>
                        <b>나는 평소에 어떤 표정일까?</b>
                        카메라를 통해 내가 평소 짓는 표정을 실제 비율로 체크할 수 있습니다.
                    </H.Description>
                </H.Blink>
                {/* <H.FlexRow style={{ padding: '15px 6px 10px 6px' }}>
                    <NavLink to='/tracking'>
                        <H.GoPhotoBtn >표정 트래킹하기</H.GoPhotoBtn>
                    </NavLink>
                    <NavLink to='/tracking/list'>
                        <H.GoPhotoBtn style={{ backgroundColor: '#565656' }}>기록 보기</H.GoPhotoBtn>
                    </NavLink>
                </H.FlexRow> */}
                </NavLink>
            </H.Sectin_Y>
        </H.Tracking_Home>
    )
}

export default Tracking_Home;