const mongoose = require('mongoose');

const RestoreAccountTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('Restore_Account_Token', RestoreAccountTokenSchema);
