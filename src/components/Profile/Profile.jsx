import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Profile.module.css';

const TABS = ['overview', 'bookings', 'wishlist', 'notifications', 'settings'];
const TAB_LABELS = { overview: '👤 Overview', bookings: '📋 My Bookings', wishlist: '❤️ Wishlist', notifications: '🔔 Notifications', settings: '⚙️ Settings' };

const MOCK_BOOKINGS = [
  { id: 1, room: 'Deluxe Ocean View', checkIn: '2026-07-15', checkOut: '2026-07-18', status: 'confirmed', total: 840 },
  { id: 2, room: 'Royal Suite', checkIn: '2026-06-01', checkOut: '2026-06-05', status: 'completed', total: 2720 },
  { id: 3, room: 'Garden Villa', checkIn: '2025-12-20', checkOut: '2025-12-25', status: 'completed', total: 1750 },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Your booking for Deluxe Ocean View has been confirmed!', time: '2 hours ago', read: false },
  { id: 2, text: 'Special offer: 20% off on suite bookings this weekend!', time: '1 day ago', read: false },
  { id: 3, text: 'Your loyalty points balance: 2,450 points', time: '3 days ago', read: true },
];

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '', email: '', phone: '+62 812 3456 7890',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      setProfileData(prev => ({ ...prev, name: user.name || '', email: user.email || '' }));
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className={styles.loadingPage}><div className={styles.spinner} />Loading profile...</div>;
  }

  if (!user) return null;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.profileHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.avatar}>
            <span className={styles.avatarLetter}>{(user.name || 'G')[0].toUpperCase()}</span>
          </div>
          <h1 className={styles.userName}>{user.name}</h1>
          <p className={styles.userEmail}>{user.email}</p>
          <div className={styles.memberBadge}>
            <span>⭐</span> Gold Member · Since {user.createdAt ? new Date(user.createdAt).getFullYear() : '2025'}
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          {TABS.map(tab => (
            <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* ─── Overview ─── */}
          {activeTab === 'overview' && (
            <div className={styles.overviewGrid}>
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <h3>Personal Information</h3>
                  <button className={styles.editBtn} onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Save' : 'Edit Profile'}
                  </button>
                </div>
                <div className={styles.infoList}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Full Name</span>
                    {editMode ? (
                      <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className={styles.editInput} />
                    ) : (
                      <span className={styles.infoValue}>{user.name}</span>
                    )}
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Email Address</span>
                    <span className={styles.infoValue}>{user.email}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Phone Number</span>
                    {editMode ? (
                      <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className={styles.editInput} />
                    ) : (
                      <span className={styles.infoValue}>{profileData.phone}</span>
                    )}
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Member Since</span>
                    <span className={styles.infoValue}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.statsCards}>
                <div className={styles.miniCard}>
                  <span className={styles.miniIcon}>🏨</span>
                  <span className={styles.miniNumber}>3</span>
                  <span className={styles.miniLabel}>Total Bookings</span>
                </div>
                <div className={styles.miniCard}>
                  <span className={styles.miniIcon}>⭐</span>
                  <span className={styles.miniNumber}>2,450</span>
                  <span className={styles.miniLabel}>Loyalty Points</span>
                </div>
                <div className={styles.miniCard}>
                  <span className={styles.miniIcon}>❤️</span>
                  <span className={styles.miniNumber}>5</span>
                  <span className={styles.miniLabel}>Wishlist Items</span>
                </div>
                <div className={styles.miniCard}>
                  <span className={styles.miniIcon}>🎁</span>
                  <span className={styles.miniNumber}>2</span>
                  <span className={styles.miniLabel}>Active Offers</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── Bookings ─── */}
          {activeTab === 'bookings' && (
            <div>
              <h3 className={styles.sectionTitle}>Booking History</h3>
              <div className={styles.bookingsList}>
                {MOCK_BOOKINGS.map(b => (
                  <div className={styles.bookingCard} key={b.id}>
                    <div className={styles.bookingInfo}>
                      <h4>{b.room}</h4>
                      <p>📅 {b.checkIn} → {b.checkOut}</p>
                    </div>
                    <div className={styles.bookingRight}>
                      <span className={`${styles.statusBadge} ${b.status === 'confirmed' ? styles.statusConfirmed : styles.statusCompleted}`}>
                        {b.status}
                      </span>
                      <span className={styles.bookingTotal}>${b.total}</span>
                      <button className={styles.invoiceBtn}>📄 Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Wishlist ─── */}
          {activeTab === 'wishlist' && (
            <div>
              <h3 className={styles.sectionTitle}>My Wishlist</h3>
              <div className={styles.wishlistGrid}>
                {['Deluxe Ocean View', 'Presidential Suite', 'Beach Bungalow', 'Garden Villa', 'Royal Suite'].map((room, i) => (
                  <div className={styles.wishlistCard} key={i}>
                    <div className={styles.wishlistIcon}>❤️</div>
                    <h4>{room}</h4>
                    <button className={styles.wishlistBtn} onClick={() => navigate('/rooms')}>View Room</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Notifications ─── */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className={styles.sectionTitle}>Notifications</h3>
              <div className={styles.notificationsList}>
                {MOCK_NOTIFICATIONS.map(n => (
                  <div className={`${styles.notificationItem} ${!n.read ? styles.unread : ''}`} key={n.id}>
                    <div className={styles.notifDot} />
                    <div>
                      <p className={styles.notifText}>{n.text}</p>
                      <span className={styles.notifTime}>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Settings ─── */}
          {activeTab === 'settings' && (
            <div className={styles.settingsGrid}>
              <div className={styles.infoCard}>
                <h3>Change Password</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoRow}>
                    <label className={styles.infoLabel}>Current Password</label>
                    <input type="password" placeholder="Enter current password" className={styles.editInput} />
                  </div>
                  <div className={styles.infoRow}>
                    <label className={styles.infoLabel}>New Password</label>
                    <input type="password" placeholder="Enter new password" className={styles.editInput} />
                  </div>
                  <div className={styles.infoRow}>
                    <label className={styles.infoLabel}>Confirm Password</label>
                    <input type="password" placeholder="Confirm new password" className={styles.editInput} />
                  </div>
                </div>
                <button className={styles.saveBtn}>Update Password</button>
              </div>

              <div className={styles.infoCard}>
                <h3>Account Actions</h3>
                <div className={styles.actionsList}>
                  <button className={styles.actionBtn}>📄 Download Invoice</button>
                  <button className={styles.actionBtn}>📧 Email Preferences</button>
                  <button className={styles.actionBtn}>🔔 Notification Settings</button>
                  <button className={styles.logoutBtn} onClick={handleLogout}>🚪 Log Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
