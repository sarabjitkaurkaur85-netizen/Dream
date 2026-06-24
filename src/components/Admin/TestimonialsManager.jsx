import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from './Manager.module.css';

function TestimonialsManager() {
  const { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ text: '', author: '', location: '' });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      alert('Failed to load testimonials');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateTestimonial(editing._id, formData);
      } else {
        await createTestimonial(formData);
      }
      setShowModal(false);
      setFormData({ text: '', author: '', location: '' });
      setEditing(null);
      loadTestimonials();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (testimonial) => {
    setEditing(testimonial);
    setFormData({ text: testimonial.text, author: testimonial.author, location: testimonial.location });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      loadTestimonials();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Testimonials Manager</h1>
        <button className={styles.addBtn} onClick={() => { setFormData({ text: '', author: '', location: '' }); setEditing(null); setShowModal(true); }}>+ Add Testimonial</button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Text</th>
              <th>Author</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t._id}>
                <td>{t.text.substring(0, 80)}...</td>
                <td>{t.author}</td>
                <td>{t.location}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(t)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSubmit}>
              <textarea placeholder="Testimonial text" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} required rows="4" />
              <input placeholder="Author name" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
              <input placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
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

export default TestimonialsManager;
