const express = require("express");

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Initialize middleware
app.use(express.json());

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require('./routes/profile'));

// Create server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));