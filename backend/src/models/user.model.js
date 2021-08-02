const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String,
  active: Boolean,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('User', UserSchema);
