import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GuestTable.css'; // Import file CSS-nya

const GuestTable = () => {
    const [guests, setGuests] = useState([]);
    const [form, setForm] = useState({
      Nama: '',
      _id: '',
      check_in: '',
      Email_Address: '',
      Nomor_Handphone: '',
      Fakultas: '',
      Angkatan_Masuk: '',
      Perusahaan_Tempat_Bekerja: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [filterId, setFilterId] = useState('');
    const [filterNama, setFilterNama] = useState('');
    const [searchResult, setSearchResult] = useState(null); // bisa true, false, atau null
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGuests = guests.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)).slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(guests.length / itemsPerPage);
    // Batasan tombol halaman yang terlihat
    const pageLimit = 5;
    const startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  
  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get('https://express-crud-event-production.up.railway.app/guests')
      .then(response => setGuests(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);
  

 // Handle tambah / update data
 const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
        console.log("editingId:", editingId)
      // UPDATE (PUT)
      axios.put(`https://express-crud-event-production.up.railway.app/guests/${editingId}`, form)
        .then(res => {
          setGuests(prev => prev.map(g => g._id === editingId ? res.data : g));
          setForm({
            Nama: '', _id: '', check_in: '', Email_Address: '', Nomor_Handphone: '',
            Fakultas: '', Angkatan_Masuk: '',
            Perusahaan_Tempat_Bekerja: ''
          });
          setEditingId(null);
        });
    } else {
      // CREATE (POST)
      axios.post('https://express-crud-event-production.up.railway.app/guests', form)
        .then(res => {
          setGuests(prev => [...prev, res.data]);
          setForm({
            Nama: '', _id: '', check_in: '', Email_Address: '', Nomor_Handphone: '',
            Fakultas: '', Angkatan_Masuk: '',
            Perusahaan_Tempat_Bekerja: ''
          });
        });
    }
  };

  // Handle Edit
  const handleEdit = (guest) => {
    setForm(guest);
    setEditingId(guest._id);
  };

  // Handle Delete
  const handleDelete = (id) => {
    axios.delete(`https://express-crud-event-production.up.railway.app/guests/${id}`)
      .then(() => {
        setGuests(prev => prev.filter(g => g._id !== id));
      });
  };

  return (
    <div>
       <div style={{ marginBottom: '10px' }}>
        <input
            type="text"
            placeholder="Cari berdasarkan ID"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
        />
         <input
            type="text"
            placeholder="Cari berdasarkan Nama"
            value={filterNama}
            onChange={(e) => setFilterNama(e.target.value)}
        />
        <button
            onClick={() => {
            const foundGuest = guests.find(guest => guest._id === filterId);
            const foundGuestName = guests.find(guest => guest.Nama === filterNama);
            if (foundGuest) {
                setSearchResult(true);
                handleEdit(foundGuest); // ⬅ langsung panggil edit!
            } else if(foundGuestName){
                setSearchResult(true);
                handleEdit(foundGuestName); // ⬅ langsung panggil edit!
            }
              else {
                setSearchResult(false);
            }
            }}
        >
            Cari & Edit
        </button>
        {searchResult !== null && (
            <p style={{ color: searchResult ? 'green' : 'red' }}>
            {searchResult ? 'ID ditemukan dan siap diedit ✅' : 'ID tidak ditemukan ❌'}
            </p>
        )}
        </div>

      <h2>{editingId ? "Edit Guest" : "Add Guest"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="_id" value={form._id} onChange={handleChange} placeholder="Id" />
        <input name="check_in" value={form.check_in} onChange={handleChange} placeholder="Check In" />
        <input name="Timestamp" value={form.Timestamp} onChange={handleChange} placeholder="Registration" />
        <input name="Nama" value={form.Nama} onChange={handleChange} placeholder="Nama" />
        <input name="Email_Address" value={form.Email_Address} onChange={handleChange} placeholder="Email" />
        <input name="Nomor_Handphone" value={form.Nomor_Handphone} onChange={handleChange} placeholder="Nomor HP" />
        <input name="Fakultas" value={form.Fakultas} onChange={handleChange} placeholder="Fakultas" />
        <input name="Angkatan_Masuk" value={form.Angkatan_Masuk} onChange={handleChange} placeholder="Angkatan Masuk" />
        <input name="Perusahaan_Tempat_Bekerja" value={form.Perusahaan_Tempat_Bekerja} onChange={handleChange} placeholder="Instansi" />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <table className="guest-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Check In</th>
            <th>Registration</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Nomor HP</th>
            <th>Fakultas</th>
            <th>Angkatan</th>
            <th>Instansi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
        {currentGuests.map((guest) => (
            <tr key={guest._id}>
                <td>{guest._id}</td>
                <td>{guest.check_in}</td>
                <td>{guest.Timestamp}</td>
                <td>{guest.Nama}</td>
                <td>{guest.Email_Address}</td>
                <td>{guest.Nomor_Handphone}</td>
                <td>{guest.Fakultas}</td>
                <td>{guest.Angkatan_Masuk}</td>
                <td>{guest.Perusahaan_Tempat_Bekerja}</td>
                <td>
                <button className="btn edit" onClick={() => handleEdit(guest)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(guest._id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
        <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Prev
        </button>

        {[...Array(endPage - startPage + 1)].map((_, i) => {
            const page = startPage + i;
            return (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active-page' : ''}
            >
                {page}
            </button>
            );
        })}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
        </button>
        </div>


    </div>
  );
};

export default GuestTable;

