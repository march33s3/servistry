const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection module
const registrationRoutes = require('./routes/registration');


const app = express();
require("dotenv").config({ path: "./config.env"});
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/registration', registrationRoutes)

// Start server
app.listen(port, () => console.log('Server is running on port: ${port}'));
