import React from "react";
import { BoldBig } from "../../styles/MypageStyled";
import AttendanceBlock from "./AttendanceBlock";

const Attendence = () => {
  return (
    <div>
      <div className="Attendence">
        <div>
          <BoldBig>출석</BoldBig>
          <AttendanceBlock></AttendanceBlock>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
