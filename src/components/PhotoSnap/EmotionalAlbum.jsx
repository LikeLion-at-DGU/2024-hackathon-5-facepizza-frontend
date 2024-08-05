// src/components/PhotoSnap/EmotionalAlbum.jsx
import React from "react";
import { EmotionAlbumBox, ImageBox } from "../../styles/PhotoAlbumStyle";
import ImportFace from "./ImportFace";
import { Default } from "../../styles/StyledComponents";
import PhotoElement from "./PhotoElement";

const Interpret = {
  happy: "행복",
  surprised: "놀람",
  angry: "화남",
  sad: "슬픔",
};

const EmotionalAlbum = ({ Emotion, onClick }) => {
  const emoticonsrc = ImportFace[Emotion];
  if (!emoticonsrc) {
    console.error(`Emotion "${Emotion}" is not recognized.`);
    return null;
  }

  // console.log(Emotion);

  return (
    <EmotionAlbumBox id="EmotionAlbumBox" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            paddingRight: "23px",
          }}
        >
          <img
            src={emoticonsrc}
            alt={Emotion}
            style={{
              width: "36.87px",
              height: "36.499px",
              marginRight: "10px",
            }}
          />
          <Default>{Interpret[Emotion]}</Default>
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <ImageBox>
          <PhotoElement Emotion={Emotion} />
        </ImageBox>
      </div>
    </EmotionAlbumBox>
  );
};

export default EmotionalAlbum;
