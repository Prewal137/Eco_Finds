@echo off
echo Starting EcoFinds Development Environment...
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo ========================================
echo BACKEND SETUP
echo ========================================

cd backend

echo Checking if backend dependencies are installed...
if not exist node_modules (
    echo Installing backend dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)

echo.
echo Checking environment file...
if not exist .env (
    echo Creating .env file from template...
    copy env.example .env
    echo.
    echo IMPORTANT: Please edit backend\.env file with your database credentials:
    echo - DB_HOST=localhost
    echo - DB_USER=your_mysql_username
    echo - DB_PASS=your_mysql_password
    echo - DB_NAME=ecofinds_db
    echo.
    echo Press any key after editing the .env file...
    pause
) else (
    echo .env file exists
)

echo.
echo Starting backend server...
echo Backend will run on http://localhost:5000
echo.
start "EcoFinds Backend" cmd /k "npm run dev"

echo.
echo ========================================
echo FRONTEND SETUP
echo ========================================

cd ..\Eco_Finds

echo Checking if frontend dependencies are installed...
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)

echo.
echo Checking frontend environment file...
if not exist .env.local (
    echo Creating .env.local file from template...
    copy env.example .env.local
    echo Frontend environment file created
) else (
    echo .env.local file exists
)

echo.
echo Starting frontend server...
echo Frontend will run on http://localhost:3000
echo.
start "EcoFinds Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Both servers are starting up...
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api
echo.
echo To test the connection, visit: http://localhost:3000/test-api
echo.
echo Press any key to exit this setup script...
pause >nul
