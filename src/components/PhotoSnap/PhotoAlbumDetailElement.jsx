import React from "react";
import { ImageBox } from "../../styles/PhotoAlbumStyle";
import PhotoElement from "./PhotoElement";

const PhotoAlbumDetailEelement = ({images}) => {


    
  return (
    <ImageBox
    id="ImageBox"
      style={{
        width: "100%",
        justifyContent: "flex-start",
        gap: "44.5px",
        marginBottom: "41.5px",
        borderRadius: "0px"
      }}
    >
      {
        images.map(data =>
          <PhotoElement key={data.id} data={data} />
        )
      }
    </ImageBox>
  );
};

export default PhotoAlbumDetailEelement;
