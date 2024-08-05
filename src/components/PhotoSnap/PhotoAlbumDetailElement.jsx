import React from "react";
import { ImageBox } from "../../styles/PhotoAlbumStyle";
import PhotoElement from "./PhotoElement";

const PhotoAlbumDetailEelement = ({emotion}) => {


    
  return (
    <ImageBox
    id="ImageBox"
      style={{
        width: "100%",
        justifyContent: "flex-start",
        gap: "44.5px",
        marginBottom: "41.5px",
      }}
    >
      <PhotoElement Emotion={emotion}/>
    </ImageBox>
  );
};

export default PhotoAlbumDetailEelement;
