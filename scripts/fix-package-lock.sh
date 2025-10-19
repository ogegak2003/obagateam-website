#!/bin/bash

echo "🔧 Fixing package-lock.json files..."

# Fix backend package-lock.json
echo "📦 Fixing backend dependencies..."
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..

# Fix frontend package-lock.json
echo "📦 Fixing frontend dependencies..."
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..

echo "✅ Package-lock.json files have been updated!"
echo "💾 Don't forget to commit the changes:"
echo "   git add backend/package-lock.json frontend/package-lock.json"
echo "   git commit -m 'fix: update package-lock.json files'"
echo "   git push"