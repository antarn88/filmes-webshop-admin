const mongoose = require('mongoose');

const DeliverySchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
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

module.exports = mongoose.model('Delivery', DeliverySchema);
