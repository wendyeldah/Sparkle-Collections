// cartItem.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1 // Default quantity is 1
  }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
