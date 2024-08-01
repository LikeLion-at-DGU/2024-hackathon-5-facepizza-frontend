import React from 'react';
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import Facial_Character from './Facial_Character';
import Face_Camera_Home from './Face_Camera_Home';
import Tracking_Home from './Tracking_Home';
import Magazine_Home from './Magazine_Home';
import AboutUs_Home from './AboutUs_Home';


const Home_Content = () => {
  return (
    <>
      <Facial_Character />
      <H.FlexRow>
        <Tracking_Home />
        <Face_Camera_Home />
      </H.FlexRow>
      <H.FlexRow>
        <Magazine_Home/>
        <AboutUs_Home/>
      </H.FlexRow>
    </>
  );
};

export default Home_Content;
