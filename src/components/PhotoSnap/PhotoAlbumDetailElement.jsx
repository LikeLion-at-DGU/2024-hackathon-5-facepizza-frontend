// PhotoAlbumDetailElement.js
import React from "react";
import { ImageBox } from "../../styles/PhotoAlbumStyle";
import PhotoElement from "./PhotoElement";

const PhotoAlbumDetailEelement = ({ images, onCheckboxChange, onImageClick }) => {
  return (
    <ImageBox
      id="ImageBox"
      style={{
        width: "100%",
        justifyContent: "flex-start",
        gap: "44.5px",
        marginBottom: "41.5px",
        borderRadius: "0px",
      }}
    >
      {images.map((data) => (
        <PhotoElement
          key={data.id}
          data={data}
          onCheckboxChange={onCheckboxChange}
          onClick={onImageClick}
          isDetailPage={true} // 체크박스가 필요함을 나타냄
        />
      ))}
    </ImageBox>
  );
};

export default PhotoAlbumDetailEelement;
