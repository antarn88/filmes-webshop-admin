const Bill = require('../../models/bill.model');
const baseService = require('../base/base.service');

const billService = baseService(Bill, ['customer', 'products']);

module.exports = billService;
