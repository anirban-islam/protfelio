#!/bin/bash

echo "🚀 Setting up VS Code for Anirban Portfolio"

# Create VS Code workspace file
cat > anirban-portfolio.code-workspace << 'EOF'
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "typescript.preferences.importModuleSpecifier": "relative",
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "extensions": {
    "recommendations": [
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint",
      "bradlc.vscode-tailwindcss",
      "ms-playwright.playwright",
      "vitest.explorer"
    ]
  }
}
EOF

echo "✅ VS Code workspace created!"
echo ""
echo "Next steps:"
echo "1. Open VS Code"
echo "2. Install recommended extensions"
echo "3. Run: npm install"
echo "4. Run: npm run dev"
echo ""
echo "🎉 Happy coding!"
