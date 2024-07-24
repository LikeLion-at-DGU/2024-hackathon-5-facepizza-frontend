import React, { useRef } from 'react';

const PhotoComponent = ({ videoRef, takePhoto, photoTaken }) => {
  const photoCanvasRef = useRef(); // canvas DOM 요소를 참조하는 ref

  if (photoTaken) { // 사진이 찍혔을 때
    const context = photoCanvasRef.current.getContext('2d'); // 캔버스 컨텍스트 가져오기
    context.drawImage(videoRef.current, 0, 0, photoCanvasRef.current.width, photoCanvasRef.current.height); // 비디오에서 이미지 가져와 캔버스에 그리기
    const dataUrl = photoCanvasRef.current.toDataURL('image/png'); // 캔버스를 데이터 URL로 변환
    console.log("사진이 저장되었습니다: ", dataUrl);

    const blob = dataURLToBlob(dataUrl); // 데이터 URL을 Blob으로 변환
    const url = window.URL.createObjectURL(blob); // Blob에서 URL 생성
    const a = document.createElement('a'); // 링크 요소 생성
    a.style.display = 'none';
    a.href = url; // 생성된 URL을 링크에 설정
    a.download = 'photo.png'; // 파일 이름 설정
    document.body.appendChild(a); // 링크 요소를 DOM에 추가
    a.click(); // 링크 클릭 (파일 다운로드)
    window.URL.revokeObjectURL(url); // URL 해제
  }

  return <canvas ref={photoCanvasRef} width="720" height="560" style={{ display: 'none' }} />; // 캔버스 요소 (화면에 표시되지 않음)
};

export default PhotoComponent;

const dataURLToBlob = (dataURL) => { // 데이터 URL을 Blob으로 변환하는 함수
  const [header, base64] = dataURL.split(','); // 헤더와 베이스64 데이터 분리
  const binary = atob(base64); // 베이스64 데이터를 바이너리 데이터로 변환
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i)); // 바이너리 데이터를 배열에 추가
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob 생성
};
