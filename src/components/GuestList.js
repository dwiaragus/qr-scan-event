import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function GuestList() {
  const data = 'bit.ly/HalalBihalalIKAUB2025'; // Data to encode in QR code

  return (
    <div>
      <h1>Guest List</h1>
      <QRCodeSVG value={data} />
    </div>
  );
}

export default GuestList;
