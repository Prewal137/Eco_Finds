const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');

// User associations
User.hasMany(Product, { foreignKey: 'seller_id', as: 'products' });
User.hasMany(Cart, { foreignKey: 'user_id', as: 'cartItems' });
User.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
User.hasMany(Order, { foreignKey: 'seller_id', as: 'sales' });

// Product associations
Product.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
Product.hasMany(Cart, { foreignKey: 'product_id', as: 'cartItems' });
Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Order associations
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });
Order.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
  User,
  Product,
  Cart,
  Order
};
