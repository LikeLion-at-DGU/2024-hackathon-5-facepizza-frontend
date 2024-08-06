import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
  const [qrVisible, setQrVisible] = useState(false);

  const handleGenerateQR = () => {
    setQrVisible(true);
  };

  return (
    <div>
      <button onClick={handleGenerateQR}>QR 코드 생성</button>
      {qrVisible && (
        <div>
          <QRCode value={url} />
          <p>사진을 다운로드하려면 QR 코드를 스캔하세요.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
