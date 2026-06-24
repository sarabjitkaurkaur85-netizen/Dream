import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layouts/Layout';
import Home from './components/Home/Home';
import RoomDetail from './components/RoomDetail/RoomDetail';
import BookingPage from './components/BookingPage/BookingPage';
import RoomList from './components/RoomList/RoomList';
import Services from './components/Services/Services';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import VerifyEmail from './components/Auth/VerifyEmail';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import Contact from './components/Contact/Contact';


import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import RoomsManager from './components/Admin/RoomsManager';
import BookingsManager from './components/Admin/BookingsManager';
import ServicesManager from './components/Admin/ServicesManager';
import TestimonialsManager from './components/Admin/TestimonialsManager';
import UsersManager from './components/Admin/UsersManager';
import GalleryManager from './components/Admin/GalleryManager';
import CouponsManager from './components/Admin/CouponsManager';
import PaymentsManager from './components/Admin/PaymentsManager';
import ReportsManager from './components/Admin/ReportsManager';
import SettingsManager from './components/Admin/SettingsManager';

import { useAuth } from './context/AuthContext';

function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes with Header + Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

     
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<RoomsManager />} />
        <Route path="bookings" element={<BookingsManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="users" element={<UsersManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="coupons" element={<CouponsManager />} />
        <Route path="payments" element={<PaymentsManager />} />
        <Route path="reports" element={<ReportsManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>
    </Routes>
  );
}

export default App;