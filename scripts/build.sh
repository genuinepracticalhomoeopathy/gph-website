#!/bin/bash

echo "🚀 Starting production build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output is in the .next directory"
    echo "🌐 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "📋 Build Summary:"
echo "- Static pages generated"
echo "- API routes optimized"
echo "- Client-side bundles created"
echo "- Ready for production deployment"