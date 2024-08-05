import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';
import check from '../assets/Icon_check.png';
import { API } from '../api';

const Account = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordMatch(newPassword === confirmPassword);
        setIsPasswordValid(newPassword.length >= 8 && /[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword));
        console.log('isPasswordMatch:', isPasswordMatch);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsPasswordMatch(password === newConfirmPassword);
        console.log('isPasswordMatch:', isPasswordMatch);
    };

    useEffect(() => {
        const isEmailValid = email.includes('@');
        const isNameValid = name.trim().length > 0;

        setIsFormValid(isAgreed && isNameValid && isEmailValid && isPasswordValid && isPasswordMatch);
    }, [isAgreed, name, email, password, confirmPassword, isPasswordMatch]);

    useEffect(() => {
        console.log('isFormValid:', isFormValid);
    }, [isFormValid]);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const userData = {
            first_name: name,
            password,
            password2: confirmPassword, // 비밀번호 확인
            email
        };

        try {
            const response = await API.post('/api/accounts/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                alert('회원가입에 성공했습니다!');
                navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
            } else {
                alert(`회원가입에 실패했습니다: ${response.data.message}`);
            }
        } catch (error) {
            alert(`회원가입 중 오류가 발생했습니다: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <S.SignUpContainer>
            <h1>회원가입하기</h1>
            <S.InputContainer>
                <h3>서비스 이용약관</h3>
                <div className="terms-content">
                    본 서비스를 잘 이용하고, 아껴주고, 사랑 해주고, 어쩌고, 저쩌고,,,,, <br />
                    할 것을 약속합니다.
                </div>
                <div id="agree_box">
                    <input 
                        type="checkbox" 
                        id="agree" 
                        checked={isAgreed} 
                        onChange={handleCheckboxChange} 
                    />
                    <label htmlFor="agree"> 동의하기</label>
                </div>
            </S.InputContainer>
            <S.InputContainer>
                <S.Left_align>
                    <p>1. 이름을 입력해주세요.</p>
                    <input 
                        type="text" 
                        placeholder="이름" 
                        value={name}
                        onChange={handleNameChange} 
                    />
                    <p>2. 이메일을 입력해주세요</p>
                    <input 
                        type="email" 
                        placeholder="이메일" 
                        value={email}
                        onChange={handleEmailChange} 
                    />
                    <p>3. 비밀번호를 입력해주세요.</p>
                    <input 
                        type="password" 
                        placeholder="8자 이상 영문자, 숫자 포함" 
                        value={password}
                        onChange={handlePasswordChange} 
                    />
                    <S.Password_Ck>
                        <p>4. 비밀번호를 확인해주세요</p>
                        <S.CheckIcon 
                            isPasswordMatch={isPasswordMatch} 
                            isPasswordValid={isPasswordValid} 
                            src={check} 
                        />
                    </S.Password_Ck>
                    <input 
                        type="password" 
                        placeholder="비밀번호를 다시 입력해주세요" 
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange} 
                    />
                </S.Left_align>
            </S.InputContainer>
            <S.SignUpButton 
                disabled={!isFormValid} 
                isAgreed={isAgreed}
                onClick={handleSignUp}
            >
                회원가입
            </S.SignUpButton>
            {error && <p>{error}</p>}
        </S.SignUpContainer>
    );
};

export default Account;
