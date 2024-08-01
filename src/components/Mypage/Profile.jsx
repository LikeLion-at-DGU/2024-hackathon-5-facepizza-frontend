import React from "react";
import { Default, ProfileBox } from "../../styles/MypageStyled";

const Profile = () => {
  return (
    <ProfileBox>
      <Default>1살 김치즈</Default>
      <img src="src\assets\rename.svg" className="rename" />
    </ProfileBox>
  );
};

export default Profile;
