/* eslint-disable no-unused-vars */
const config = require('config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const logger = require('./config/logger');

const app = express();

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

app.use(express.json());

app.use(cors());

app.use('/products', require('./routes/product.routes'));
app.use('/customers', require('./routes/customer.routes'));
app.use('/admins', require('./routes/admin.routes'));
app.use('/bills', require('./routes/bill.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500);
  } else {
    res.status(err.statusCode);
  }
  logger.error(err.message);
  res.send('An error occurred.');
});

module.exports = app;
