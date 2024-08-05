import Frame from '../../assets/Frame_FourCut.png'
export const createFourCutImage = (photos) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = 300; // 각 사진의 가로 크기
  const height = 400; // 각 사진의 세로 크기
  const padding = 18; // 사진 사이의 간격

  canvas.width = (width * 2) + padding; // 2x2 배열이므로 가로는 width의 2배 + 간격
  canvas.height = (height * 2) + padding; // 2x2 배열이므로 세로는 height의 2배 + 간격

  photos.forEach((photo, index) => {
    const img = new Image();
    img.src = photo.photo;
    img.onload = () => {
      const x = (index % 2) * (width + padding);
      const y = Math.floor(index / 2) * (height + padding);

      // 이미지 자르기 및 중앙 배치
      const imgAspectRatio = img.width / img.height;
      const boxAspectRatio = width / height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspectRatio > boxAspectRatio) {
        drawWidth = height * imgAspectRatio;
        drawHeight = height;
        offsetX = -(drawWidth - width) / 2;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgAspectRatio;
        offsetX = 0;
        offsetY = -(drawHeight - height) / 2;
      }

      // 이미지를 캔버스에 그리기
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight, x, y, width, height);

      // 네 컷 이미지가 모두 준비되면 이벤트를 트리거
      if (index === photos.length - 1) {
        const finalImageSrc = canvas.toDataURL('image/jpeg');
        const event = new CustomEvent('fourCutImageReady', { detail: finalImageSrc });
        window.dispatchEvent(event);
      }
    };
  });
};
