const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file


console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log the URI to ensure it's correct

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI is not defined');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;