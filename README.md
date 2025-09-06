# 🌱 EcoFinds - Sustainable Marketplace

A full-stack e-commerce platform built with Next.js and Node.js, focused on promoting sustainable consumption through buying and selling pre-loved items.

## ✨ Features

### 🛍️ **Core Marketplace Features**
- **Product Browsing**: Browse products by category with search and filtering
- **Product Listings**: Create detailed product listings with multiple images
- **Shopping Cart**: Add items to cart and manage quantities
- **Checkout Process**: Complete purchase with shipping and payment details
- **Order Management**: Track orders and sales with status updates

### 👤 **User Management**
- **Authentication**: Secure user registration and login
- **User Profiles**: Manage personal information and preferences
- **Dashboard**: Comprehensive dashboard with stats and quick actions
- **Purchase History**: Track all purchases and their status
- **My Listings**: Manage your product listings

### 🌍 **Sustainability Focus**
- **Pre-loved Items**: Encourages reuse and reduces waste
- **Category Organization**: Easy browsing by product categories
- **Condition Tracking**: Clear item condition descriptions
- **Eco-friendly Design**: Clean, modern UI promoting sustainable values

## 🚀 Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **Sequelize** - ORM for database management
- **bcryptjs** - Password hashing
- **express-session** - Session management

## 📁 Project Structure

```
EcoFinds/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── Eco_Finds/             # Frontend Next.js app
│   ├── app/               # App Router pages
│   │   ├── auth/          # Authentication pages
│   │   ├── browse/        # Product browsing
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout process
│   │   ├── dashboard/     # User dashboard
│   │   ├── my-listings/   # User's product listings
│   │   ├── product/       # Product detail pages
│   │   └── sell/          # Create new listing
│   ├── components/        # Reusable components
│   ├── contexts/          # React contexts
│   ├── lib/               # Utility functions
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EcoFinds
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_USER=your_mysql_username
# DB_PASS=your_mysql_password
# DB_NAME=ecofinds_db
# PORT=5000
# SESSION_SECRET=your-secret-key

# Create database
mysql -u root -p < setup-database.sql

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Eco_Finds

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 📊 Database Schema

### **Users Table**
- `user_id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password_hash`
- `profile_pic`
- `createdAt`, `updatedAt`

### **Products Table**
- `product_id` (Primary Key)
- `title`, `description`, `price`
- `category`, `condition`, `brand`
- `location`, `images` (JSON)
- `seller_id` (Foreign Key)
- `is_sold`, `is_active`
- `createdAt`, `updatedAt`

### **Cart Table**
- `cart_id` (Primary Key)
- `user_id`, `product_id` (Foreign Keys)
- `quantity`
- `createdAt`, `updatedAt`

### **Orders Table**
- `order_id` (Primary Key)
- `buyer_id`, `seller_id`, `product_id` (Foreign Keys)
- `total_amount`, `status`
- `shipping_address`, `payment_method`, `notes`
- `createdAt`, `updatedAt`

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Check session

### **Products**
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)
- `GET /api/products/user/my-products` - Get user's products

### **Cart**
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `DELETE /api/cart` - Clear cart

### **Orders**
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/my-sales` - Get user's sales
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

## 🎯 Key Features Explained

### **Authentication System**
- Secure password hashing with bcryptjs
- Session-based authentication
- Protected routes and API endpoints
- User context management

### **Product Management**
- Image upload and management
- Category and condition tracking
- Search and filtering capabilities
- Seller information display

### **Shopping Experience**
- Add to cart functionality
- Quantity management
- Checkout process with shipping details
- Order status tracking

### **User Dashboard**
- Sales and purchase statistics
- Quick actions for common tasks
- Recent activity overview
- Revenue tracking

## 🔧 Development

### **Running in Development Mode**
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd Eco_Finds
npm run dev
```

### **Building for Production**
```bash
# Frontend
cd Eco_Finds
npm run build
npm start

# Backend
cd backend
npm start
```

## 🧪 Testing

The application includes comprehensive error handling and loading states:

- **API Error Handling**: Proper error messages and status codes
- **Loading States**: User-friendly loading indicators
- **Form Validation**: Client and server-side validation
- **Session Management**: Automatic session checking

## 🌟 Future Enhancements

- **Payment Integration**: Stripe/PayPal integration
- **Real-time Chat**: Seller-buyer communication
- **Review System**: Product and seller reviews
- **Mobile App**: React Native mobile application
- **Advanced Search**: Elasticsearch integration
- **Recommendation Engine**: AI-powered product suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** team for the amazing React framework
- **Express.js** community for the robust backend framework

---

**Built with ❤️ for a sustainable future** 🌱
