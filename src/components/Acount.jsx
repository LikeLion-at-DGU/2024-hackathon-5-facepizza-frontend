import React, { useState, useEffect } from 'react';
import * as S from '../styles/StyledComponents';
import check from '../assets/Icon_check.png';

const Account = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

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

        // console.log('isAgreed:', isAgreed);
        // console.log('isNameValid:', isNameValid);
        // console.log('isEmailValid:', isEmailValid);
        // console.log('isPasswordValid:', isPasswordValid);
        // console.log('isPasswordMatch:', isPasswordMatch);

        setIsFormValid(isAgreed && isNameValid && isEmailValid && isPasswordValid && isPasswordMatch);
    }, [isAgreed, name, email, password, confirmPassword, isPasswordMatch]);

    useEffect(() => {
        console.log('isFormValid:', isFormValid);
    }, [isFormValid]);

    return (
        <S.SignUpContainer>
            <h1>회원가입하기</h1>
            <S.InputContainer>
                <h3>서비스 이용약관</h3>
                <div className="terms-content">
                    본 서비스를 잘 이용하고, 아껴주고, 사랑 해주고, 어쩌고, 저쩌고,,,,,
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
                    <input type="text" placeholder="이름" onChange={handleNameChange} />
                    <p>2. 이메일을 입력해주세요</p>
                    <input type="email" placeholder="이메일" onChange={handleEmailChange} />
                    <p>3. 비밀번호를 입력해주세요.</p>
                    <input type="password" placeholder="8자 이상 영문자, 숫자 포함" onChange={handlePasswordChange} />
                    <S.Password_Ck>
                        <p>4. 비밀번호를 확인해주세요</p>
                        <S.CheckIcon isPasswordMatch={isPasswordMatch} isPasswordValid={isPasswordValid} src={check} />
                    </S.Password_Ck>
                    <input type="password" placeholder="비밀번호를 다시 입력해주세요" onChange={handleConfirmPasswordChange} />
                </S.Left_align>
            </S.InputContainer>
            <S.SignUpButton disabled={!isFormValid} $isAgreed={isAgreed}>
                회원가입
            </S.SignUpButton>
        </S.SignUpContainer>
    );
};

export default Account;
