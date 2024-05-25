// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  current_price: {
    type: Number,
    required: true
  },
  previous_price: {
    type: Number,
    required: true
  },
  product_details:{
    type: [String],
    required:true
  },
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  rating:{
    type:Number,
    required: true
  },
  category: {
    type: String,
    enum: ['women', 'footwear', 'kids', 'accessories', 'mens', 'unisex'], // Enumerated list of allowed categories
    required: true
  },
  isNew: {
    type: Boolean,
    default: false // Default value is false, meaning the product is not new
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
