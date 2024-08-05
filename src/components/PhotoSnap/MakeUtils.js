export const createFourCutImage = (photos) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = 300; // 각 사진의 가로 크기
    const height = 400; // 각 사진의 세로 크기
  
    canvas.width = width * 2; // 2x2 배열이므로 가로는 width의 2배
    canvas.height = height * 2; // 2x2 배열이므로 세로는 height의 2배
  
    let imagesLoaded = 0;
    const imgElements = [];
  
    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo.photo;
      img.onload = () => {
        console.log(`Image ${index + 1} loaded:`, img.src); // 디버깅 로그
        imgElements[index] = img;
        imagesLoaded += 1;
  
        // 모든 이미지가 로드된 후 그리기 시작
        if (imagesLoaded === photos.length) {
          imgElements.forEach((img, i) => {
            const x = (i % 2) * width;
            const y = Math.floor(i / 2) * height;
            context.drawImage(img, x, y, width, height);
            console.log(`Image ${i + 1} drawn on canvas at (${x}, ${y})`); // 디버깅 로그
          });
  
          const finalImageSrc = canvas.toDataURL('image/jpeg');
          console.log('Four cut image created:', finalImageSrc); // 디버깅 로그
  
          // 모든 이미지가 로드된 후 캔버스의 데이터 URL을 반환
          const event = new CustomEvent('fourCutImageReady', { detail: finalImageSrc });
          window.dispatchEvent(event);
        }
      };
      img.onerror = (err) => {
        console.error(`Error loading image ${index + 1}:`, err); // 에러 로그
      };
    });
  };
  