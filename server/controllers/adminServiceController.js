const Service = require('../models/Service');

// GET /api/admin/services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.json({ total: services.length, services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/services
const createService = async (req, res) => {
  try {
    const { title, description, image, hours } = req.body;
    if (!title || !description || !image || !hours) {
      return res.status(400).json({ error: 'title, description, image, and hours are required' });
    }
    const service = await Service.create({ title, description, image, hours });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admin/services/:id
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const { title, description, image, hours } = req.body;
    service.title = title ?? service.title;
    service.description = description ?? service.description;
    service.image = image ?? service.image;
    service.hours = hours ?? service.hours;

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admin/services/:id
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllServices, createService, updateService, deleteService };
