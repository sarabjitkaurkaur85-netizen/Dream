import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  });

  
  const fetchStats = async () => {
    const res = await fetch('/api/admin/stats', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  };


  const fetchRooms = async () => {
    const res = await fetch('/api/admin/rooms', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  };

  const createRoom = async (data) => {
    const res = await fetch('/api/admin/rooms', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create room');
    return res.json();
  };

  const updateRoom = async (id, data) => {
    const res = await fetch(`/api/admin/rooms/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update room');
    return res.json();
  };

  const deleteRoom = async (id) => {
    const res = await fetch(`/api/admin/rooms/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete room');
    return res.json();
  };

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  };

  const updateBookingStatus = async (id, status) => {
    const res = await fetch(`/api/admin/bookings/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update booking status');
    return res.json();
  };

  const deleteBooking = async (id) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete booking');
    return res.json();
  };

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  };

  const createService = async (data) => {
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  };

  const updateService = async (id, data) => {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  };

  const deleteService = async (id) => {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  };

  
  const fetchTestimonials = async () => {
    const res = await fetch('/api/admin/testimonials', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  };

  const createTestimonial = async (data) => {
    const res = await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return res.json();
  };

  const updateTestimonial = async (id, data) => {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update testimonial');
    return res.json();
  };

  const deleteTestimonial = async (id) => {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    return res.json();
  };


  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  };

  const updateUserRole = async (id, role) => {
    const res = await fetch(`/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error('Failed to update user role');
    return res.json();
  };

  const deleteUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return res.json();
  };

  const value = {
    fetchStats,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    fetchBookings,
    updateBookingStatus,
    deleteBooking,
    fetchServices,
    createService,
    updateService,
    deleteService,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    fetchUsers,
    updateUserRole,
    deleteUser,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContext;
