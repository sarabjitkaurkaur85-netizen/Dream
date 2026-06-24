import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import styles from './RoomList.module.css';

const API_BASE = 'http://localhost:5000/api';

const ROOM_TYPES = ['All', 'Single', 'Double', 'Deluxe', 'Family', 'Suite'];

const FALLBACK_ROOMS = [
  { id: 1, title: 'Deluxe Ocean View', type: 'Deluxe', price: 280, rating: 4.9, capacity: { adults: 2, children: 1 }, amenities: ['Free WiFi', 'Ocean View', 'Mini Bar', 'Balcony'], description: 'Spacious room with breathtaking ocean panorama and private balcony.', available: true, image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, title: 'Classic Single', type: 'Single', price: 95, rating: 4.5, capacity: { adults: 1, children: 0 }, amenities: ['Free WiFi', 'Air Conditioning', 'Room Service'], description: 'Elegant single room perfect for solo travelers.', available: true, image: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, title: 'Royal Suite', type: 'Suite', price: 680, rating: 5.0, capacity: { adults: 4, children: 2 }, amenities: ['Private Pool', 'Butler Service', 'Lounge', 'Jacuzzi'], description: 'The pinnacle of luxury with private pool and personal butler.', available: true, image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, title: 'Family Paradise', type: 'Family', price: 380, rating: 4.8, capacity: { adults: 2, children: 3 }, amenities: ['Kids Area', 'Free WiFi', 'Connecting Rooms', 'Beach Access'], description: 'Spacious family-friendly suite with kids play area.', available: false, image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, title: 'Double Comfort', type: 'Double', price: 180, rating: 4.7, capacity: { adults: 2, children: 1 }, amenities: ['Free WiFi', 'Garden View', 'Breakfast'], description: 'Cozy double room with lush garden views.', available: true, image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, title: 'Presidential Suite', type: 'Suite', price: 950, rating: 5.0, capacity: { adults: 4, children: 2 }, amenities: ['Helipad Access', 'Private Chef', 'Cinema Room', 'Spa'], description: 'Ultimate luxury for the most discerning guests.', available: true, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

function RoomList() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  const gridRef = useStaggerAnimation();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = (query = '') => {
    setLoading(true);
    fetch(`${API_BASE}/rooms${query}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.rooms || []);
        setLoading(false);
      })
      .catch(() => {
        setRooms(FALLBACK_ROOMS);
        setLoading(false);
      });
  };

  const displayRooms = (rooms.length > 0 ? rooms : FALLBACK_ROOMS).filter(room => {
    const matchesType = activeType === 'All' || room.type === activeType;
    const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = room.price <= maxPrice;
    return matchesType && matchesSearch && matchesPrice;
  });

  // Loading skeleton
  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={`skeleton ${styles.skeletonImage}`} />
      <div className={styles.skeletonContent}>
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
        <div className="skeleton skeleton-text" style={{ width: '60%' }} />
        <div className="skeleton skeleton-text" style={{ width: '40%' }} />
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>ACCOMMODATION</span>
          <h1 className={styles.pageTitle}>Rooms & Suites</h1>
          <p className={styles.pageSubtitle}>Find your perfect stay from our curated collection of luxury rooms</p>
        </div>
      </section>

      <div className={styles.contentWrapper}>
        {/* Search & Filters Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              id="room-search"
            />
          </div>

          <div className={styles.typeFilters}>
            {ROOM_TYPES.map(type => (
              <button
                key={type}
                className={`${styles.typeBtn} ${activeType === type ? styles.typeBtnActive : ''}`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className={styles.priceFilter}>
            <label className={styles.priceLabel}>Max: ${maxPrice}/night</label>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className={styles.priceRange}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsInfo}>
          <span>{displayRooms.length} room{displayRooms.length !== 1 ? 's' : ''} found</span>
        </div>

        {/* Room Grid */}
        <div className={styles.roomGrid} ref={gridRef}>
          {loading ? (
            <>
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </>
          ) : displayRooms.length === 0 ? (
            <div className={styles.noResults}>
              <span className={styles.noResultsIcon}>🔍</span>
              <h3>No rooms match your criteria</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            displayRooms.map((room, i) => (
              <div className={`${styles.roomCard} scroll-animate delay-${(i % 3) + 1}`} key={room._id || room.id}>
                <div className={styles.roomImageWrapper}>
                  <img src={room.image} alt={room.title} className={styles.roomImage} loading="lazy" />
                  <div className={styles.roomOverlay}>
                    <button className={styles.viewBtn} onClick={() => navigate(`/rooms/${room._id || room.id}`)}>
                      View Details
                    </button>
                  </div>
                  {room.rating && (
                    <div className={styles.ratingBadge}>⭐ {room.rating}</div>
                  )}
                  <div className={`${styles.availBadge} ${room.available !== false ? styles.availYes : styles.availNo}`}>
                    {room.available !== false ? 'Available' : 'Sold Out'}
                  </div>
                  {room.type && <div className={styles.typeBadge}>{room.type}</div>}
                </div>

                <div className={styles.roomInfo}>
                  <h3 className={styles.roomName}>{room.title}</h3>
                  <p className={styles.roomDesc}>{room.description || 'Luxury stay experience with premium amenities.'}</p>

                  <div className={styles.roomMeta}>
                    <span>👤 {room.capacity?.adults || 2} Adults</span>
                    {(room.capacity?.children > 0) && <span>· 👶 {room.capacity.children} Children</span>}
                  </div>

                  {room.amenities && (
                    <div className={styles.amenities}>
                      {room.amenities.slice(0, 4).map((a, j) => (
                        <span className={styles.amenityTag} key={j}>{a}</span>
                      ))}
                    </div>
                  )}

                  <div className={styles.roomBottom}>
                    <div className={styles.roomPrice}>
                      <span className={styles.priceAmount}>${room.price}</span>
                      <span className={styles.priceUnit}>/ night</span>
                    </div>
                    <button
                      className={styles.bookBtn}
                      onClick={() => navigate('/book')}
                      disabled={room.available === false}
                    >
                      {room.available !== false ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomList;
