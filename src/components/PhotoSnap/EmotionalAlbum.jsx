import React from "react";
import {EmotionAlbumBox} from "../../styles/PhotoAlbumStyle";
import ImportFace from "./ImportFace";

const EmotionalAlbum = ({Emotion}) => {

    const emoticonsrc = ImportFace[Emotion];
    return(
        <EmotionAlbumBox>
            <img src={emoticonsrc} alt="emotion"/>
        </EmotionAlbumBox>
    )
}

export default EmotionalAlbum;