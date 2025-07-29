# 🚀 Anirban Islam Emon - Portfolio Website

A modern, full-stack portfolio website built with Next.js, featuring a dynamic admin dashboard for content management.

## ✨ Features

- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Admin Dashboard**: Full CRUD operations for all content
- **Authentication**: Secure admin login with NextAuth.js
- **Dynamic Content**: Manage projects, testimonials, and more
- **Contact System**: Contact form with message management
- **Newsletter**: Email subscription system
- **Testing**: Comprehensive test suite with Vitest and Playwright
- **CI/CD**: Automated testing and deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB (with Mongoose)
- **Testing**: Vitest, Playwright, Testing Library
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd anirban-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:ui
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── tests/                # Test files
└── public/               # Static assets
\`\`\`

## 🔐 Admin Access

- **URL**: `/admin/login`
- **Email**: `admin@anirban.dev`
- **Password**: `admin123`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
