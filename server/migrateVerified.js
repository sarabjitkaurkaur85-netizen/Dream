require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const result = await User.updateMany(
    { isVerified: { $ne: true } },
    { $set: { isVerified: true } }
  );
  console.log(`✅ Marked ${result.modifiedCount} existing user(s) as verified.`);
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
