const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection module
const registrationRoutes = require('./routes/registration');
const authRoutes = require("./routes/auth"); // Import auth (login) routes


const app = express();
require("dotenv").config({ path: "./config.env"});
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins (You can specify your frontend origin instead for better security)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(express.json());

// Serve dynamic config.js file for client-side access to environment variables
app.get('/config.js', (req, res) => {
    const workspaceUrl = process.env.GITPOD_WORKSPACE_URL || `http://localhost:${port}`; // Use the Gitpod workspace URL or fallback to localhost
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`const WORKSPACE_URL = "${workspaceUrl}";`); // Inject the environment variable dynamically
});
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
  });

// Routes
app.use('/api/registration', registrationRoutes)
app.use('/api/user', authRoutes); // Authentication routes for login

// Start server
app.listen(port, () => console.log('Server is running on port: ${port}'));


