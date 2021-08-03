const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: String,
  active: Boolean,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Admin', AdminSchema);
