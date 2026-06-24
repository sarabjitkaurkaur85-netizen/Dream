import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from './Manager.module.css';

function BookingsManager() {
  const { fetchBookings, updateBookingStatus, deleteBooking } = useAdmin();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      alert('Failed to load bookings');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'confirmed' ? 'cancelled' : 'confirmed';
    try {
      await updateBookingStatus(id, newStatus);
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(id);
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className={styles.manager}>
      <h1 className={styles.pageTitle}>Bookings Manager</h1>
      <div className={styles.filterBar}>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
        <button onClick={() => setFilter('confirmed')} className={filter === 'confirmed' ? styles.active : ''}>Confirmed</button>
        <button onClick={() => setFilter('cancelled')} className={filter === 'cancelled' ? styles.active : ''}>Cancelled</button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.guestName}</td>
                <td>{booking.guestEmail}</td>
                <td>{booking.roomTitle}</td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td><span className={`${styles.badge} ${booking.status === 'confirmed' ? styles.badgeSuccess : styles.badgeDanger}`}>{booking.status}</span></td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleToggleStatus(booking._id, booking.status)}>Toggle</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(booking._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsManager;
