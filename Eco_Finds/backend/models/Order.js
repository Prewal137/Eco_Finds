const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    order_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    buyer_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    seller_id: { 
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
    total_amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    status: { 
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'), 
        defaultValue: 'pending' 
    },
    shipping_address: { 
        type: DataTypes.TEXT 
    },
    payment_method: { 
        type: DataTypes.STRING 
    },
    notes: { 
        type: DataTypes.TEXT 
    }
}, {
    timestamps: true
});

module.exports = Order;
