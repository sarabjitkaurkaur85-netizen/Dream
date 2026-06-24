import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from './Manager.module.css';

function RoomsManager() {
  const { fetchRooms, createRoom, updateRoom, deleteRoom } = useAdmin();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Standard',
    description: '',
    price: '',
    adults: 2,
    children: 0,
    amenities: '',
    rating: 0,
    image: '',
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data.rooms || []);
    } catch (err) {
      alert('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
        capacity: { adults: Number(formData.adults), children: Number(formData.children) },
      };

      if (editingRoom) {
        await updateRoom(editingRoom._id, payload);
      } else {
        await createRoom(payload);
      }

      setShowModal(false);
      resetForm();
      loadRooms();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      title: room.title,
      type: room.type,
      description: room.description,
      price: room.price,
      adults: room.capacity?.adults || 2,
      children: room.capacity?.children || 0,
      amenities: room.amenities?.join(', ') || '',
      rating: room.rating || 0,
      image: room.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await deleteRoom(id);
      loadRooms();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setEditingRoom(null);
    setFormData({
      title: '',
      type: 'Standard',
      description: '',
      price: '',
      adults: 2,
      children: 0,
      amenities: '',
      rating: 0,
      image: '',
    });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Rooms Manager</h1>
        <button className={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Room
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td><img src={room.image} alt={room.title} className={styles.thumbnail} /></td>
                <td>{room.title}</td>
                <td>{room.type}</td>
                <td>${room.price}</td>
                <td>{room.capacity?.adults}A / {room.capacity?.children}C</td>
                <td>⭐ {room.rating}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(room)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(room._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{editingRoom ? 'Edit Room' : 'Add Room'}</h2>
            <form onSubmit={handleSubmit}>
              <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>Villa</option>
              </select>
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              <input type="number" placeholder="Adults" value={formData.adults} onChange={(e) => setFormData({ ...formData, adults: e.target.value })} />
              <input type="number" placeholder="Children" value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} />
              <input placeholder="Amenities (comma-separated)" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} />
              <input type="number" step="0.1" placeholder="Rating (0-5)" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
              <input placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveBtn}>Save</button>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomsManager;
