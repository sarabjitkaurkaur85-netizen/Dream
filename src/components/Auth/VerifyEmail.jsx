import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUserFromData } = useAuth();

  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/auth/verify/${token}`);
        const data = await res.json();

        if (res.ok) {
          // Auto-login after verification
          if (data.token) {
            localStorage.setItem('token', data.token);
            if (setUserFromData) setUserFromData(data);
          }
          setStatus('success');
          setMessage(data.message);
          setTimeout(() => navigate('/profile'), 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      } catch {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    };

    verify();
  }, [token, navigate, setUserFromData]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard} style={{ textAlign: 'center' }}>
        {status === 'verifying' && (
          <>
            <div className={styles.spinnerIcon}>⏳</div>
            <h2 className={styles.authTitle}>Verifying your email…</h2>
            <p className={styles.authSubtitle}>Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
            <h2 className={styles.authTitle}>Email Verified!</h2>
            <p className={styles.authSubtitle}>{message}</p>
            <p style={{ color: '#718096', fontSize: '14px', marginTop: '8px' }}>
              Redirecting you to your profile…
            </p>
            <Link to="/profile" className={styles.submitBtn} style={{ marginTop: '24px', display: 'inline-block' }}>
              Go to Profile
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>❌</div>
            <h2 className={styles.authTitle}>Verification Failed</h2>
            <p className={styles.authSubtitle} style={{ color: '#e53e3e' }}>{message}</p>
            <p style={{ color: '#718096', fontSize: '14px', marginTop: '8px' }}>
              The link may have expired. Request a new one below.
            </p>
            <Link to="/login" className={styles.submitBtn} style={{ marginTop: '24px', display: 'inline-block' }}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
