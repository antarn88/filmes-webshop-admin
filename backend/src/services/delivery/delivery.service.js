const Delivery = require('../../models/delivery.model');
const baseService = require('../base/base.service');

const deliveryService = baseService(Delivery, ['customer', 'products']);

module.exports = deliveryService;
