import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from './Manager.module.css';

function ServicesManager() {
  const { fetchServices, createService, updateService, deleteService } = useAdmin();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '', hours: '' });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServices(data.services || []);
    } catch (err) {
      alert('Failed to load services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateService(editing._id, formData);
      } else {
        await createService(formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '', image: '', hours: '' });
      setEditing(null);
      loadServices();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (service) => {
    setEditing(service);
    setFormData({ title: service.title, description: service.description, image: service.image, hours: service.hours });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      loadServices();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Services Manager</h1>
        <button className={styles.addBtn} onClick={() => { setFormData({ title: '', description: '', image: '', hours: '' }); setEditing(null); setShowModal(true); }}>+ Add Service</button>
      </div>
      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service._id} className={styles.card}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className={styles.cardActions}>
              <button className={styles.editBtn} onClick={() => handleEdit(service)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleSubmit}>
              <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <input placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
              <input placeholder="Hours (e.g., 9:00 AM - 8:00 PM)" value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} required />
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

export default ServicesManager;
