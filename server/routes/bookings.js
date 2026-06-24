const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings — create a new booking
router.post('/', async (req, res) => {
  try {
    const { roomId, roomTitle, checkIn, checkOut, adults, children, guestName, guestEmail } = req.body;

    if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return res.status(400).json({ error: 'Missing required fields: roomId, checkIn, checkOut, guestName, guestEmail' });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }

    const booking = new Booking({
      roomId,
      roomTitle: roomTitle || '',
      checkIn,
      checkOut,
      adults: adults || 1,
      children: children || 0,
      guestName,
      guestEmail
    });

    const createdBooking = await booking.save();
    res.status(201).json({ message: 'Booking confirmed!', booking: createdBooking });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/bookings — list all bookings
router.get('/', async (_req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json({ total: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/bookings/:id — get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
