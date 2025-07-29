#!/bin/bash

echo "🚀 Setting up CI/CD for Anirban Portfolio"

# Create necessary directories
mkdir -p .github/workflows
mkdir -p scripts
mkdir -p tests/e2e

# Set executable permissions
chmod +x scripts/*.sh

echo "✅ CI/CD setup complete!"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub"
echo "2. Add secrets to GitHub repository:"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL" 
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "3. Enable GitHub Actions in repository settings"
echo ""
echo "🎉 Your CI/CD pipeline is ready!"
