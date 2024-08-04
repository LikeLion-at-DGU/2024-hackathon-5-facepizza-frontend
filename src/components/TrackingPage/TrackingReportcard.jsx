import React, { useEffect, useRef, useState } from 'react';
import * as S from '../../styles/StyledComponents';
import * as C from '../../styles/CameraStyled';


const TrackingReportcard = ({trackingReports}) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };  // 날짜 출력 형식
    
      const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      };  // 시간 출력 형식

      const bestEmotion = (report) => {
        let bestEmotion = report.happy;
        let emotion = '행복한 표정을 가장 많이 지었어요!';
        if (report.sad > bestEmotion) {
            bestEmotion = report.sad;
            emotion = '슬픔 표정을 가장 많이 지었어요!';
        }
            
        if (report.angry > bestEmotion) {
            bestEmotion = report.angry;
            emotion = '분노 표정을 가장 많이 지었어요!';
        }            
        if (report.surprised > bestEmotion) {
            bestEmotion = report.surprised;
            emotion = '놀람 표정을 가장 많이 지었어요!';
        }
            
        if (report.disgusted > bestEmotion) {
            bestEmotion = report.disgusted;
            emotion = '혐오 표정을 가장 많이 지었어요!';
        }
            
        if (report.fearful > bestEmotion) {
            bestEmotion = report.fearful;
            emotion = '두려움 표정을 가장 많이 지었어요!';
        }
            
        if (report.neutral > bestEmotion) {
            bestEmotion = report.neutral;
            emotion = '무표정을 가장 많이 지었어요!';
        }
            
        return { bestEmotion, emotion };
      };

      const calculateElapsedTime = (start, end) => {
        const elapsedMs = new Date(end) - new Date(start);
        const seconds = Math.floor((elapsedMs / 1000) % 60);
        const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
        // const hours = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24);
    
        if (minutes == 0)
          return `${String(seconds)}초`
        else
          return `${String(minutes)}분 ${String(seconds)}초`;
      };  // 총 트래킹 한 시간
      

    return (
        <>
            <div id='title_bar' style={{ margin: '20px 0' }}>
                <S.H2_title>표정 트래킹 기록</S.H2_title>
            </div>


            <li>
                {trackingReports && trackingReports.map((report) => (
                    <ul key={report.id}>
                        <h3>{report.title}</h3>
                        <p>{`${formatDate(report.created_at)} ${formatTime(report.created_at)}`}</p>
                        <p>총 {calculateElapsedTime(report.created_at, report.ended_at)} 트래킹</p>
                        
                        <div>
                            <h4>{bestEmotion(report).emotion} | 누적 표정 데이터</h4>
                            <p>행복: {report.happy}%</p>
                            <p>슬픔: {report.sad}%</p>
                            <p>화남: {report.angry}%</p>
                            <p>놀람: {report.surprised}%</p>
                            <p>혐오: {report.disgusted}%</p>
                            <p>두려움: {report.fearful}%</p>
                            <p>중립: {report.neutral}%</p>
                        </div>
                    </ul>
                ))}
            </li>
        </>
    );
}

export default TrackingReportcard;