const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    product_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    price: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    category: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    condition: { 
        type: DataTypes.ENUM('New', 'Like New', 'Good', 'Needs Love'), 
        allowNull: false 
    },
    brand: { 
        type: DataTypes.STRING 
    },
    location: { 
        type: DataTypes.STRING 
    },
    images: { 
        type: DataTypes.JSON 
    },
    seller_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    is_sold: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
}, {
    timestamps: true
});

module.exports = Product;
