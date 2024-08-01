//MagzineDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Magajine_data } from "../data/Magajine_data";
import * as M from '../styles/MagazineStyled';
import styled from "styled-components";

function MagzineDetail() {
  const postID = useParams().postID;
  const post_content = Magajine_data.find(p => p.postID === parseInt(postID));

  return (
    <M.Container>
      <div class="box">
        <M.Head_Wrapper>
          <h1>{post_content.title}</h1>
          <M.Info_bar>
            <div>
              <b>{post_content.writer}</b> · {post_content.createdAt}
            </div>
          </M.Info_bar>
          {/* <M.HashTag>
            <M.HT>React</M.HT>
            <M.HT>TanStack</M.HT>
            <M.HT>작성중</M.HT>
          </M.HashTag> */}
        </M.Head_Wrapper>
        <div class="box">
          {/* {post_content.content}  */}
          <div dangerouslySetInnerHTML={{ __html: post_content.content_html }} />
        </div>
      </div>
    </M.Container>
  );
}

export default MagzineDetail;
