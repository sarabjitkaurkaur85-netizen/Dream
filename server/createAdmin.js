require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Connect to the database
    await connectDB();

    const adminEmail = 'admin@beachhotel.com';

    // Check if user already exists
    const userExists = await User.findOne({ email: adminEmail.toLowerCase().trim() });
    if (userExists) {
      console.log(`❌ User with email ${adminEmail} already exists.`);
      process.exit(0);
    }

    // Create the admin user (automatically verified)
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: 'admin123', // This will be encrypted automatically by the pre-save schema middleware
      role: 'admin',
      isVerified: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@beachhotel.com');
    console.log('🔑 Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error creating admin user: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
