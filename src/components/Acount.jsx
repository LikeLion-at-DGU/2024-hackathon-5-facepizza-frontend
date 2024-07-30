// Acount.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/StyledComponents';

const Acount = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    // const [username, setUsername] = useState(''); //username == 아이디
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setfirstName] = useState(''); //firstName == 닉네임
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const userData = {
            //username,
            first_name: firstName,
            password,
            password2: confirmPassword, // 비밀번호 확인
            email
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                alert('회원가입에 성공했습니다!');
                // 회원가입 성공 후 추가적인 작업을 여기서 수행할 수 있습니다.
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
                    본 서비스를 잘 이용하고, 아껴주고, 사랑 해주고, 어쩌고, 저쩌고,,,,, <br/>
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
                {/* <input 
                    type="text" 
                    placeholder='아이디를 입력해주세요.' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                /> */}
                <input 
                    type="password" 
                    placeholder='비밀번호를 입력해주세요.' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                 <input 
                    type="password" 
                    placeholder='비밀번호를 확인해주세요.' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder='닉네임을 입력해주세요.' 
                    value={firstName} 
                    onChange={(e) => setfirstName(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder='이메일을 입력해주세요.' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </S.InputContainer>
            <S.SignUpButton disabled={!isAgreed} isAgreed={isAgreed} onClick={handleSignUp}>
                회원가입
            </S.SignUpButton>
        </S.SignUpContainer>
    );
};

export default Acount;
