const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
    cart_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Products',
            key: 'product_id'
        }
    },
    quantity: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1 
    }
}, {
    timestamps: true
});

module.exports = Cart;
