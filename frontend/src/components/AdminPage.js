// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [guests, setGuests] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingGuest, setEditingGuest] = useState(null);
  const [editName, setEditName] = useState('');
  const navigate = useNavigate(); // Menggunakan useNavigate

  useEffect(() => {
    // Ambil daftar tamu dari backend
    axios.get('http://localhost:3000/guests').then(res => setGuests(res.data));
  }, []);

  // Fungsi untuk tambah tamu
  const handleAddGuest = async () => {
    const id = new Date().getTime().toString(); // id unik untuk tamu
    await axios.post('http://localhost:3000/guests', { id, name: newName });
    setNewName('');
    // Refresh daftar tamu setelah menambah
    axios.get('http://localhost:3000/guests').then(res => setGuests(res.data));
  };

  // Fungsi untuk simpan edit tamu
  const handleEditGuest = async () => {
    if (editingGuest) {
      await axios.put(`http://localhost:3000/guests/${editingGuest.id}`, { name: editName });
      setEditingGuest(null);
      setEditName('');
      // Refresh daftar tamu setelah edit
      axios.get('http://localhost:3000/guests').then(res => setGuests(res.data));
    }
  };

  const startEditing = (guest) => {
    setEditingGuest(guest);
    setEditName(guest.name);
  };

  return (
    <div>
      <h2>Admin - Manage Guests</h2>
      <div>

      </div>
      

      {/* Form untuk tambah tamu */}
      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama Tamu"
        />
        <button onClick={handleAddGuest}>Tambah Tamu</button>
      </div>

      {/* Tabel tamu */}
      <h3>Daftar Tamu</h3>
      <ul>
        {guests.map((guest) => (
          <li key={guest._id}>
            {guest.Nama}
            <button onClick={() => startEditing(guest)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Form untuk edit tamu */}
      {/* {editingGuest && (
        <div>
          <h3>Edit Tamu: {editingGuest.name}</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Nama Baru"
          />
          <button onClick={handleEditGuest}>Simpan Perubahan</button>
          <button onClick={() => setEditingGuest(null)}>Batal</button>
        </div>
      )} */}
    </div>
  );
};

export default AdminPage;
