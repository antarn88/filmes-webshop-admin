/* eslint-disable no-unused-vars */
const config = require('config');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const logger = require('./config/logger');

const app = express();

// Authenctication.
const authHandler = require('./auth/authHandler');
const authenticateJwt = require('./auth/authenticate');

mongoose.Promise = global.Promise;

// Connect to MongoDB database
(async () => {
  try {
    const { host, user, password } = config.get('database');
    const connectionString = `mongodb+srv://${user}:${password}@${host}`;
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connection has been established successfully.');
  } catch (error) {
    logger.error(error.message);
    process.exit();
  }
})();

app.use(morgan('tiny', { stream: logger.stream }));

// app.use(express.static('public'));

app.use(express.json());

app.use(cors());

// Endpoints
app.post('/login', authHandler.login);
// app.use('/login', express.static('public'));
app.use('/products', authenticateJwt, require('./routes/product.routes'));
app.use('/customers', authenticateJwt, require('./routes/customer.routes'));
app.use('/admins', authenticateJwt, require('./routes/admin.routes'));
app.use('/bills', authenticateJwt, require('./routes/bill.routes'));
app.use('/orders', authenticateJwt, require('./routes/order.routes'));
app.use('/deliveries', authenticateJwt, require('./routes/delivery.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500);
  } else {
    res.status(err.statusCode);
  }
  logger.error(err.message);
  res.send(err.message);
});

module.exports = app;
