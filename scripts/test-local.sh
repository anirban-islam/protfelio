#!/bin/bash

echo "🧪 Running local tests..."

# Run linting
echo "📝 Running ESLint..."
npm run lint

# Run type checking
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

# Run unit tests
echo "🧪 Running unit tests..."
npm run test

# Install Playwright if needed
if ! command -v playwright &> /dev/null; then
    echo "📦 Installing Playwright..."
    npx playwright install
fi

# Run E2E tests
echo "🎭 Running E2E tests..."
npm run test:e2e

echo "✅ All tests completed!"
