import React, { useState, useRef, useEffect } from "react";
import { Default, ProfileBox } from "../../styles/MypageStyled";

const Profile = () => {
  const [age, setAge] = useState(1);
  const [name, setName] = useState("김치즈");
  const [newName, setNewName] = useState("김치즈");
  const [isEditing, setIsEditing] = useState(false); // 입력 필드 활성화 상태
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`; // 입력 필드의 너비 조정
    }
  }, [newName]); // newName이 변경될 때마다 실행

  // 입력 필드의 값 변경 시 호출되는 함수
  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  // 이미지 클릭 시 이름 변경 및 입력 필드 비활성화
  const changeName = () => {
    if (newName.trim()) {
      setName(newName);
      setNewName(""); // 이름 변경 후 입력 필드 초기화
      setIsEditing(false); // 입력 필드 비활성화
    }
  };

  // 이미지 클릭 시 입력 필드 활성화 및 포커스 설정
  const handleImageClick = () => {
    setIsEditing(true);
    inputRef.current.focus(); // 입력 필드에 포커스 설정
  };

  // 포커스 시 커서를 맨 뒤로 이동시키는 함수
  const handleFocus = () => {
    const input = inputRef.current;
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  return (
    <ProfileBox>
      <Default>
        {age}살
        <input
          type="text"
          placeholder="New Nickname"
          onChange={handleInputChange}
          value={newName}
          className="inputName"
          ref={inputRef}
          disabled={!isEditing} // isEditing 상태에 따라 입력 필드 비활성화
          onFocus={handleFocus} // 포커스 시 커서를 맨 뒤로 이동
          maxLength={10}
        />
      </Default>
      <img
        src="src/assets/rename.svg"
        className="rename"
        alt="Rename Icon"
        onClick={handleImageClick} // 이미지 클릭 시 handleImageClick 호출
      />
    </ProfileBox>
  );
};

export default Profile;
