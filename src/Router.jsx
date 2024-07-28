// src/components/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//컴포넌트 파일 임포트
import Header from './components/Header';
import FacialStretch from './components/FacialStretch';
import FacialExercise from './components/FacialExercise';
import RealTimeTracking from './components/RealTimeTracking';
import RealTimeTrackingReport from './components/RealTimeTrackingReport';
import PhotoSnap from './components/PhotoSnap';
import PhotoAlbum from './components/PhotoAlbum';
import FacialChallenge from './components/FacialChallenge';
import About from './components/About';
import Login from './components/Login';
import Acount from './components/Acount';

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<App />} />       */}
      <Route path="/aboutus" element={<About />} />
      <Route path="/stretch" element={<FacialStretch />} />
      <Route path="/exercise" element={<FacialExercise />} />
      <Route path="/tracking" element={<RealTimeTracking />} />
      <Route path="/tracking/report" element={<RealTimeTrackingReport />} />
      <Route path="/snap" element={<PhotoSnap />} />
      <Route path="/album" element={<PhotoAlbum />} />
      <Route path="/challenge" element={<FacialChallenge />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Acount" element={<Acount/>} />
    </Routes>
  );
};

export default AppRouter;
