/* eslint-disable no-unused-vars */
const config = require('config');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { join } = require('path');

const logger = require('./config/logger');

const app = express();

// Authenctication.
const authHandler = require('./auth/authHandler');
const authenticateJwt = require('./auth/authenticate');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

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

// @ts-ignore
app.use(morgan('tiny', { stream: logger.stream }));

app.use(express.json());

app.use(cors());

// Backend routes
app.post('/api/login', authHandler.login);
app.use('/api/products', authenticateJwt, require('./routes/product.routes'));
app.use('/api/customers', authenticateJwt, require('./routes/customer.routes'));
app.use('/api/admins', authenticateJwt, require('./routes/admin.routes'));
app.use('/api/bills', authenticateJwt, require('./routes/bill.routes'));
app.use('/api/orders', authenticateJwt, require('./routes/order.routes'));
app.use('/api/deliveries', authenticateJwt, require('./routes/delivery.routes'));

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use public folder for frontend
app.use(express.static('public'));

// Frontend routing to force
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

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
