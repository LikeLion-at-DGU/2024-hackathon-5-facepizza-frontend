// src/components/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//컴포넌트 파일 임포트
import Header from './components/Header';
import RealTimeTracking from './components/RealTimeTracking';
import RealTimeTrackingReport from './components/RealTimeTrackingReport';
import RealTimeTrackingList from './components/RealTimeTrackingList';
import PhotoSnap from './components/PhotoSnap/PhotoSnap';
import PhotoAlbum from './components/PhotoSnap/PhotoAlbum';
import About from './components/About';
import Login from './components/Login';
import Acount from './components/Acount';
import Mypage from './components/Mypage';
import Magzine from './components/Magzine';
import MagzineDetail from './components/MagzineDetail';

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<App />} />       */}
      <Route path="/aboutus" element={<About />} />
      <Route path="/tracking" element={<RealTimeTracking />} />
      <Route path="/tracking/report" element={<RealTimeTrackingReport />} />
      <Route path="/tracking/list" element={<RealTimeTrackingList />} />
      <Route path="/snap" element={<PhotoSnap />} />
      <Route path="/album" element={<PhotoAlbum />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Acount" element={<Acount/>} />
      <Route path="/Mypage" element={<Mypage/>} />
      <Route path="/Magzine" element={<Magzine/>} />  
      <Route path="/Magzine/detail/:postID" element={<MagzineDetail />} />    
    </Routes>
  );
};

export default AppRouter;

