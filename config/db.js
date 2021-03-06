const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
    console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connectDB;