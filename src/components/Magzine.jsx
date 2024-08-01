import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from '../styles/StyledComponents';
import * as M from '../styles/MagazineStyled';
import { Magajine_data } from "../data/Magajine_data";


const Magzine = () => {

  // Card 컴포넌트 정의
  const Card = ({ post }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`detail/${post.postID}`);
    };

    return (
      <M.CardWrapper onClick={handleClick}>
        <M.Thumbnail src={post.thumbnail} alt={post.title} />
        <M.ContentWrapper>
          <div>
            <M.Title>{post.title}</M.Title>
            <M.Content>{post.content}</M.Content>
          </div>
          <M.Date>{post.createdAt}</M.Date>
          {/* <Post_Footer></Post_Footer> */}
        </M.ContentWrapper>
      </M.CardWrapper>
    );
  };

  return (
    <M.MagContainder>
      <div id="title_bar">
        <S.H2_title> 인사이트 창고 </S.H2_title>
      </div>
      <M.ContentBox>
        {Magajine_data.map((post) => (
          <Card key={post.postID} post={post} />
        ))}
      </M.ContentBox>
    </M.MagContainder>
  );
};

export default Magzine;
