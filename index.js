const dotenv = require('dotenv');
const express = require('express');
const cors = require("cors");
const indexRouter = require('./routes/index');
const formRouter = require('./routes/forms');
const attributeRouter = require('./routes/attributes');
const formAttributeRouter = require('./routes/formAttributes');

const mongoose = require('mongoose');

const mongoUsername = 'root';
const mongoPassword = 'root';
const mongoHost = '192.168.0.102';//'172.16.16.62';
const mongoPort = '27017';
const mongoDatabase = 'recommender_service'; // Replace with your actual database name

const mongoUri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;

mongoose.connect( mongoUri )
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));

// Load environment variables from .env file
dotenv.config();

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', indexRouter);
app.use('/forms', formRouter);
app.use('/attributes', attributeRouter);
app.use('/form_attributes', formAttributeRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
