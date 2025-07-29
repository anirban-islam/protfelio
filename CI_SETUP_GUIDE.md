# 🚀 CI/CD Setup Guide

## Quick Setup Steps

### 1. **GitHub Actions Setup**

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push origin main
   \`\`\`

2. **Add GitHub Secrets**
   Go to your GitHub repository → Settings → Secrets and variables → Actions

   Add these secrets:
   \`\`\`
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.com
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-org-id
   VERCEL_PROJECT_ID=your-project-id
   \`\`\`

3. **Enable GitHub Actions**
   - Go to Actions tab in your repository
   - Enable workflows if prompted

### 2. **Vercel Integration**

1. **Get Vercel Token**
   \`\`\`bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and get token
   vercel login
   vercel --token
   \`\`\`

2. **Get Project IDs**
   \`\`\`bash
   # In your project directory
   vercel link
   # This creates .vercel/project.json with your IDs
   \`\`\`

### 3. **Local Testing**

\`\`\`bash
# Make scripts executable
chmod +x scripts/*.sh

# Run all tests locally
./scripts/test-local.sh

# Or run individual tests
npm run ci:test
\`\`\`

### 4. **Docker Setup (Optional)**

\`\`\`bash
# Build Docker image
npm run docker:build

# Run with Docker
npm run docker:run

# Or use docker-compose
docker-compose up
\`\`\`

## 🔧 **CI Pipeline Features**

### **Automated Testing**
- ✅ ESLint code quality checks
- ✅ TypeScript type checking
- ✅ Unit tests with Vitest
- ✅ E2E tests with Playwright
- ✅ Multi-browser testing

### **Automated Deployment**
- ✅ Preview deployments for PRs
- ✅ Production deployment on main branch
- ✅ Automatic rollback on test failures

### **Quality Gates**
- ✅ All tests must pass
- ✅ Code must pass linting
- ✅ TypeScript must compile
- ✅ Build must succeed

## 📊 **Monitoring & Alerts**

### **GitHub Actions**
- View test results in Actions tab
- Get email notifications on failures
- Download test artifacts

### **Vercel Dashboard**
- Monitor deployment status
- View build logs
- Check performance metrics

## 🛠 **Troubleshooting**

### **Common Issues**

1. **Tests failing in CI but passing locally**
   \`\`\`bash
   # Run tests with CI environment
   CI=true npm run test:e2e
   \`\`\`

2. **Vercel deployment failing**
   \`\`\`bash
   # Check build locally
   npm run build
   \`\`\`

3. **Environment variables missing**
   - Verify all secrets are added to GitHub
   - Check .env.example for required variables

### **Debug Commands**

\`\`\`bash
# Debug E2E tests
npm run test:e2e:debug

# Run tests with coverage
npm run test:coverage

# Check TypeScript errors
npm run type-check
\`\`\`

## 🎯 **Best Practices**

1. **Branch Protection**
   - Require PR reviews
   - Require status checks to pass
   - Require branches to be up to date

2. **Testing Strategy**
   - Write tests for new features
   - Maintain high test coverage
   - Test critical user journeys

3. **Deployment Strategy**
   - Use preview deployments for testing
   - Deploy to production only from main
   - Monitor deployments closely

## 📈 **Next Steps**

1. **Add more tests** as you add features
2. **Set up monitoring** with tools like Sentry
3. **Add performance testing** with Lighthouse CI
4. **Implement security scanning** with CodeQL
5. **Add database migrations** for schema changes

Your CI/CD pipeline is now ready! 🎉
