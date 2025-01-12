const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

//connection to database
mongoose.connect(
  'mongodb+srv://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASS +
    '@' +
    process.env.DB_CLUSTER +
    '.mongodb.net/?retryWrites=true&w=majority&appName=' +
    process.env.DB_NAME
);

//routes files
const userRoutes = require('./api/routes/users');
const messageRoutes = require('./api/routes/messages');

//express instance
const app = express();

//configure cors policy
app.use(cors());

//HTTP BODY
app.use(bodyParser.json());

//routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
