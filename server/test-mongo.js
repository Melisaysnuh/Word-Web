// test-mongo.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DATABASE_URL;



mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
