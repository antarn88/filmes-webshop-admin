const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
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

module.exports = mongoose.model('Product', ProductSchema);
