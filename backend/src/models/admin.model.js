const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String,
  active: Boolean,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Admin', AdminSchema);
