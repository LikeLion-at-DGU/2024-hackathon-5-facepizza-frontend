import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import * as RT from '../../styles/RealTimeTrackingStyled'

import face_suprise from '../../assets/face/face_suprise.png';
import face_smail from '../../assets/face/face_smail.png';
import face_sad from '../../assets/face/face_sad.png';
import face_natural from '../../assets/face/face_natural.png';
import face_fear from '../../assets/face/face_fear.png';
import face_disgusting from '../../assets/face/face_disgusting.png';
import face_angry from '../../assets/face/face_angry.png';

const TrackingReportcard = ({ report = {} }) => {
    const [trackingReports, setTrackingReports] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const bestEmotion = (report) => {
        let bestEmotion = report.happy || 0;
        let emotion = '행복한 표정을 가장 많이 지었어요!';
        let emotionClass = 'happy';

        if ((report.sad || 0) > bestEmotion) {
            bestEmotion = report.sad;
            emotion = '슬픔 표정을 가장 많이 지었어요!';
            emotionClass = 'sad';
        }
        if ((report.angry || 0) > bestEmotion) {
            bestEmotion = report.angry;
            emotion = '분노 표정을 가장 많이 지었어요!';
            emotionClass = 'angry';
        }
        if ((report.surprised || 0) > bestEmotion) {
            bestEmotion = report.surprised;
            emotion = '놀람 표정을 가장 많이 지었어요!';
            emotionClass = 'surprised';
        }
        if ((report.disgusted || 0) > bestEmotion) {
            bestEmotion = report.disgusted;
            emotion = '혐오 표정을 가장 많이 지었어요!';
            emotionClass = 'disgusted';
        }
        if ((report.fearful || 0) > bestEmotion) {
            bestEmotion = report.fearful;
            emotion = '두려움 표정을 가장 많이 지었어요!';
            emotionClass = 'fearful';
        }
        if ((report.neutral || 0) > bestEmotion) {
            bestEmotion = report.neutral;
            emotion = '무표정을 가장 많이 지었어요!';
            emotionClass = 'neutral';
        }
        return { bestEmotion, emotion };
    };




    const calculateElapsedTime = (start, end) => {
        const elapsedMs = new Date(end) - new Date(start);
        const seconds = Math.floor((elapsedMs / 1000) % 60);
        const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
        return minutes === 0
            ? `${String(seconds)}초`
            : `${String(minutes)}분 ${String(seconds)}초`;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                setToken(token);
                if (token) {
                    const response = await axios.get('http://127.0.0.1:8000/api/mypage/profile', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    if (response.data.user.id) {
                        setIsLoggedIn(true);
                        setUserId(response.data.user.id);
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        const fetchReports = async () => {
            if (!isLoggedIn || !userId || !token) return;
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/report', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const userReports = response.data.filter(report => report.user === userId);
                setTrackingReports(userReports);
            } catch (error) {
                setError(error);
            }
        };

        fetchUserData().then(fetchReports);
    }, [isLoggedIn, userId, token]);

    if (loading) return <p>Loading...</p>;
    if (!isLoggedIn) return <p>로그인 후에만 접근 가능합니다. 로그인 해주세요.</p>;
    if (error) return <p>Error: {error.message}</p>;



    return (
        <>
            <div id='title_bar' style={{ margin: '20px 0', alignItems:'flex-end', gap: '10px' }}>
                <S.H2_title>표정 트래킹 기록</S.H2_title> <span>총 {trackingReports.length}개 </span>
            </div>

            {trackingReports.length > 0 ? (
                trackingReports.map((report) => (

                    <RT.Card>
                        <h3>{report.title}</h3> 
                        <div id='FlexRow' style={{ gap: '25px' }}>
                            <div id='leftWrapper'>  {/* 세로 */}
                                <div class="timebox">
                                    <p>{`${formatDate(report.created_at)} ${formatTime(report.created_at)}`}</p>
                                    <p>총 {calculateElapsedTime(report.created_at, report.ended_at)} 트래킹</p>
                                </div>
                                <RT.EmotionText className={bestEmotion(report).emotion}>
                                    <h4>{bestEmotion(report).emotion}</h4>
                                </RT.EmotionText>
                            </div>
                            <div id='rightWrapper' > | 누적 표정 데이터
                                <div class="facialData">
                                    <p>행복: {report.happy.toFixed(0)}%</p>
                                    <p>슬픔: {report.sad.toFixed(0)}%</p>
                                    <p>화남: {report.angry.toFixed(0)}%</p>
                                    <p>놀람: {report.surprised.toFixed(0)}%</p>
                                    <p>혐오: {report.disgusted.toFixed(0)}%</p>
                                    <p>두려움: {report.fearful.toFixed(0)}%</p>
                                    <p>중립: {report.neutral.toFixed(0)}%</p>
                                </div>
                            </div>
                        </div>



                    </RT.Card>
                ))
            ) : (
                <p>기록이 없습니다.</p>
            )}

        </>
    );
};

export default TrackingReportcard;
