// src/components/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//컴포넌트 파일 임포트
import Header from './components/Header';
import RealTimeTracking from './components/TrackingPage/RealTimeTracking';
import RealTimeTrackingReport from './components/TrackingPage/RealTimeTrackingReport';
import RealTimeTrackingList from './components/TrackingPage/RealTimeTrackingList';
import TrackingReportDetail from './components/TrackingPage/TrackingReportDetail';
import PhotoSnap from './components/PhotoSnap/PhotoSnap';
import FourCutSnap from './components/PhotoSnap/FourCutSnap';
import PhotoAlbum from './components/PhotoSnap/PhotoAlbum';
import PhotoAlbumDetail from './components/PhotoAlbumDetail';
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
      <Route path="/tracking/report/:reportid" element={<TrackingReportDetail />}/>
      <Route path="/snap" element={<PhotoSnap />} />
      <Route path="/snap/FourCut" element={<FourCutSnap />} />
      <Route path="/album" element={<PhotoAlbum />} />
      <Route path="/album/:emotion" element={<PhotoAlbumDetail/>}/>
      <Route path="/Login" element={<Login/>} />
      <Route path="/Acount" element={<Acount/>} />
      <Route path="/Mypage" element={<Mypage/>} />
      <Route path="/Magzine" element={<Magzine/>} />  
      <Route path="/Magzine/detail/:postID" element={<MagzineDetail />} />    
    </Routes>
  );
};

export default AppRouter;