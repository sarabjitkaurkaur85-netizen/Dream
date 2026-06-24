const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET /api/rooms — list all rooms with optional filters
router.get('/', async (req, res) => {
  try {
    const { type, minPrice, maxPrice, adults, rating, sort } = req.query;
    
    let query = {};
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (adults) query['capacity.adults'] = { $gte: Number(adults) };
    if (rating) query.rating = { $gte: Number(rating) };

    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    else if (sort === 'price_desc') sortOption.price = -1;
    else if (sort === 'rating') sortOption.rating = -1;

    const rooms = await Room.find(query).sort(sortOption);
    res.json({ total: rooms.length, rooms });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/rooms/:id — single room detail
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
