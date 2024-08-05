import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';
import check from '../assets/Icon_check.png';
import { API } from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    const [passwordVisible, setPasswordVisible] = useState(false);
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
            <h1 style={{margin: '0'}}>회원가입하기</h1>
            <S.InputContainer style={{marginBottom: '0px'}}>
                <h3>서비스 이용약관</h3>
                <div className="terms-content">
                    <h2>카메라 사용 동의 약관</h2>
                    <h3>제 1 조 (목적)</h3>
                    <p>이 약관은 [회사명] (이하 "회사"라 합니다)에서 제공하는 [서비스명] (이하 "서비스"라 합니다) 이용 시 카메라 사용에 대한 동의 및 관련 사항을 규정함을 목적으로 합니다.</p>

                    <h3>제 2 조 (카메라 사용 목적)</h3>
                    <p>회사는 사용자의 얼굴 표정을 인식하고 분석하기 위해 카메라를 사용합니다. 이 과정에서 수집되는 정보는 서비스의 개선 및 사용자 맞춤형 기능 제공을 위한 목적으로만 사용됩니다.</p>

                    <h3>제 3 조 (정보 수집 및 처리)</h3>
                    <ol>
                        <li>회사는 사용자의 얼굴 표정 인식 데이터를 수집하고 처리하며, 이 데이터는 [데이터 처리 방침]에 명시된 바에 따라 안전하게 관리됩니다.</li>
                        <li>수집된 데이터는 서비스 제공 및 개선을 위해 필요한 경우에만 사용되며, 법적으로 요구되는 경우를 제외하고 제3자에게 제공되지 않습니다.</li>
                    </ol>

                    <h3>제 4 조 (정보 보호 및 보안)</h3>
                    <p>회사는 사용자의 개인정보 및 카메라를 통해 수집된 데이터를 안전하게 보호하며, 데이터의 무단 접근 및 유출을 방지하기 위해 필요한 보안 조치를 취합니다.</p>

                    <h3>제 5조 (중요)</h3>
                    <p>본 서비스를 아껴줄 것을 다짐합니다.</p>
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
                <S.Left_align style={{ position: 'relative' }}>
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
                        type={passwordVisible ? "text" : "password"}
                        placeholder="8자 이상 영문자, 숫자 포함"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        style={{ position: 'absolute', right: 18, top: 303, cursor: 'pointer', color: 'balck', fontSize: '22px' }}
                    >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    <S.Password_Ck>
                        <p>4. 비밀번호를 확인해주세요</p>
                        <S.CheckIcon
                            isPasswordMatch={isPasswordMatch}
                            isPasswordValid={isPasswordValid}
                            src={check}
                        />
                    </S.Password_Ck>
                    <input
                        type={passwordVisible ? "text" : "password"}
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
