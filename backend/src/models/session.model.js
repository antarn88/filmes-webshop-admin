const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Session', SessionSchema);
