/* eslint-disable no-underscore-dangle */
const Product = require('../../models/product.model');

exports.create = (productData) => {
  const product = new Product(productData);
  return product.save();
};

exports.findAll = (filterRule = {}) => Product.find(filterRule);

exports.findOne = (id) => Product.findById(id);

exports.update = (updatedData) => Product.findByIdAndUpdate(updatedData._id, updatedData, {
  new: true, useFindAndModify: false,
});

exports.delete = (id) => Product.findByIdAndDelete(id);
