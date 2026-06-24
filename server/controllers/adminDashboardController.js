const Room = require('../models/Room');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Service = require('../models/Service');

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const [totalRooms, totalBookings, totalUsers, totalServices, recentBookings] = await Promise.all([
      Room.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Service.countDocuments(),
      Booking.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    res.json({ totalRooms, totalBookings, totalUsers, totalServices, recentBookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStats };
