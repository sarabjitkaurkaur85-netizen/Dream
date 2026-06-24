import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const API_BASE = 'http://localhost:5000/api';

/* ─── Fallback Data ─── */
const FALLBACK_ROOMS = [
  { id: 1, title: 'Deluxe Ocean View', price: 280, rating: 4.9, capacity: { adults: 2, children: 1 }, image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, title: 'Classic Comfort', price: 120, rating: 4.6, capacity: { adults: 2, children: 0 }, image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, title: 'Royal Suite', price: 450, rating: 5.0, capacity: { adults: 4, children: 2 }, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, title: 'Garden Villa', price: 350, rating: 4.8, capacity: { adults: 3, children: 1 }, image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, title: 'Presidential Suite', price: 680, rating: 5.0, capacity: { adults: 4, children: 2 }, image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, title: 'Beach Bungalow', price: 220, rating: 4.7, capacity: { adults: 2, children: 1 }, image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const FALLBACK_TESTIMONIALS = [
  { id: 1, text: 'Incredible experience. The service was impeccable and the views were absolutely breathtaking. Will definitely return!', author: 'Alexandra Chen', location: 'Singapore', rating: 5 },
  { id: 2, text: 'A truly magical stay. Every detail was thoughtfully curated. The spa treatments were heavenly.', author: 'James Thompson', location: 'London', rating: 5 },
  { id: 3, text: 'The Presidential Suite exceeded all expectations. Pure luxury at its finest. World-class hospitality.', author: 'Sofia Martinez', location: 'Madrid', rating: 5 },
];

const GALLERY_IMAGES = [
  { src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Restaurant' },
  { src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Rooms' },
  { src: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Pool' },
  { src: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Reception' },
  { src: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Garden' },
  { src: 'https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Spa' },
];

const WHY_CHOOSE_US = [
  { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary valet parking' },
  { icon: '🍽️', title: 'Restaurant', desc: 'Michelin-star dining' },
  { icon: '🚖', title: 'Airport Pickup', desc: 'Luxury transfer service' },
  { icon: '🏊', title: 'Swimming Pool', desc: 'Infinity pool with views' },
  { icon: '🥐', title: 'Free Breakfast', desc: 'Gourmet buffet daily' },
  { icon: '🔑', title: '24×7 Reception', desc: 'Always at your service' },
  { icon: '🛎️', title: 'Room Service', desc: 'Round-the-clock dining' },
  { icon: '📶', title: 'High-Speed Wi-Fi', desc: 'Complimentary throughout' },
];

function Home() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Animated counters
  const [yearsRef, yearsCount] = useAnimatedCounter(15, 2000);
  const [roomsCountRef, roomsCount] = useAnimatedCounter(120, 2000);
  const [guestsRef, guestsCount] = useAnimatedCounter(50000, 2500);
  const [ratingRef, ratingDisplay] = useAnimatedCounter(49, 2000); // 4.9 → display as 49, divide by 10

  // Stagger animation refs
  const aboutRef = useStaggerAnimation();
  const roomsGridRef = useStaggerAnimation();
  const whyRef = useStaggerAnimation();
  const testimonialRef = useStaggerAnimation();
  const galleryRef = useStaggerAnimation();

  useEffect(() => {
    fetch(`${API_BASE}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms((data.rooms || []).slice(0, 6)))
      .catch(() => setRooms(FALLBACK_ROOMS));

    fetch(`${API_BASE}/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data.length > 0 ? data : FALLBACK_TESTIMONIALS))
      .catch(() => setTestimonials(FALLBACK_TESTIMONIALS));
  }, []);

  const displayRooms = rooms.length > 0 ? rooms : FALLBACK_ROOMS;

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>★ ★ ★ ★ ★ LUXURY RESORT & SPA</span>
          <h1 className={styles.heroTitle}>
            Experience Luxury<br />Like Never Before
          </h1>
          <p className={styles.heroSubtitle}>
            Book premium rooms with world-class hospitality
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.heroBtn} onClick={() => navigate('/book')}>
              Book Now
            </button>
            <button className={styles.heroBtnOutline} onClick={() => navigate('/rooms')}>
              Explore Rooms
            </button>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ═══════════════ ABOUT HOTEL ═══════════════ */}
      <section className={styles.about} id="about" ref={aboutRef}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutText} scroll-animate-left`}>
              <span className={styles.sectionLabel}>ABOUT OUR HOTEL</span>
              <h2 className={styles.sectionTitle}>A Legacy of Elegance & Excellence</h2>
              <p className={styles.aboutDesc}>
                Nestled along Bali's pristine coastline, The Beach Hotel stands as a beacon of 
                refined luxury. For over 15 years, we've been crafting unforgettable experiences 
                for discerning travelers from around the world. Our commitment to excellence 
                is reflected in every detail — from our award-winning cuisine to our serene 
                spa retreats.
              </p>
              <div className={styles.aboutFeatures}>
                <span className={styles.aboutFeature}>✦ 5-Star Hotel</span>
                <span className={styles.aboutFeature}>✦ 15+ Years Experience</span>
                <span className={styles.aboutFeature}>✦ Award-Winning Service</span>
              </div>
            </div>
            <div className={`${styles.aboutStats} scroll-animate-right`}>
              <div className={styles.statCard}>
                <span className={styles.statNumber} ref={yearsRef}>{yearsCount}+</span>
                <span className={styles.statText}>Years of Excellence</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} ref={roomsCountRef}>{roomsCount}+</span>
                <span className={styles.statText}>Luxury Rooms</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} ref={guestsRef}>{guestsCount.toLocaleString()}+</span>
                <span className={styles.statText}>Happy Guests</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} ref={ratingRef}>{(ratingDisplay / 10).toFixed(1)}</span>
                <span className={styles.statText}>Guest Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AMENITIES STRIP ═══════════════ */}
      <section className={styles.amenitiesStrip}>
        <div className={styles.amenitiesInner}>
          {['Free Wi-Fi', 'Swimming Pool', 'Luxury Spa', 'Fitness Center', 'Fine Dining', 'Beach Access'].map((item, i) => (
            <div className={styles.amenityItem} key={i}>
              <span className={styles.amenityDot}>◆</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURED ROOMS ═══════════════ */}
      <section className={styles.roomsSection} id="rooms">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>ACCOMMODATION</span>
            <h2 className={styles.sectionTitle}>Featured Rooms & Suites</h2>
            <p className={styles.sectionSubtitle}>
              Discover our handpicked selection of premium accommodations designed for ultimate comfort.
            </p>
          </div>

          <div className={styles.roomsGrid} ref={roomsGridRef}>
            {displayRooms.map((room, i) => (
              <div className={`${styles.roomCard} scroll-animate delay-${(i % 3) + 1}`} key={room._id || room.id}>
                <div className={styles.roomImageWrapper}>
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    className={styles.roomImage}
                    loading="lazy"
                  />
                  <div className={styles.roomOverlay}>
                    <button className={styles.roomViewBtn} onClick={() => navigate(`/rooms/${room._id || room.id}`)}>
                      View Details
                    </button>
                  </div>
                  {room.rating && (
                    <div className={styles.roomRating}>
                      <span>⭐</span> {room.rating}
                    </div>
                  )}
                </div>
                <div className={styles.roomInfo}>
                  <h3 className={styles.roomName}>{room.title}</h3>
                  <div className={styles.roomMeta}>
                    <span>👤 {room.capacity?.adults || 2} Adults</span>
                    {(room.capacity?.children > 0) && <span>· 👶 {room.capacity.children} Children</span>}
                  </div>
                  <div className={styles.roomBottom}>
                    <div className={styles.roomPrice}>
                      <span className={styles.priceAmount}>${room.price}</span>
                      <span className={styles.priceUnit}>/ night</span>
                    </div>
                    <button className={styles.roomBookBtn} onClick={() => navigate('/book')}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <button className={styles.viewAllBtn} onClick={() => navigate('/rooms')}>
              View All Rooms →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className={styles.whySection} id="why-us">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>WHY CHOOSE US</span>
            <h2 className={styles.sectionTitle}>Unmatched Hospitality</h2>
            <p className={styles.sectionSubtitle}>
              Every detail is crafted to ensure your stay is nothing short of extraordinary.
            </p>
          </div>

          <div className={styles.whyGrid} ref={whyRef}>
            {WHY_CHOOSE_US.map((item, i) => (
              <div className={`${styles.whyCard} scroll-animate delay-${(i % 4) + 1}`} key={i}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h4 className={styles.whyTitle}>{item.title}</h4>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className={styles.testimonialSection} id="testimonials">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>GUEST REVIEWS</span>
            <h2 className={styles.sectionTitle}>What Our Guests Say</h2>
          </div>

          <div className={styles.testimonialGrid} ref={testimonialRef}>
            {(testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS).map((t, i) => (
              <div className={`${styles.testimonialCard} scroll-animate delay-${i + 1}`} key={t._id || t.id}>
                <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {(t.author || 'G')[0]}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.author}</div>
                    <div className={styles.authorLocation}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className={styles.gallerySection} id="gallery">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>GALLERY</span>
            <h2 className={styles.sectionTitle}>Explore Our Hotel</h2>
          </div>

          <div className={styles.galleryGrid} ref={galleryRef}>
            {GALLERY_IMAGES.map((img, i) => (
              <div 
                className={`${styles.galleryItem} ${i === 0 ? styles.galleryLarge : ''} scroll-animate-scale delay-${(i % 3) + 1}`}
                key={i}
              >
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryLabel}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <span className={styles.ctaLabel}>RESERVE YOUR STAY</span>
          <h2 className={styles.ctaTitle}>Ready for an Unforgettable Experience?</h2>
          <p className={styles.ctaSubtitle}>
            Book your dream stay today and enjoy exclusive benefits.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaBtn} onClick={() => navigate('/book')}>
              Book Now
            </button>
            <button className={styles.ctaBtnOutline} onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
