import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import styles from './Dashboard.module.css';

const MONTHLY_REVENUE = [
  { month: 'Jan', amount: 28000 },
  { month: 'Feb', amount: 32000 },
  { month: 'Mar', amount: 45000 },
  { month: 'Apr', amount: 38000 },
  { month: 'May', amount: 52000 },
  { month: 'Jun', amount: 48000 },
  { month: 'Jul', amount: 65000 },
  { month: 'Aug', amount: 72000 },
  { month: 'Sep', amount: 58000 },
  { month: 'Oct', amount: 44000 },
  { month: 'Nov', amount: 51000 },
  { month: 'Dec', amount: 68000 },
];

const NOTIFICATIONS = [
  { id: 1, text: 'New booking: Deluxe Ocean View by Alexandra Chen', time: '5 min ago', type: 'booking' },
  { id: 2, text: 'Payment received: $840 from James Thompson', time: '1 hour ago', type: 'payment' },
  { id: 3, text: 'New review: 5★ rating from Sofia Martinez', time: '3 hours ago', type: 'review' },
  { id: 4, text: 'Room #205 requires maintenance attention', time: '6 hours ago', type: 'alert' },
];

function Dashboard() {
  const { fetchStats } = useAdmin();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.amount));

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
      <span>Loading dashboard...</span>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Welcome back! Here's your hotel overview.</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statRooms}`}>
          <div className={styles.statIcon}>🏨</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats?.totalRooms || 0}</div>
            <div className={styles.statLabel}>Total Rooms</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statAvailable}`}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats?.totalRooms ? Math.floor(stats.totalRooms * 0.7) : 0}</div>
            <div className={styles.statLabel}>Available Rooms</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statBookings}`}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats?.totalBookings || 0}</div>
            <div className={styles.statLabel}>Total Bookings</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statRevenue}`}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>$601K</div>
            <div className={styles.statLabel}>Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Monthly Revenue */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Monthly Revenue</h3>
          <div className={styles.barChart}>
            {MONTHLY_REVENUE.map((m, i) => (
              <div className={styles.barWrapper} key={i}>
                <div className={styles.barValue}>${(m.amount / 1000).toFixed(0)}K</div>
                <div className={styles.bar} style={{ height: `${(m.amount / maxRevenue) * 180}px` }} />
                <div className={styles.barLabel}>{m.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Occupancy Rate</h3>
          <div className={styles.occupancyWrapper}>
            <div className={styles.occupancyCircle}>
              <svg viewBox="0 0 100 100" className={styles.occupancySvg}>
                <circle cx="50" cy="50" r="42" className={styles.occupancyBg} />
                <circle cx="50" cy="50" r="42" className={styles.occupancyFill}
                  strokeDasharray={`${78 * 2.64} ${100 * 2.64}`} />
              </svg>
              <div className={styles.occupancyText}>
                <span className={styles.occupancyValue}>78%</span>
                <span className={styles.occupancyLabel}>Occupied</span>
              </div>
            </div>
            <div className={styles.occupancyLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'var(--accent)' }} />
                <span>Occupied (78%)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'var(--border)' }} />
                <span>Available (22%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Recent Bookings */}
        <div className={styles.tableCard}>
          <h3 className={styles.chartTitle}>Recent Bookings</h3>
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-In</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className={styles.guestInfo}>
                          <div className={styles.guestAvatar}>{(booking.guestName || 'G')[0]}</div>
                          <div>
                            <div className={styles.guestName}>{booking.guestName}</div>
                            <div className={styles.guestEmail}>{booking.guestEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td>{booking.roomTitle}</td>
                      <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td>
                        <span className={`${styles.badge} ${
                          booking.status === 'confirmed' ? styles.badgeSuccess : styles.badgePending
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.noData}>No recent bookings</p>
          )}
        </div>

        {/* Notifications */}
        <div className={styles.notifCard}>
          <h3 className={styles.chartTitle}>Notifications</h3>
          <div className={styles.notifList}>
            {NOTIFICATIONS.map(n => (
              <div className={styles.notifItem} key={n.id}>
                <div className={`${styles.notifDot} ${styles[`notif${n.type.charAt(0).toUpperCase() + n.type.slice(1)}`]}`} />
                <div>
                  <p className={styles.notifText}>{n.text}</p>
                  <span className={styles.notifTime}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
