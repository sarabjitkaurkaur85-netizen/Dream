
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminProvider } from '../../context/AdminContext';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AdminProvider>
      <div className={styles.adminLayout}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.logo}>THE BEACH HOTEL</h2>
            <p className={styles.adminBadge}>Admin Panel</p>
          </div>

          <nav className={styles.nav} role="navigation" aria-label="Admin navigation">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>📊</span>
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/rooms"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>🏨</span>
              Rooms
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>📅</span>
              Bookings
            </NavLink>
            <NavLink
              to="/admin/services"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>🛎️</span>
              Services
            </NavLink>
            <NavLink
              to="/admin/testimonials"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>💬</span>
              Testimonials
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>👥</span>
              Users
            </NavLink>
            <NavLink
              to="/admin/gallery"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>🖼️</span>
              Gallery
            </NavLink>
            <NavLink
              to="/admin/coupons"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>🎫</span>
              Coupons
            </NavLink>
            <NavLink
              to="/admin/payments"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>💳</span>
              Payments
            </NavLink>
            <NavLink
              to="/admin/reports"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>📈</span>
              Reports
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>⚙️</span>
              Settings
            </NavLink>
          </nav>

          <div className={styles.sidebarFooter}>
            <button className={styles.backBtn} onClick={() => navigate('/')}>
              ← Back to Site
            </button>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

   
        <div className={styles.mainContent}>
          <header className={styles.topBar}>
            <button
              className={styles.hamburger}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userRole}>Admin</span>
            </div>
          </header>

          <main className={styles.content}>
            <Outlet />
          </main>
        </div>

        {sidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar} aria-hidden="true"></div>
        )}
      </div>
    </AdminProvider>
  );
}

export default AdminLayout;
