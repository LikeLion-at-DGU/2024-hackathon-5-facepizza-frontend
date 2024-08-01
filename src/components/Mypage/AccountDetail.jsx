import React from "react";
import { ThinDefault } from "../../styles/MypageStyled";
const AccountDetail = () => {
  return (
    <div className="AccountDetail">
      <span>
        <ThinDefault className="ThinDefault">이메일</ThinDefault>
        <ThinDefault>cheese@dgu.ac.kr</ThinDefault>
      </span>
      <span>
        <ThinDefault className="ThinDefault">탄생일</ThinDefault>
        <ThinDefault>2024.06.21</ThinDefault>
      </span>
    </div>
  );
};

export default AccountDetail;
