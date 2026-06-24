import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Manager.module.css';

function UsersManager() {
  const { fetchUsers, updateUserRole, deleteUser } = useAdmin();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data.users || []);
    } catch (err) {
      alert('Failed to load users');
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRole(id, newRole);
      loadUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.manager}>
      <h1 className={styles.pageTitle}>Users Manager</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Member Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`${styles.badge} ${u.role === 'admin' ? styles.badgeWarning : styles.badgeInfo}`}>{u.role}</span></td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u._id !== currentUser?._id && (
                    <>
                      <button className={styles.editBtn} onClick={() => handleToggleRole(u._id, u.role)}>Toggle Role</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(u._id)}>Delete</button>
                    </>
                  )}
                  {u._id === currentUser?._id && <span className={styles.muted}>(You)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersManager;
