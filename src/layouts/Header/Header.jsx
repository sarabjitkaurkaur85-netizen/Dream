import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Header.module.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const headerClass = `${styles.header} ${scrolled ? styles.scrolled : ''} ${
    isHomePage && !scrolled ? styles.transparent : ''
  }`;

  return (
    <header className={headerClass} id="main-header">
      <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMain}>THE BEACH</span>
          <span className={styles.logoAccent}>HOTEL</span>
        </NavLink>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
          <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Home</NavLink></li>
          <li><NavLink to="/rooms" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Rooms</NavLink></li>
          <li><NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Services</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Contact</NavLink></li>

          {user ? (
            <>
              <li><NavLink to="/profile" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Profile</NavLink></li>
              {user.role === 'admin' && (
                <li><NavLink to="/admin" onClick={closeMenu} className={styles.adminLink}>Admin</NavLink></li>
              )}
            </>
          ) : (
            <li><NavLink to="/login" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : ''}>Login</NavLink></li>
          )}

          <li>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>

          <li
            className={styles.cartIcon}
            onClick={() => { navigate('/checkout'); closeMenu(); }}
            role="button"
            aria-label={`Cart with ${cartCount} items`}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/checkout')}
          >
            🛒 <span className={styles.count}>{cartCount}</span>
          </li>

          <li>
            <button className={styles.bookBtn} onClick={() => { navigate('/book'); closeMenu(); }}>
              Book Now
            </button>
          </li>
        </ul>

        <div className={styles.headerRight}>
          <button
            className={styles.themeToggleDesktop}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}

export default Header;