const Room = require('../models/Room');

// GET /api/admin/rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    res.json({ total: rooms.length, rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/rooms
const createRoom = async (req, res) => {
  try {
    const { title, type, description, price, capacity, amenities, rating, image } = req.body;

    if (!title || !type || !description || !price || !image) {
      return res.status(400).json({ error: 'title, type, description, price, and image are required' });
    }

    const room = await Room.create({
      title,
      type,
      description,
      price: Number(price),
      capacity: {
        adults: Number(capacity?.adults || 2),
        children: Number(capacity?.children || 0),
      },
      amenities: amenities || [],
      rating: Number(rating || 0),
      image,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admin/rooms/:id
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const { title, type, description, price, capacity, amenities, rating, image } = req.body;

    room.title = title ?? room.title;
    room.type = type ?? room.type;
    room.description = description ?? room.description;
    room.price = price !== undefined ? Number(price) : room.price;
    room.capacity = capacity
      ? { adults: Number(capacity.adults), children: Number(capacity.children) }
      : room.capacity;
    room.amenities = amenities ?? room.amenities;
    room.rating = rating !== undefined ? Number(rating) : room.rating;
    room.image = image ?? room.image;

    const updated = await room.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admin/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom };
