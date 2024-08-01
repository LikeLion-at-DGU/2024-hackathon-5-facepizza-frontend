import React from "react";
import "../styles/Mypage.css";
import { Container } from "../styles/StyledComponents";
import { Character, Default, Subname } from "../styles/MypageStyled";

const Mypage = () => {
  return (
    <>
      <Subname>마이페이지</Subname>
      <Container className="Border">
        <Character className="Character">

        </Character>
        <hr/>
      </Container>
    </>
  );
};

export default Mypage;
