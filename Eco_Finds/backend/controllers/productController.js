const { Product, User } = require('../models/association');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { is_active: true, is_sold: false };
    
    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['username', 'profile_pic']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    // Filter by search term if provided
    if (search) {
      products.rows = products.rows.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      products: products.rows,
      totalCount: products.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(products.count / limit)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['username', 'profile_pic', 'email']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, condition, brand, location, images } = req.body;
    
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      condition,
      brand,
      location,
      images: images || [],
      seller_id: req.session.user.id
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user owns the product
    if (product.seller_id !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    await product.update(updateData);
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user owns the product
    if (product.seller_id !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    await product.update({ is_active: false });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
};

// Get user's products
exports.getUserProducts = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const products = await Product.findAll({
      where: { seller_id: req.session.user.id },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['username', 'profile_pic']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user products', details: err.message });
  }
};
