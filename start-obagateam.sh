#!/bin/bash

echo "🚀 Starting obagaTeam Full Stack Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop existing containers
echo "🔄 Stopping existing containers..."
docker-compose down

# Remove orphaned containers
docker system prune -f

# Build and start services
echo "🐳 Building and starting services..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check service status
echo "🔍 Checking service status..."

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
    
    echo "❌ $service failed to start (port $port)"
    docker-compose logs $service
    return 1
}

# Check services
check_service "MongoDB" 27017
check_service "Backend API" 3001
check_service "Frontend" 80
check_service "Mongo Express" 8081

echo ""
echo "🎉 obagaTeam Application Status:"
docker-compose ps

echo ""
echo "🌐 Application URLs:"
echo "   Frontend Website: http://localhost"
echo "   Backend API:      http://localhost:3001"
echo "   MongoDB GUI:      http://localhost:8081"
echo "   API Health:       http://localhost:3001/api/health"
echo ""
echo "🔧 Management:"
echo "   View logs:        docker-compose logs -f"
echo "   Stop services:    docker-compose down"