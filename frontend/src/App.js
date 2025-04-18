// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage'; // Mengimpor AdminPage
import CheckIn from './components/CheckIn';     // Mengimpor CheckIn
import GuestList from './components/GuestList'; // Mengimpor GuestList
import AddGuest from './components/AddGuest';
import GuestTable from './components/GuestTable';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sistem Absensi Halal Bihalal IKA UB 2025</h1>
        <Routes>
          <Route path="/addguest" element={<AddGuest />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/guesttable" element={<GuestTable />} />
          <Route path="/" element={<GuestList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;  // Pastikan ini ada
