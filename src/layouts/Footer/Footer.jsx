import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPinterestP } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterText}>
            <span className={styles.newsletterLabel}>NEWSLETTER</span>
            <h3 className={styles.newsletterTitle}>Subscribe for Exclusive Offers</h3>
            <p className={styles.newsletterSubtitle}>
              Get the latest deals, travel inspiration, and VIP access to special rates.
            </p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.newsletterInput}
                required
                id="newsletter-email"
              />
              <button type="submit" className={styles.newsletterBtn}>
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>

            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <div className={styles.footerLogo}>
                <span className={styles.logoMain}>THE BEACH</span>
                <span className={styles.logoGold}>HOTEL</span>
              </div>
              <p className={styles.footerText}>
                A haven of refined elegance on Bali's golden coast. 
                Where world-class hospitality meets breathtaking natural beauty.
              </p>
              <div className={styles.socialIcons}>
                <span className={styles.socialLink} aria-label="Instagram"><FaInstagram /></span>
                <span className={styles.socialLink} aria-label="Facebook"><FaFacebookF /></span>
                <span className={styles.socialLink} aria-label="Twitter"><FaTwitter /></span>
                <span className={styles.socialLink} aria-label="YouTube"><FaYoutube /></span>
                <span className={styles.socialLink} aria-label="Pinterest"><FaPinterestP /></span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerList}>
                <li><Link to="/rooms" className={styles.footerLink}>Rooms & Suites</Link></li>
                <li><Link to="/services" className={styles.footerLink}>Services & Dining</Link></li>
                <li><Link to="/book" className={styles.footerLink}>Book Now</Link></li>
                <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
                <li><Link to="/profile" className={styles.footerLink}>My Account</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className={styles.footerHeading}>Contact Info</h4>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span>Jl. Pantai Kuta, Bali, Indonesia</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>+62 812 3456 7890</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉️</span>
                  <span>stay@thebeachhotel.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🕐</span>
                  <span>24/7 Guest Support</span>
                </div>
              </div>

              <h4 className={styles.footerHeading} style={{ marginTop: '28px' }}>Opening Hours</h4>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🏨</span>
                  <span>Check-in: 2:00 PM</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🔑</span>
                  <span>Check-out: 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h4 className={styles.footerHeading}>Find Us</h4>
              <div className={styles.mapWrapper}>
                <iframe
                  title="hotel-location-map"
                  src="https://www.google.com/maps?q=Bali,Indonesia&output=embed"
                  loading="lazy"
                  className={styles.mapIframe}
                ></iframe>
              </div>
            </div>

          </div>

          <div className={styles.divider} />

          <div className={styles.copyright}>
            <p>
              © {new Date().getFullYear()} The Beach Hotel — 5-Star Luxury Resort & Spa. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="/#privacy">Privacy</a>
              <span>·</span>
              <a href="/#terms">Terms</a>
              <span>·</span>
              <a href="/#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
