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

// Serve dynamic config.js file for client-side access to environment variables
app.get('/config.js', (req, res) => {
    const workspaceUrl = process.env.GITPOD_WORKSPACE_URL || `http://localhost:${port}`; // Use the Gitpod workspace URL or fallback to localhost
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`const WORKSPACE_URL = "${workspaceUrl}";`); // Inject the environment variable dynamically
});

// Routes
app.use('/api/registration', registrationRoutes)

// Start server
app.listen(port, () => console.log('Server is running on port: ${port}'));
