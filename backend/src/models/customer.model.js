const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  active: Boolean,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Customer', CustomerSchema);
