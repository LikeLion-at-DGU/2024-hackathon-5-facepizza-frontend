//VideoComponent 기존 정상 코드
import React, { useEffect } from "react";

const VideoComponent = ({ videoRef, style  }) => {
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
      autoPlay={true}
      style={{
        width: "100%",
        height: 'auto',
        objectFit: 'cover',
        transform: 'rotateY(180deg)',
        ...style, // 외부에서 전달된 스타일을 병합
      }}
    />
  );
};

export default VideoComponent;
