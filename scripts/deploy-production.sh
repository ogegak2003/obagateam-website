#!/bin/bash

# Configuration
DOCKERHUB_USERNAME="ogegak2003"
BACKEND_IMAGE="obagateam-backend"
FRONTEND_IMAGE="obagateam-frontend"

echo "🚀 Deploying obagaTeam to production..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env.production exists, create if not
if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production not found. Creating with default values..."
    cat > .env.production << EOF
# Production Environment Variables
JWT_SECRET=obagateam-production-secret-$(date +%s)
MONGODB_URI=mongodb://mongodb:27017/obagateam
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost
VITE_BACKEND_URL=http://localhost:3001
EOF
    echo "✅ Created .env.production with default values"
    echo "🔐 Please update JWT_SECRET with a secure value for production!"
fi

# Load environment variables
set -a
source .env.production
set +a

# Pull latest images
echo "📥 Pulling latest images..."
docker pull $DOCKERHUB_USERNAME/$BACKEND_IMAGE:latest
docker pull $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:latest

# Stop and remove existing containers
echo "🔄 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Start new containers
echo "🎯 Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Health checks
echo "🔍 Running health checks..."
sleep 15

# Function to check service health
check_service() {
    local service=$1
    local port=$2
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port > /dev/null 2>&1; then
            echo "✅ $service is healthy (port $port)"
            return 0
        fi
        echo "⏳ Waiting for $service... (attempt $attempt/$max_attempts)"
        sleep 5
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service health check failed (port $port)"
    docker-compose -f docker-compose.prod.yml logs $service
    return 1
}

# Check backend
check_service "Backend API" 3001

# Check frontend
check_service "Frontend" 80

# Final status check
echo ""
echo "📊 Final Service Status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 Deployment completed successfully!"
echo "🌐 Application: http://localhost"
echo "🔧 API: http://localhost:3001/api/health"
echo "📊 MongoDB: localhost:27017"
echo ""
echo "🔧 Management Commands:"
echo "   View logs:        docker-compose -f docker-compose.prod.yml logs -f"
echo "   Stop services:    docker-compose -f docker-compose.prod.yml down"
echo "   Restart backend:  docker-compose -f docker-compose.prod.yml restart backend"
echo "   Restart frontend: docker-compose -f docker-compose.prod.yml restart frontend"