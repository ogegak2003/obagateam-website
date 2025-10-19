#!/bin/bash

echo "🚀 Setting up obagaTeam Production Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️ MongoDB is not installed. Please install MongoDB for full functionality."
fi

# Check if Docker is installed (optional)
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
else
    echo "⚠️ Docker is not installed. Some features may not work."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p ssl

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Set up environment files
echo "🔧 Setting up environment files..."

# Frontend environment
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend .env file"
else
    echo "⚠️ Frontend .env already exists"
fi

# Backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend .env file"
else
    echo "⚠️ Backend .env already exists"
fi

# Set execute permissions
chmod +x scripts/*.sh

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in frontend/.env and backend/.env"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' in both frontend and backend directories"
echo "4. Or use 'docker-compose up -d' for containerized deployment"
echo ""
echo "For production deployment:"
echo "1. Update all environment variables for production"
echo "2. Set up SSL certificates in ssl/ directory"
echo "3. Run 'docker-compose -f docker-compose.prod.yml up -d'"