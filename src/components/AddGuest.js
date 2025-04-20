import React, { useState } from 'react';
import axios from 'axios';

const AddGuest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [faculty, setFaculty] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/add-guest', {
      name,
      email,
      phone,
      faculty,
      angkatan,
      company,
    })
    .then((response) => {
      console.log('✅ Guest added:', response.data);
      alert('Guest berhasil ditambahkan!');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setFaculty('');
      setAngkatan('');
      setCompany('');
    })
    .catch((error) => {
      console.error('❌ Error adding guest:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Nomor Handphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Fakultas" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
      <input type="text" placeholder="Angkatan Masuk" value={angkatan} onChange={(e) => setAngkatan(e.target.value)} />
      <input type="text" placeholder="Lembaga / Instansi / Perusahaan" value={company} onChange={(e) => setCompany(e.target.value)} />
      <button type="submit">Add Guest</button>
    </form>
  );
};

export default AddGuest;
