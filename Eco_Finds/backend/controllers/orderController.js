const { Order, Product, User, Cart } = require('../models/association');

// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const { product_id, shipping_address, payment_method, notes } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get product details
    const product = await Product.findByPk(product_id, {
      include: [{ model: User, as: 'seller' }]
    });

    if (!product || !product.is_active || product.is_sold) {
      return res.status(404).json({ error: 'Product not available' });
    }

    // Check if user is trying to buy their own product
    if (product.seller_id === req.session.user.id) {
      return res.status(400).json({ error: 'Cannot buy your own product' });
    }

    // Create order
    const order = await Order.create({
      buyer_id: req.session.user.id,
      seller_id: product.seller_id,
      product_id: product.product_id,
      total_amount: product.price,
      shipping_address,
      payment_method,
      notes,
      status: 'pending'
    });

    // Mark product as sold
    await product.update({ is_sold: true });

    // Remove from cart if it exists
    await Cart.destroy({
      where: { user_id: req.session.user.id, product_id }
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const orders = await Order.findAll({
      where: { buyer_id: req.session.user.id },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'seller',
          attributes: ['username', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
};

// Get user's sales
exports.getUserSales = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const sales = await Order.findAll({
      where: { seller_id: req.session.user.id },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['username', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales', details: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const order = await Order.findByPk(id, {
      include: [{ model: Product, as: 'product' }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is the seller
    if (order.seller_id !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this order' });
    }

    await order.update({ status });
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order', details: err.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['username', 'email']
        },
        {
          model: User,
          as: 'seller',
          attributes: ['username', 'email']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is buyer or seller
    if (order.buyer_id !== req.session.user.id && order.seller_id !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
};
