// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route for adding an item to the cart
router.post('/add', cartController.addItemToCart);

// Route for removing an item from the cart
router.delete('/remove/:productId', cartController.removeItemFromCart);

// Route for getting all items in the cart
router.get('/', cartController.getCartItems);

// Route for updating the quantity of a product in the cart
router.put('/update/:productId', cartController.updateCartItemQuantity);

module.exports = router;
