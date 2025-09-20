#!/bin/bash

# UBeU Local Development Environment Setup Script
# This script sets up the complete local development environment

set -e

echo "🚀 Setting up UBeU Local Development Environment"
echo "================================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "📦 Pulling latest Hedera local node image..."
docker pull gcr.io/hedera-registry/hedera-services/local-node:latest

echo "🏗️  Building UBeU service images..."
if command -v docker-compose &> /dev/null; then
    docker-compose build
else
    docker compose build
fi

echo "🚀 Starting all services..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
else
    docker compose up -d
fi

echo "⏳ Waiting for services to be healthy..."
echo "   - Hedera Local Node: http://localhost:5600"
echo "   - PostgreSQL: localhost:5433"
echo "   - Redis: localhost:6380"

# Wait for Hedera local node
echo "Waiting for Hedera Local Node..."
timeout=300
counter=0
while ! curl -f http://localhost:5600/api/v1/network/nodes > /dev/null 2>&1; do
    if [ $counter -ge $timeout ]; then
        echo "❌ Hedera Local Node failed to start within ${timeout} seconds"
        exit 1
    fi
    echo "   Waiting... (${counter}s)"
    sleep 10
    counter=$((counter + 10))
done

echo "✅ Hedera Local Node is ready!"

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
while ! docker exec ubeu-postgres pg_isready -U ubeu_admin -d ubeu_dev > /dev/null 2>&1; do
    echo "   Waiting for PostgreSQL..."
    sleep 5
done

echo "✅ PostgreSQL is ready!"

# Wait for Redis
echo "Waiting for Redis..."
while ! docker exec ubeu-redis redis-cli --raw incr ping > /dev/null 2>&1; do
    echo "   Waiting for Redis..."
    sleep 5
done

echo "✅ Redis is ready!"

echo ""
echo "🎉 Local development environment is ready!"
echo "============================================="
echo ""
echo "📋 Service URLs:"
echo "   - Identity Service:     http://localhost:3001"
echo "   - Domain Service:       http://localhost:3002"
echo "   - Treasury Service:     http://localhost:3003"
echo "   - Credential Service:   http://localhost:3004"
echo "   - Hedera Mirror Node:   http://localhost:5600"
echo ""
echo "🔧 Useful Commands:"
echo "   - View logs:           docker-compose logs -f [service-name]"
echo "   - Stop environment:    docker-compose down"
echo "   - Restart service:     docker-compose restart [service-name]"
echo "   - View running:        docker-compose ps"
echo ""
echo "📝 Next Steps:"
echo "   1. Deploy smart contracts: cd packages/contracts && npm run deploy:local"
echo "   2. Run integration tests: npm test"
echo "   3. Start frontend development"
echo ""
echo "Happy coding! 🚀"