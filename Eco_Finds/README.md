# EcoFinds - Sustainable Marketplace

A full-stack sustainable marketplace application built with Node.js, Express, MySQL, and Next.js.

## Features

- **User Authentication**: Secure login/signup with session management
- **Product Management**: Create, browse, and manage product listings
- **Shopping Cart**: Add items to cart and manage quantities
- **Order Management**: Create orders and track order status
- **User Dashboard**: Personal profile and activity tracking
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database with Sequelize ORM
- **Session-based authentication** with express-session
- **bcryptjs** for password hashing
- **CORS** enabled for frontend communication

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Hook Form** for form management
- **Lucide React** for icons

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=ecofinds_db

# Server Configuration
PORT=5000
SESSION_SECRET=your-super-secret-session-key-here

# Environment
NODE_ENV=development
```

4. Create the MySQL database:
```sql
CREATE DATABASE ecofinds_db;
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Database Schema

### Users Table
- `user_id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password_hash`
- `profile_pic`
- `createdAt`, `updatedAt`

### Products Table
- `product_id` (Primary Key)
- `title`
- `description`
- `price`
- `category`
- `condition`
- `brand`
- `location`
- `images` (JSON)
- `seller_id` (Foreign Key)
- `is_sold`
- `is_active`
- `createdAt`, `updatedAt`

### Cart Table
- `cart_id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity`
- `createdAt`, `updatedAt`

### Orders Table
- `order_id` (Primary Key)
- `buyer_id` (Foreign Key)
- `seller_id` (Foreign Key)
- `product_id` (Foreign Key)
- `total_amount`
- `status`
- `shipping_address`
- `payment_method`
- `notes`
- `createdAt`, `updatedAt`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Check session

### Products
- `GET /api/products` - Get all products (with pagination, filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated, owner only)
- `DELETE /api/products/:id` - Delete product (authenticated, owner only)
- `GET /api/products/user/my-products` - Get user's products (authenticated)

### Cart
- `GET /api/cart` - Get user's cart (authenticated)
- `POST /api/cart` - Add item to cart (authenticated)
- `PUT /api/cart/:id` - Update cart item (authenticated)
- `DELETE /api/cart/:id` - Remove from cart (authenticated)
- `DELETE /api/cart` - Clear cart (authenticated)

### Orders
- `POST /api/orders` - Create order (authenticated)
- `GET /api/orders/my-orders` - Get user's orders (authenticated)
- `GET /api/orders/my-sales` - Get user's sales (authenticated)
- `GET /api/orders/:id` - Get single order (authenticated)
- `PUT /api/orders/:id/status` - Update order status (authenticated, seller only)

## Usage

1. **Register/Login**: Create an account or login to access the marketplace
2. **Browse Products**: View all available products with filtering and search
3. **Create Listings**: Add your own products to sell
4. **Shopping Cart**: Add items to cart and manage quantities
5. **Place Orders**: Purchase items and track order status
6. **Dashboard**: View your profile, listings, and order history

## Development

### Backend Development
- The backend uses nodemon for auto-restart during development
- Database tables are automatically synced on server start
- Session store is configured with MySQL

### Frontend Development
- Uses Next.js App Router for modern React development
- TypeScript for type safety
- Tailwind CSS for responsive styling
- shadcn/ui for consistent component design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
