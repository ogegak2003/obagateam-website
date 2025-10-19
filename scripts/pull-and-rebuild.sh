#!/bin/bash

echo "🚀 Pulling from Docker Hub and rebuilding obagaTeam..."

# Configuration
DOCKERHUB_USERNAME="ogegak2003"
BACKEND_IMAGE="obagateam-backend"
FRONTEND_IMAGE="obagateam-frontend"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop and remove all containers
echo "🛑 Stopping and removing existing containers..."
docker-compose down -v --remove-orphans

# Pull latest images from Docker Hub
echo "📥 Pulling latest images from Docker Hub..."

# Pull backend
echo "🔽 Pulling backend image..."
if docker pull $DOCKERHUB_USERNAME/$BACKEND_IMAGE:latest; then
    echo "✅ Backend image pulled successfully"
else
    echo "❌ Failed to pull backend image"
    exit 1
fi

# Pull frontend
echo "🔽 Pulling frontend image..."
if docker pull $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:latest; then
    echo "✅ Frontend image pulled successfully"
else
    echo "❌ Failed to pull frontend image"
    exit 1
fi

# Start services using production compose
echo "🚀 Starting services with pulled images..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to be ready..."
sleep 15

# Health checks
echo "🔍 Running health checks..."

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

# Check services
check_service "Backend API" 3001
check_service "Frontend" 80

# Final status
echo ""
echo "📊 Deployment Status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 Pull and rebuild completed!"
echo "🌐 Application: http://localhost"
echo "🔧 API: http://localhost:3001/api/health"
echo ""
echo "📦 Images used:"
echo "   Backend:  $DOCKERHUB_USERNAME/$BACKEND_IMAGE:latest"
echo "   Frontend: $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:latest"