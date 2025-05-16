const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDB() {
    try {
        const uri = process.env.MONGODB_URL;

        if (!uri) {
            throw new Error("MONGODB_URL is not defined in the .env file");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Database Connected!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit the process on DB failure
    }
}

module.exports = { connectDB };
