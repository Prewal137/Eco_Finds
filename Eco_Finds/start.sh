#!/bin/bash

echo "Starting EcoFinds Application..."
echo

echo "Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
