# Database Setup Guide for EcoFinds

## Prerequisites
- MySQL installed on your system
- MySQL service running

## Step 1: Create the Database
1. Open MySQL command line or MySQL Workbench
2. Run the following commands:

```sql
CREATE DATABASE IF NOT EXISTS ecofinds_db;
USE ecofinds_db;
```

## Step 2: Run the Setup Script
1. Copy the contents of `backend/setup-database.sql`
2. Run it in your MySQL database

## Step 3: Update Environment Variables
1. Copy `backend/env.example` to `backend/.env`
2. Update the database credentials in `.env`:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=ecofinds_db
PORT=5000
SESSION_SECRET=your-super-secret-session-key-here
NODE_ENV=development
```

## Step 4: Test the Setup
1. Start the backend server: `cd backend && npm start`
2. Test the ping endpoint: `curl http://localhost:5000/api/ping`
3. You should see: `{"message":"🚀 Backend is running and connected to MySQL!"}`

## Step 5: Test Authentication
1. Go to `http://localhost:3000/auth/signup`
2. Create a new account
3. Login and access the dashboard

## Troubleshooting
- If you get "Authentication required" errors, it means the database isn't set up yet
- Make sure MySQL is running and the database exists
- Check the backend console for any database connection errors
