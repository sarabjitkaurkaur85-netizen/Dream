const Testimonial = require('../models/Testimonial');

// GET /api/admin/testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({ total: testimonials.length, testimonials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/testimonials
const createTestimonial = async (req, res) => {
  try {
    const { text, author, location } = req.body;
    if (!text || !author || !location) {
      return res.status(400).json({ error: 'text, author, and location are required' });
    }
    const testimonial = await Testimonial.create({ text, author, location });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admin/testimonials/:id
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    const { text, author, location } = req.body;
    testimonial.text = text ?? testimonial.text;
    testimonial.author = author ?? testimonial.author;
    testimonial.location = location ?? testimonial.location;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admin/testimonials/:id
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
