-- EcoFinds Database Setup Script
-- Run this script in your MySQL database to create the EcoFinds database

-- Create database
CREATE DATABASE IF NOT EXISTS ecofinds_db;
USE ecofinds_db;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE IF NOT EXISTS Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    condition ENUM('New', 'Like New', 'Good', 'Needs Love') NOT NULL,
    brand VARCHAR(100),
    location VARCHAR(255),
    images JSON,
    seller_id INT NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Cart table
CREATE TABLE IF NOT EXISTS Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    product_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    payment_method VARCHAR(100),
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Create Sessions table for express-session
CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(128) COLLATE utf8mb4_bin NOT NULL,
    expires BIGINT UNSIGNED NOT NULL,
    data MEDIUMTEXT COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- Insert sample data (optional)
INSERT INTO Users (username, email, password_hash) VALUES 
('demo_user', 'demo@ecofinds.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('eco_seller', 'seller@ecofinds.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO Products (title, description, price, category, condition, brand, location, images, seller_id) VALUES 
('Vintage Leather Jacket', 'Beautiful vintage leather jacket in excellent condition. Perfect for autumn weather.', 2500.00, 'Fashion', 'Good', 'Vintage', 'Mumbai, Maharashtra', '["https://images.unsplash.com/photo-1549727453-6594d6e903d6?q=80&w=400&auto=format&fit=crop"]', 1),
('MacBook Pro 2019', 'Well-maintained MacBook Pro with 16GB RAM and 512GB SSD. Great for work and creative projects.', 45000.00, 'Electronics', 'Like New', 'Apple', 'Bangalore, Karnataka', '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop"]', 2),
('Wooden Coffee Table', 'Handcrafted wooden coffee table with modern design. Perfect for living room.', 8000.00, 'Furniture', 'Good', 'Handmade', 'Delhi, NCR', '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop"]', 1);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON Products(category);
CREATE INDEX idx_products_seller ON Products(seller_id);
CREATE INDEX idx_products_active ON Products(is_active, is_sold);
CREATE INDEX idx_orders_buyer ON Orders(buyer_id);
CREATE INDEX idx_orders_seller ON Orders(seller_id);
CREATE INDEX idx_cart_user ON Cart(user_id);

-- Show tables
SHOW TABLES;

-- Display sample data
SELECT 'Users' as Table_Name, COUNT(*) as Record_Count FROM Users
UNION ALL
SELECT 'Products', COUNT(*) FROM Products
UNION ALL
SELECT 'Cart', COUNT(*) FROM Cart
UNION ALL
SELECT 'Orders', COUNT(*) FROM Orders;
