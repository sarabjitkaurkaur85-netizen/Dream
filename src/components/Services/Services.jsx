import React, { useState, useEffect } from 'react';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import styles from './Services.module.css';

const SERVICES = [
  { id: 1, icon: '🍽️', title: 'Restaurant', desc: 'World-class cuisine prepared by Michelin-star chefs with ocean-view dining and live music every evening.', hours: '7:00 AM – 11:00 PM' },
  { id: 2, icon: '🏊', title: 'Swimming Pool', desc: 'Stunning infinity pool overlooking the ocean with poolside bar, cabana service, and sunset views.', hours: '7:00 AM – 9:00 PM' },
  { id: 3, icon: '💆', title: 'Luxury Spa', desc: 'Rejuvenate with traditional Balinese treatments, hot stone therapy, couples massages, and facial treatments.', hours: '9:00 AM – 8:00 PM' },
  { id: 4, icon: '🏋️', title: 'Fitness Center', desc: 'State-of-the-art equipment with personal trainers. Keep your routine while enjoying the ocean breeze.', hours: '6:00 AM – 10:00 PM' },
  { id: 5, icon: '🚖', title: 'Airport Pickup', desc: 'Luxury sedan or limousine transfer from the airport. Pre-book your hassle-free ride to paradise.', hours: '24/7 Available' },
  { id: 6, icon: '🧺', title: 'Laundry Service', desc: 'Professional dry cleaning and laundry with same-day express service available for guests.', hours: '8:00 AM – 6:00 PM' },
  { id: 7, icon: '📶', title: 'Free Wi-Fi', desc: 'High-speed fiber optic internet throughout the hotel. Stay connected with complimentary Wi-Fi.', hours: '24/7 Available' },
  { id: 8, icon: '🅿️', title: 'Valet Parking', desc: 'Complimentary valet parking service with secure underground garage and electric vehicle charging.', hours: '24/7 Available' },
  { id: 9, icon: '☕', title: 'Café & Lounge', desc: 'Artisan coffee, premium teas, and light bites in our elegant lobby lounge with garden views.', hours: '6:00 AM – 12:00 AM' },
  { id: 10, icon: '🎉', title: 'Conference Hall', desc: 'State-of-the-art conference facilities for up to 500 guests with AV equipment and catering.', hours: 'By Reservation' },
  { id: 11, icon: '💒', title: 'Wedding Hall', desc: 'Create your dream wedding in our stunning beachfront venue with professional event planning.', hours: 'By Reservation' },
  { id: 12, icon: '🏢', title: 'Business Center', desc: 'Fully equipped business meeting rooms with high-speed internet, printing, and secretarial services.', hours: '8:00 AM – 8:00 PM' },
];

function Services() {
  const gridRef = useStaggerAnimation();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>AMENITIES & SERVICES</span>
          <h1 className={styles.pageTitle}>Exceptional Services</h1>
          <p className={styles.pageSubtitle}>
            Elevate your stay with our world-class amenities designed for the ultimate luxury experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className={styles.contentWrapper}>
        <div className={styles.servicesGrid} ref={gridRef}>
          {SERVICES.map((svc, i) => (
            <div
              className={`${styles.serviceCard} scroll-animate delay-${(i % 4) + 1}`}
              key={svc.id}
              onClick={() => setSelectedService(svc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(svc);
                }
              }}
            >
              <div className={styles.serviceIcon}>{svc.icon}</div>
              <h3 className={styles.serviceTitle}>{svc.title}</h3>
              <p className={styles.serviceDesc}>{svc.desc}</p>
              <div className={styles.serviceHours}>
                <span className={styles.hoursIcon}>🕐</span>
                <span>{svc.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => setSelectedService(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>{selectedService.icon}</div>
              <h2 className={styles.modalTitle}>{selectedService.title}</h2>
              <div className={styles.modalHours}>
                <span className={styles.hoursIcon}>🕐</span>
                <span>Hours: {selectedService.hours}</span>
              </div>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalDesc}>{selectedService.desc}</p>
              <div className={styles.modalHighlights}>
                <h4>✨ Service Highlights</h4>
                <ul>
                  <li>Fully customizable experience tailored to your preferences</li>
                  <li>Available for all registered hotel guests</li>
                  <li>Premium service delivered by our trained hospitality professionals</li>
                </ul>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.inquireBtn}
                onClick={() => {
                  alert(`Inquiry sent for ${selectedService.title}! Our reception desk will contact you shortly.`);
                  setSelectedService(null);
                }}
              >
                Inquire / Book Service
              </button>
              <button className={styles.closeBtn} onClick={() => setSelectedService(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;

