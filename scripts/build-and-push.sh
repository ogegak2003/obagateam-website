#!/bin/bash

# Configuration
DOCKERHUB_USERNAME="ogegak2003"
BACKEND_IMAGE="obagateam-backend"
FRONTEND_IMAGE="obagateam-frontend"
TAG="latest"

echo "🚀 Building and pushing Docker images to Docker Hub..."

# Check if user is logged in to Docker Hub
if ! docker info | grep -q "Username: $DOCKERHUB_USERNAME"; then
    echo "❌ Please login to Docker Hub first:"
    echo "   docker login -u $DOCKERHUB_USERNAME"
    exit 1
fi

# Build and push backend
echo "🔨 Building backend image..."
docker build -t $DOCKERHUB_USERNAME/$BACKEND_IMAGE:$TAG -f backend/Dockerfile.prod backend/

if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

echo "📦 Pushing backend image..."
docker push $DOCKERHUB_USERNAME/$BACKEND_IMAGE:$TAG

if [ $? -ne 0 ]; then
    echo "❌ Backend push failed"
    exit 1
fi

# Build and push frontend
echo "🔨 Building frontend image..."
docker build -t $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:$TAG -f frontend/Dockerfile.prod frontend/

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    echo "💡 Try: cd frontend && npm install && cd .."
    exit 1
fi

echo "📦 Pushing frontend image..."
docker push $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:$TAG

if [ $? -ne 0 ]; then
    echo "❌ Frontend push failed"
    exit 1
fi

echo ""
echo "🎉 Successfully pushed images to Docker Hub!"
echo "📦 Backend: $DOCKERHUB_USERNAME/$BACKEND_IMAGE:$TAG"
echo "📦 Frontend: $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:$TAG"
echo ""
echo "🚀 To deploy using these images:"
echo "   ./scripts/deploy-production.sh"