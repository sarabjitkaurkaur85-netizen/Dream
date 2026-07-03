import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

const API_BASE = (process.env.REACT_APP_API_URL || '') + '/api';

function Checkout() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('Your cart is empty');

    setLoading(true);

    try {
      // Create a booking for the first item in the cart (for simplicity)
      const room = cartItems[0];
      
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room._id || room.id,
          roomTitle: room.title,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          adults: formData.adults,
          children: formData.children,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert('Booking failed. Please check your details and try again.');
      }
    } catch (error) {
      alert('Error connecting to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.contentWrapper}>
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>🎉</span>
            <h2 className={styles.successTitle}>Booking Confirmed!</h2>
            <p className={styles.successText}>
              Thank you for choosing The Beach Hotel. We have sent a confirmation email with your booking details.
            </p>
            <button className={styles.checkoutBtn} style={{ width: 'auto', padding: '12px 32px' }} onClick={() => navigate('/')}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Complete Your Booking</h1>
      </div>

      <div className={styles.contentWrapper}>
        {/* Checkout Form */}
        <div className={styles.checkoutCard}>
          <h2 className={styles.sectionTitle}>Guest Details</h2>
          <form id="checkout-form" onSubmit={handleCheckout}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input 
                  type="text" 
                  name="guestName" 
                  className={styles.input} 
                  required 
                  value={formData.guestName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input 
                  type="email" 
                  name="guestEmail" 
                  className={styles.input} 
                  required 
                  value={formData.guestEmail}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-in Date *</label>
                <input 
                  type="date" 
                  name="checkIn" 
                  className={styles.input} 
                  required 
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-out Date *</label>
                <input 
                  type="date" 
                  name="checkOut" 
                  className={styles.input} 
                  required 
                  value={formData.checkOut}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Adults</label>
                <input 
                  type="number" 
                  name="adults" 
                  min="1" 
                  className={styles.input} 
                  value={formData.adults}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Children</label>
                <input 
                  type="number" 
                  name="children" 
                  min="0" 
                  className={styles.input} 
                  value={formData.children}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.summaryCard}>
          <h2 className={styles.sectionTitle}>Your Stay</h2>
          
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
              <button 
                className={styles.checkoutBtn} 
                onClick={() => navigate('/rooms')}
                style={{ marginTop: '16px' }}
              >
                Browse Rooms
              </button>
            </div>
          ) : (
            <>
              <div className={styles.cartItemsList}>
                {cartItems.map((item) => (
                  <div className={styles.cartItem} key={item.id || item._id}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <div className={styles.itemPrice}>${item.price} / night</div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id || item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotals}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Taxes & Fees (10%)</span>
                  <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form" 
                className={styles.checkoutBtn}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
