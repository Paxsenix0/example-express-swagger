const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('db connected');
    } catch (err) {
        console.error('db connection failed:', err.message);
    }
};

module.exports = connectDB;
