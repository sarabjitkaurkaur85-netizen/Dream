import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser({ ...data, token });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // If unverified, attach extra info to the error
      const err = new Error(data.error || 'Failed to login');
      err.unverified = data.unverified || false;
      err.email = data.email || email;
      throw err;
    }

    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to register');
    }

    // Registration no longer auto-logs in — user must verify email first
    return data;
  };

  // Called after email verification to auto-login
  const setUserFromData = (data) => {
    if (data?.token) {
      localStorage.setItem('token', data.token);
      setUser(data);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin, setUserFromData }}>
      {children}
    </AuthContext.Provider>
  );
};
