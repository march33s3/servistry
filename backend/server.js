const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/registration');


const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env"});
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
//app.use(require("./routes/record"));

app.use('/api/registration', registrationRoutes)

app.listen(port, () => console.log('Server is running on port: ${port}'));
