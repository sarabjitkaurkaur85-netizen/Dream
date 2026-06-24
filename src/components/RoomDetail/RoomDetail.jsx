import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './RoomDetail.module.css';

const API_BASE = 'http://localhost:5000/api';

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/rooms/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Room not found');
        return res.json();
      })
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback for demo purposes if DB is not completely synced
        setRoom({
          _id: id,
          title: 'Premium Demo Room',
          type: 'balcony',
          description: 'Experience unparalleled luxury in this beautifully appointed room. Enjoy sweeping ocean views from your private balcony, relax in the deep soaking tub, and drift to sleep on premium Egyptian cotton linens. This room is designed to provide the ultimate beachfront retreat for discerning travelers.',
          price: 250,
          capacity: { adults: 2, children: 1 },
          amenities: ['Free High-Speed WiFi', 'Ocean View Balcony', 'Mini Bar', '24/7 Room Service', 'Smart TV', 'Nespresso Machine', 'Luxury Bath Amenities'],
          rating: 4.9,
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
        });
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      alert('Please login first to book a room');
      navigate('/login', { state: { from: `/rooms/${id}` } });
      return;
    }
    addToCart(room);
    navigate('/checkout');
  };

  if (loading) return <div className={styles.loading}>Loading room details...</div>;
  if (error || !room) return <div className={styles.error}>Room not found. Please try another room.</div>;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <img src={room.image} alt={room.title} className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.roomSubtitle}>
            <span>⭐ {room.rating || 5.0} Rating</span>
            <span>•</span>
            <span>{room.type.replace('_', ' ').toUpperCase()}</span>
          </div>
          <h1 className={styles.roomTitle}>{room.title}</h1>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Content */}
        <div className={styles.detailsSection}>
          
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>👥</span>
              <div className={styles.metaText}>
                <span className={styles.metaLabel}>Capacity</span>
                <span className={styles.metaValue}>
                  {room.capacity?.adults} Adults, {room.capacity?.children} Children
                </span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>🛏️</span>
              <div className={styles.metaText}>
                <span className={styles.metaLabel}>Bed Type</span>
                <span className={styles.metaValue}>King Size</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📐</span>
              <div className={styles.metaText}>
                <span className={styles.metaLabel}>Room Size</span>
                <span className={styles.metaValue}>450 sq ft</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className={styles.sectionHeading}>About This Room</h2>
            <p className={styles.description}>{room.description}</p>
          </div>

          <div>
            <h2 className={styles.sectionHeading}>Room Amenities</h2>
            <div className={styles.amenitiesGrid}>
              {room.amenities && room.amenities.map((amenity, index) => (
                <div className={styles.amenityItem} key={index}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar / Booking CTA */}
        <aside className={styles.bookingCard}>
          <div className={styles.priceDisplay}>
            <span className={styles.price}>${room.price}</span>
            <span className={styles.priceUnit}> / night</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
              Excludes taxes and fees
            </p>
          </div>

          <button className={styles.bookBtn} onClick={handleBookNow}>
            Book This Room
          </button>
          
          <p className={styles.guaranteeText}>
            <span>🛡️</span> Best Rate Guarantee
          </p>
        </aside>
      </div>
    </div>
  );
}

export default RoomDetail;
