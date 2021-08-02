const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  photo: String,
  active: Boolean,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Product', ProductSchema);
