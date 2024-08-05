import React from "react";
import { useParams } from "react-router-dom";
import ImportFace from "./PhotoSnap/ImportFace";
import { Default } from "../styles/StyledComponents";
import { ImageBox } from "../styles/PhotoAlbumStyle";
import PhotoElement from "./PhotoSnap/PhotoElement";
import "../styles/PhotoAlbumDetail.css";
import PhotoAlbumDetailEelement from "./PhotoSnap/PhotoAlbumDetailElement";

const Interpret = {
  happy: "행복",
  surprised: "놀람",
  angry: "화남",
  sad: "슬픔",
};

const PhotoAlbumDetail = () => {
  const { emotion } = useParams();
  const emoticonsrc = ImportFace[emotion];

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: "10px",
          justifyContent: "flex-start",
          borderBottom: "1px solid #C5C5C5",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex",
          }}
        >
          <img
            src={emoticonsrc}
            alt={emotion}
            style={{
              width: "36.87px",
              height: "36.499px",
              marginRight: "10px",
            }}
          />
          <Default>{Interpret[emotion]}</Default>
        </div>
      </div>
      <PhotoAlbumDetailEelement/>
      <PhotoAlbumDetailEelement/>
    </>
  );
};

export default PhotoAlbumDetail;
