const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Bill', BillSchema);
