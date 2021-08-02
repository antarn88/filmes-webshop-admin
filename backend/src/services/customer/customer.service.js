const Customer = require('../../models/customer.model');

exports.create = (customerData) => {
  const customer = new Customer(customerData);
  return customer.save();
};

exports.findAll = (filterRule = {}) => Customer.find(filterRule);

exports.findOne = (id) => Customer.findById(id);

exports.update = (id, updatedData) => Customer.findByIdAndUpdate(id, updatedData, {
  new: true, useFindAndModify: false,
});

exports.delete = (id) => Customer.findByIdAndDelete(id);
