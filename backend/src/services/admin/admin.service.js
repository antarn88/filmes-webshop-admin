const User = require('../../models/admin.model');

exports.create = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.findAll = (filterRule = {}) => User.find(filterRule);

exports.findOne = (id) => User.findById(id);

exports.update = (id, updatedData) => User.findByIdAndUpdate(id, updatedData, {
  new: true, useFindAndModify: false,
});

exports.delete = (id) => User.findByIdAndDelete(id);
