import React, { useEffect } from "react";

const VideoComponent = ({ videoRef }) => {
  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.log("Error accessing video stream: ", err));
    };

    startVideo();
  }, [videoRef]);

  return <video ref={videoRef} autoPlay={true} width="720" height="540" />;
};

export default VideoComponent;
