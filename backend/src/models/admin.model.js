const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
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

module.exports = mongoose.model('Admin', AdminSchema);
