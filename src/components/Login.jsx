// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';

const Login = () => {
    const [idFindText, setIdFindText] = useState("아이디 찾기");
    const [pwFindText, setPwFindText] = useState("비밀번호 찾기");
    const navigate = useNavigate();

    const handleIdClick = () => {
        setIdFindText("아이디 벌써 까먹었어?");
    };

    const handlePwClick = () => {
        setPwFindText("비밀번호 벌써 까먹었어?");
    };

    return (
        <S.LoginContainer>
            <h1>로그인하기</h1>
            <S.InputContainer>
                <input type="text" class='Login_Input' placeholder='아이디를 입력해주세요.' />
                <input type="password" class='Login_Input' placeholder='비밀번호를 입력해주세요.' />
            </S.InputContainer>
            <S.LoginButton>로그인</S.LoginButton>
            <S.Links>
                <p onClick={handlePwClick}>{pwFindText}</p>
                <p onClick={handleIdClick}>{idFindText}</p>
                <p onClick={() => navigate('/Acount')}>회원가입</p>
            </S.Links>
        </S.LoginContainer>
    );
};

export default Login;
