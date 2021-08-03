const Customer = require('../../models/customer.model');
const baseService = require('../base/base.service');

const customerService = baseService(Customer);

module.exports = customerService;
