import React from "react";
import { ThinDefault } from "../../styles/MypageStyled";
const AccountDetail = ({user}) => {

  return (
    <div className="AccountDetail">
      <span>
        <ThinDefault className="ThinDefault">이메일</ThinDefault>
        <ThinDefault>{user.email}</ThinDefault>
      </span>
      <span>
        <ThinDefault className="ThinDefault">탄생일</ThinDefault>
        <ThinDefault>{user.date_joined.split('T')[0]}</ThinDefault>
      </span>
    </div>
  );
};

export default AccountDetail;
