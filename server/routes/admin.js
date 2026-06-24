const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const adminDashboardController = require('../controllers/adminDashboardController');
const adminRoomController = require('../controllers/adminRoomController');
const adminBookingController = require('../controllers/adminBookingController');
const adminServiceController = require('../controllers/adminServiceController');
const adminTestimonialController = require('../controllers/adminTestimonialController');
const adminUserController = require('../controllers/adminUserController');

// Apply protect + adminOnly to ALL admin routes
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', adminDashboardController.getStats);

// Rooms
router.get('/rooms', adminRoomController.getAllRooms);
router.post('/rooms', adminRoomController.createRoom);
router.put('/rooms/:id', adminRoomController.updateRoom);
router.delete('/rooms/:id', adminRoomController.deleteRoom);

// Bookings
router.get('/bookings', adminBookingController.getAllBookings);
router.put('/bookings/:id/status', adminBookingController.updateBookingStatus);
router.delete('/bookings/:id', adminBookingController.deleteBooking);

// Services
router.get('/services', adminServiceController.getAllServices);
router.post('/services', adminServiceController.createService);
router.put('/services/:id', adminServiceController.updateService);
router.delete('/services/:id', adminServiceController.deleteService);

// Testimonials
router.get('/testimonials', adminTestimonialController.getAllTestimonials);
router.post('/testimonials', adminTestimonialController.createTestimonial);
router.put('/testimonials/:id', adminTestimonialController.updateTestimonial);
router.delete('/testimonials/:id', adminTestimonialController.deleteTestimonial);

// Users
router.get('/users', adminUserController.getAllUsers);
router.put('/users/:id/role', adminUserController.updateUserRole);
router.delete('/users/:id', adminUserController.deleteUser);

module.exports = router;
