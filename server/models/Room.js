const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: {
    adults: { type: Number, required: true },
    children: { type: Number, required: true }
  },
  amenities: [String],
  rating: { type: Number, default: 0 },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
