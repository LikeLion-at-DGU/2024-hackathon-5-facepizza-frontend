import React, { useState } from "react";
import { CharacterBox } from "../../styles/MypageStyled";
import Profile from "./Profile";
import Gauge from "./Gauge";

const Character = () => {
    const [level, setLevel] = useState('f');
    const [emotion, setEmotion] = useState('무표정');
    const emoticonsrc = `src/assets/character/${level}_${emotion}.png`;
  return (
      <img src= {emoticonsrc} alt="Emotion" id="Character"/>
  );
};

export default Character;
