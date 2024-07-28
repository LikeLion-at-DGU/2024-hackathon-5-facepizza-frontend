// Acount.jsx
import React, { useState } from 'react';
import * as S from '../styles/StyledComponents';

const Acount = () => {
    const [isAgreed, setIsAgreed] = useState(false);

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
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
                <input type="text" placeholder='아이디를 입력해주세요.' />
                <input type="password" placeholder='비밀번호를 입력해주세요.' />
                <input type="password" placeholder='비밀번호를 확인해주세요.' />
                <input type="email" placeholder='이메일을 입력해주세요.' />
            </S.InputContainer>
            <S.SignUpButton disabled={!isAgreed} isAgreed={isAgreed}>
                회원가입
            </S.SignUpButton>
        </S.SignUpContainer>
    );
};

export default Acount;
