const Order = require('../../models/order.model');
const baseService = require('../base/base.service');

const orderService = baseService(Order, ['customer', 'bill', 'products']);

module.exports = orderService;
