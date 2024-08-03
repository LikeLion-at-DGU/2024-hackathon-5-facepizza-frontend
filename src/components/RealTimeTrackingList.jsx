import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../styles/StyledComponents';
import * as C from '../styles/CameraStyled';
import * as M from '../styles/RealTimeTrackingStyled';

const RealTimeTrackingList = () => {
  const videoRef = useRef(null);
  const [trackingReports, setTrackingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExplainOpen, setIsExplainOpen] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => { setIsExplainOpen(!isExplainOpen); }

  useEffect(() => {
    const fetchTrackingReports = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/report');
        setTrackingReports(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingReports();
  }, []);

  const VideoComponent = ({ videoRef }) => {
    useEffect(() => {
      if (!videoRef || !videoRef.current) {
        console.log("videoRef가 전달되지 않았습니다.");
        return;
      }

      const startVideo = () => {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          })
          .catch((err) => console.log("비디오 스트림 접근 오류: ", err));
      };

      startVideo();
    }, [videoRef]);

    return (
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: '100%',
          objectFit: 'cover',
          maxHeight: '100%',
          transform: 'rotateY(180deg)',
          margin: '10px 0 10px 0'
        }}
      />
    );
  };  // 비디오


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <C.Main_Container>
      <div id='title_bar'>
        <S.H2_title>표정 트래킹하기</S.H2_title>
      </div>
      <div class='box'>
        <div className='CameraContainer' style={{ width: '80%', height: '25vh' }}>
          <VideoComponent videoRef={videoRef} />
        </div>
        <div class='description'>   {/* 설명박스 (새로)*/}
          <C.LetTracking onClick={() => navigate('/tracking')}>표정 트래킹 진행하기</C.LetTracking>
          <p style={{ textAlign: 'left', paddingLeft: '7px' }}>표정 트래킹이란?</p>
        </div>
      </div>

      <div class='description' style={{margin: '20px 0'}} > {/* 설명박스 (새로)*/}
        <div id='title_bar' style={{ borderBottom: 'none' }}>
          <S.H2_title style={{ color: '#6D6D6D' }}>표정 트래킹 이용방법</S.H2_title>
          <button id="descriptionBtn" onClick={handleToggle}>
            {isExplainOpen ? '▲' : '▼'}
          </button>
        </div>

        <C.SubTitle>
          <div id='instructions' style={{ display: isExplainOpen ? 'block' : 'none' }}>
            <ol>
              <li>버튼을 누르면 팝업창이 켜지며 웹캠으로 작동됩니다</li>
              <li>우측 패널에서 찍고 싶은 감정을 선택해주세요</li>
              <li>'치즈'의 학습모델이 표정을 인식하면 자동으로 사진이 찍혀요,  찰칵~!</li>
              <li>다 찍은 뒤 저장할 사진을 선택할 수 있어요 : )</li>
              <p>치즈 스냅을 찍으며 몰랐던 나의 다양한 표정을 기록해봐요!</p>
            </ol>
          </div>
        </C.SubTitle>
      </div>

      <div id='title_bar' style={{margin: '20px 0'}}>
        <S.H2_title>표정 트래킹 기록</S.H2_title>
      </div>


      <ul>
        {trackingReports.map((report) => (
          <li key={report.id}>
            <h3>{report.title}</h3>
            <p>시작 시간: {new Date(report.created_at).toLocaleString()}</p>
            <p>종료 시간: {new Date(report.ended_at).toLocaleString()}</p>
            <div>
              <h4>감정 비율:</h4>
              <p>행복: {report.happy}%</p>
              <p>슬픔: {report.sad}%</p>
              <p>화남: {report.angry}%</p>
              <p>놀람: {report.surprised}%</p>
              <p>혐오: {report.disgusted}%</p>
              <p>두려움: {report.fearful}%</p>
              <p>중립: {report.neutral}%</p>
            </div>
            <div>
              <h4>하이라이트 이미지:</h4>
              {report.happy_highlight && (
                <div>
                  <h5>행복</h5>
                  <img src={report.happy_highlight} alt="happy" width="200" />
                </div>
              )}
              {report.sad_highlight && (
                <div>
                  <h5>슬픔</h5>
                  <img src={report.sad_highlight} alt="sad" width="200" />
                </div>
              )}
              {report.angry_highlight && (
                <div>
                  <h5>화남</h5>
                  <img src={report.angry_highlight} alt="angry" width="200" />
                </div>
              )}
              {report.surprised_highlight && (
                <div>
                  <h5>놀람</h5>
                  <img src={report.surprised_highlight} alt="surprised" width="200" />
                </div>
              )}
              {report.disgusted_highlight && (
                <div>
                  <h5>혐오</h5>
                  <img src={report.disgusted_highlight} alt="disgusted" width="200" />
                </div>
              )}
              {report.fearful_highlight && (
                <div>
                  <h5>두려움</h5>
                  <img src={report.fearful_highlight} alt="fearful" width="200" />
                </div>
              )}
              {report.neutral_highlight && (
                <div>
                  <h5>중립</h5>
                  <img src={report.neutral_highlight} alt="neutral" width="200" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </C.Main_Container>
  );
};

export default RealTimeTrackingList;