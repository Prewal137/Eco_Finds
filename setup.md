# EcoFinds - Frontend & Backend Setup Guide

This guide will help you set up both the frontend (Next.js) and backend (Node.js/Express) for the EcoFinds application.

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `env.example` to `.env`
   - Update the database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASS=your_mysql_password
   DB_NAME=ecofinds_db
   PORT=5000
   SESSION_SECRET=your-super-secret-session-key-here
   NODE_ENV=development
   ```

4. **Create the MySQL database:**
   ```sql
   CREATE DATABASE ecofinds_db;
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Eco_Finds
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `env.example` to `.env.local`
   - Update the API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Check session

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)
- `GET /api/products/user/my-products` - Get user's products (auth required)

### Cart
- `GET /api/cart` - Get user's cart (auth required)
- `POST /api/cart` - Add item to cart (auth required)
- `PUT /api/cart/:id` - Update cart item (auth required)
- `DELETE /api/cart/:id` - Remove from cart (auth required)
- `DELETE /api/cart` - Clear cart (auth required)

### Orders
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders/my-orders` - Get user's orders (auth required)
- `GET /api/orders/my-sales` - Get user's sales (auth required)
- `GET /api/orders/:id` - Get single order (auth required)
- `PUT /api/orders/:id/status` - Update order status (auth required)

## Database Schema

The application uses the following main tables:
- `Users` - User accounts
- `Products` - Product listings
- `Cart` - Shopping cart items
- `Orders` - Purchase orders

## Testing the Connection

1. Start both servers (backend on port 5000, frontend on port 3000)
2. Visit `http://localhost:3000` to see the frontend
3. Try registering a new account
4. Browse products and test the functionality

## Troubleshooting

### Backend Issues
- Ensure MySQL is running and accessible
- Check that the database credentials in `.env` are correct
- Verify that the database `ecofinds_db` exists

### Frontend Issues
- Ensure the backend is running on port 5000
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Clear browser cache if you see CORS errors

### Common Issues
- **CORS errors**: Make sure both servers are running and the frontend URL is whitelisted in the backend CORS settings
- **Database connection errors**: Verify MySQL is running and credentials are correct
- **Session issues**: Ensure `SESSION_SECRET` is set in the backend `.env` file

## Development Notes

- The backend automatically creates database tables on startup
- Sessions are stored in MySQL for persistence
- The frontend uses React Context for authentication state
- All API calls include credentials for session management
