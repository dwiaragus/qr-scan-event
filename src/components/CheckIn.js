// src/components/CheckIn.js
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import GuestTable from './GuestTable';

const CheckIn = () => {
  const [guests, setGuests] = useState([]);
  const [scannedData, setScannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle hasil scan QR atau barcode
  const handleScan = (result) => {
    if (result) {
      setScannedData(result?.text); // Menyimpan hasil pemindaian (QR Code)
      setErrorMessage(''); // Reset error message jika berhasil memindai
    }
  };

  // Handle jika ada error saat memindai
  const handleError = (error) => {
    setErrorMessage('Terjadi kesalahan saat memindai: ' + error?.message);
    console.error(error);
  };

  useEffect(() => {
      // Mengambil data tamu dari backend
      axios.get('http://localhost:3000/guests')
        .then(response => {
          setGuests(response.data);  // Menyimpan data tamu ke state
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  }, []);

  return (
    <div>
      <h2>Halaman Check-in</h2>
      {scannedData && (
        <div>
          <h3>Data Tamu yang Dipindai:</h3>
          <p>{scannedData}</p> {/* Menampilkan data yang dipindai */}
        </div>
      )}

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>{errorMessage}</p> {/* Menampilkan pesan error jika ada */}
        </div>
      )}

      <h2>Daftar Tamu</h2>
      <div>
        <GuestTable></GuestTable>
      </div>
      
      <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <QrReader
          delay={300} // Delay pemindaian
          style={{ width: '100%' }} // Gaya untuk lebar 100%
          onResult={handleScan} // Menangani hasil pemindaian
          onError={handleError} // Menangani error
          constraints={{ facingMode: 'environment' }} // Menggunakan kamera belakang (untuk QR Code)
        />
      </div>

    </div>
  );
};

export default CheckIn;
