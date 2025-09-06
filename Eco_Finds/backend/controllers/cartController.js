const { Cart, Product, User } = require('../models/association');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const cartItems = await Cart.findAll({
      where: { user_id: req.session.user.id },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: User,
              as: 'seller',
              attributes: ['username']
            }
          ]
        }
      ]
    });

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart', details: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if product exists and is available
    const product = await Product.findByPk(product_id);
    if (!product || !product.is_active || product.is_sold) {
      return res.status(404).json({ error: 'Product not available' });
    }

    // Check if item already in cart
    const existingItem = await Cart.findOne({
      where: { user_id: req.session.user.id, product_id }
    });

    if (existingItem) {
      await existingItem.update({ quantity: existingItem.quantity + quantity });
      res.json({ message: 'Cart updated', item: existingItem });
    } else {
      const cartItem = await Cart.create({
        user_id: req.session.user.id,
        product_id,
        quantity
      });
      res.status(201).json({ message: 'Item added to cart', item: cartItem });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const cartItem = await Cart.findOne({
      where: { cart_id: id, user_id: req.session.user.id }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      res.json({ message: 'Item removed from cart' });
    } else {
      await cartItem.update({ quantity });
      res.json({ message: 'Cart updated', item: cartItem });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart', details: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const cartItem = await Cart.findOne({
      where: { cart_id: id, user_id: req.session.user.id }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart', details: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    await Cart.destroy({ where: { user_id: req.session.user.id } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart', details: err.message });
  }
};
