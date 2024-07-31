// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../styles/StyledComponents';

const Login = () => {
    const [idFindText, setIdFindText] = useState("아이디 찾기");
    const [pwFindText, setPwFindText] = useState("비밀번호 찾기");
    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleIdClick = () => {
        setIdFindText("아이디 벌써 까먹었어?");
    };

    const handlePwClick = () => {
        setPwFindText("비밀번호 벌써 까먹었어?");
    };

    const handleLogin = async () => {
        try {
            //axios를 사용하여 POST 요청을 보냄
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/login', {
                email, 
                password // 요청 바디에 password 추가
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // 로그인 성공 시 응답에서 토큰을 가져와 로컬 스토리지에 저장
            localStorage.setItem('token', response.data.token);
            console.log('로그인 성공:', response.data);

            // 성공적으로 로그인한 후 홈 페이지로 이동
            navigate('/');
        } catch (error) {
            // 로그인 실패 시 오류 메시지 표시
            console.error('로그인 실패:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.error : '로그인 실패');
        }
    };

    return (
        <S.LoginContainer>
            <h1>로그인하기</h1>
            <S.InputContainer>
            <input
                    type="email"
                    class='Login_Input'
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    class='Login_Input'
                    placeholder='비밀번호를 입력해주세요.'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </S.InputContainer>
            <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
            <S.Links>
                <p onClick={handlePwClick}>{pwFindText}</p>
                <p onClick={handleIdClick}>{idFindText}</p>
                <p onClick={() => navigate('/Acount')}>회원가입</p>
            </S.Links>
        </S.LoginContainer>
    );
};

export default Login;
