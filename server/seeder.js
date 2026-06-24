require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dbData = require('./data/db.json');

const Room = require('./models/Room');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const User = require('./models/User');

const seedDB = async () => {
  try {
    await connectDB();

    await Room.deleteMany();
    await Service.deleteMany();
    await Testimonial.deleteMany();
    await User.deleteMany();

    await Room.insertMany(dbData.rooms);
    await Service.insertMany(dbData.services);
    await Testimonial.insertMany(dbData.testimonials);

    // Create default admin user
    await User.create({
      name: 'Admin',
      email: 'admin@beachhotel.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
    });

    console.log('✅ Database Seeded Successfully!');
    console.log('📧 Admin login: admin@beachhotel.com / admin123');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
