const Product = require('../../models/product.model');
const baseService = require('../base/base.service');

const productService = baseService(Product);

module.exports = productService;
