// cartController.js

const CartItem = require('../models/cartItem');

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({ productId });

    if (cartItem) {
      // If item exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If item doesn't exist, create new cart item
      cartItem = new CartItem({ productId, quantity });
      await cartItem.save();
    }

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  const productId = req.params.productId;
  try {
    await CartItem.deleteOne({ productId });
    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Get all items from cart
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
// Update quantity of a product in the cart
exports.updateCartItemQuantity = async (req, res) => {
  const productId = req.params.productId;
  const { quantity } = req.body;
  try {
    let cartItem = await CartItem.findOne({ productId });

    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};