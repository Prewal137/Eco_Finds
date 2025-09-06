#!/bin/bash

echo "Starting EcoFinds Development Environment..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version:"
node --version

echo
echo "========================================"
echo "BACKEND SETUP"
echo "========================================"

cd backend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install backend dependencies"
        exit 1
    fi
else
    echo "Backend dependencies already installed"
fi

echo
echo "Checking environment file..."
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp env.example .env
    echo
    echo "IMPORTANT: Please edit backend/.env file with your database credentials:"
    echo "- DB_HOST=localhost"
    echo "- DB_USER=your_mysql_username"
    echo "- DB_PASS=your_mysql_password"
    echo "- DB_NAME=ecofinds_db"
    echo
    echo "Press Enter after editing the .env file..."
    read
else
    echo ".env file exists"
fi

echo
echo "Starting backend server..."
echo "Backend will run on http://localhost:5000"
echo
gnome-terminal --title="EcoFinds Backend" -- bash -c "npm run dev; exec bash" 2>/dev/null || \
xterm -title "EcoFinds Backend" -e "npm run dev" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm run dev"' 2>/dev/null || \
echo "Please manually run: cd backend && npm run dev"

echo
echo "========================================"
echo "FRONTEND SETUP"
echo "========================================"

cd ../Eco_Finds

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "Frontend dependencies already installed"
fi

echo
echo "Checking frontend environment file..."
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file from template..."
    cp env.example .env.local
    echo "Frontend environment file created"
else
    echo ".env.local file exists"
fi

echo
echo "Starting frontend server..."
echo "Frontend will run on http://localhost:3000"
echo
gnome-terminal --title="EcoFinds Frontend" -- bash -c "npm run dev; exec bash" 2>/dev/null || \
xterm -title "EcoFinds Frontend" -e "npm run dev" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm run dev"' 2>/dev/null || \
echo "Please manually run: cd Eco_Finds && npm run dev"

echo
echo "========================================"
echo "SETUP COMPLETE!"
echo "========================================"
echo
echo "Both servers are starting up..."
echo
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo
echo "To test the connection, visit: http://localhost:3000/test-api"
echo
echo "Press Enter to exit..."
read
