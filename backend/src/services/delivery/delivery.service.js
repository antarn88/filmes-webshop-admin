const mongoose = require('mongoose');
const Delivery = require('../../models/delivery.model');
const baseService = require('../base/base.service');

const deliveryService = baseService(Delivery, ['customer', 'products', 'order']);

deliveryService.deleteByOrderId = (orderId) => Delivery.findOneAndDelete({ order: mongoose.Types.ObjectId(orderId) });

module.exports = deliveryService;
