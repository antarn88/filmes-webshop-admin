const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  bill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Order', OrderSchema);
