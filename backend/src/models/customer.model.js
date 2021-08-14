const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Customer', CustomerSchema);
