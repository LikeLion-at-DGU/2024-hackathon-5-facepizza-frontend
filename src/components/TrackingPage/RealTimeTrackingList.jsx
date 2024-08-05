import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styles/StyledComponents';
import * as C from '../../styles/CameraStyled';
import TrackingReportcard from './TrackingReportcard';

import face_suprise from '../../assets/face/face_suprise.png';
import face_smail from '../../assets/face/face_smail.png';
import face_sad from '../../assets/face/face_sad.png';
import face_natural from '../../assets/face/face_natural.png';
import face_fear from '../../assets/face/face_fear.png';
import face_disgusting from '../../assets/face/face_disgusting.png';
import face_angry from '../../assets/face/face_angry.png';

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
        const token = localStorage.getItem('token'); // 토큰을 가져옵니다
        if (token != null) {
          const response = await axios.get('http://127.0.0.1:8000/api/report', {
            headers: {
              Authorization: `Token ${token}` // 헤더에 인증 토큰을 추가합니다
            }
          });
          setTrackingReports(response.data);
        }
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
          width: "30%",
          height: '100%',
          maxHeight: '280px',
          maxWidth: '374px',
          objectFit: 'cover',
          transform: 'rotateY(180deg)',
          margin: '10px 0 10px 0'
        }}
      />
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <C.Main_Container>
      <div id='title_bar'>
        <S.H2_title>표정 트래킹 개요</S.H2_title>
      </div>
      <div className='rowBox'>
        <VideoComponent videoRef={videoRef} />
        <div className='description' style={{ width: 'auto' }}>
          <C.LetTracking onClick={() => navigate('/tracking')}>표정 트래킹 진행하기</C.LetTracking>
          <p style={{ textAlign: 'left', paddingLeft: '7px' }}>표정 트래킹이란?</p>
        </div>
      </div>

      <div className='description' style={{ margin: '20px 0' }} >
        <div id='title_bar' style={{ borderBottom: 'none' }}>
          <S.H2_title style={{ color: '#6D6D6D', fontSize: '20px'}} onClick={handleToggle}>
            표정 트래킹 이용방법
          </S.H2_title>
          <button id="descriptionBtn" onClick={handleToggle}>
            {isExplainOpen ? '▲' : '▼'}
          </button>
        </div>

        <C.SubTitle>
          <div id='instructions' style={{ display: isExplainOpen ? 'block' : 'none' }}>
            <ol>
              <li>버튼을 누르면 표정 트래킹이 자동으로 시작됩니다</li>
              <li>표정 트래킹은 페이지를 열어두기만 하면, 종료하기 전까지 측정이 계속되어요,</li>
              <li>카메라를 보면서 실시간 표정 연습을 진행하거나, 페이지를 열어두고 오랜 기간 동안 본인의 표정을 측정해 보세요</li>
              <li>누적 표정 비율 중 가장 많이 나온 표정은 메인 화면의 치즈 캐릭터에 반영됩니다 : )</li>
              <p>다음과 같이 다양한 표정을 지어보세요!</p>
            </ol>
            <div className='rowBox'>
              <div className='face_example'>
                <S.Logo src={face_smail} style={{ width: '40px' }} />
                행복
              </div>
              <div className='face_example'>
                <S.Logo src={face_sad} style={{ width: '40px' }} />
                슬픔
              </div>
              <div className='face_example'>
                <S.Logo src={face_angry} style={{ width: '40px' }} />
                분노
              </div>
              <div className='face_example'>
                <S.Logo src={face_suprise} style={{ width: '40px' }} />
                놀람
              </div>
              <div className='face_example'>
                <S.Logo src={face_disgusting} style={{ width: '40px' }} />
                혐오
              </div>
              <div className='face_example'>
                <S.Logo src={face_fear} style={{ width: '40px' }} />
                두려움
              </div>
              <div className='face_example'>
                <S.Logo src={face_natural} style={{ width: '40px' }} />
                중립
              </div>
            </div>
          </div>
        </C.SubTitle>
      </div>

      <TrackingReportcard trackingReports={trackingReports} />

    </C.Main_Container>
  );
};

export default RealTimeTrackingList;
