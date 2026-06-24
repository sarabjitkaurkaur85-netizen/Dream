import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState(''); // '' | 'sending' | 'sent' | 'error'

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverified(false);
    setResendStatus('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      // Check if backend returned unverified flag via the error message
      if (err.unverified) {
        setUnverified(true);
        setUnverifiedEmail(err.email || email);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unverifiedEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendStatus('sent');
      } else {
        setResendStatus('error');
        setError(data.error || 'Failed to resend email.');
      }
    } catch {
      setResendStatus('error');
      setError('Failed to resend email. Please try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Welcome Back</h2>
        <p className={styles.authSubtitle}>Sign in to manage your bookings</p>

        {/* Generic error */}
        {error && <div className={styles.authError}>{error}</div>}

        {/* Unverified account banner */}
        {unverified && (
          <div className={styles.authWarning}>
            <p>📧 <strong>Email not verified.</strong></p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>
              Check your inbox at <strong>{unverifiedEmail}</strong> for a verification link.
            </p>
            {resendStatus === '' && (
              <button className={styles.resendBtn} onClick={handleResend}>
                Resend verification email
              </button>
            )}
            {resendStatus === 'sending' && (
              <p style={{ fontSize: '13px', color: '#718096', marginTop: '8px' }}>Sending…</p>
            )}
            {resendStatus === 'sent' && (
              <p style={{ fontSize: '13px', color: '#38a169', marginTop: '8px' }}>
                ✅ Verification email sent! Check your inbox.
              </p>
            )}
            {resendStatus === 'error' && (
              <p style={{ fontSize: '13px', color: '#e53e3e', marginTop: '8px' }}>
                ❌ Failed to send. Please try again.
              </p>
            )}
          </div>
        )}

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.authSwitch}>
          Don't have an account?
          <Link to="/signup" className={styles.authLink}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
