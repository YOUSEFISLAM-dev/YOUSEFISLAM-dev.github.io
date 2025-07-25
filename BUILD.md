# Build System Documentation

This portfolio website now includes a modern build system using Vite for optimal development experience and production performance.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

### Build & Deploy
```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview

# Deploy to GitHub Pages (automated via GitHub Actions)
npm run deploy
```

## 🛠 Build System Features

### Development Experience
- **Hot Module Replacement (HMR)**: Instant updates during development
- **Fast Development Server**: Vite-powered dev server on port 3000
- **Asset Processing**: Automatic handling of CSS, JS, and static assets

### Production Optimization
- **Code Minification**: JavaScript and CSS minification using Terser
- **Asset Optimization**: Automatic image optimization and asset hashing
- **Caching Strategy**: Asset fingerprinting for optimal browser caching
- **Bundle Analysis**: Optimized chunk splitting for better loading performance

### CI/CD Pipeline
- **GitHub Actions**: Automated build and deployment on push to main branch
- **GitHub Pages**: Automatic deployment to GitHub Pages
- **Build Caching**: Optimized build times with dependency caching

## 📁 Project Structure

```
├── public/                 # Static assets (copied as-is to dist)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── CNAME
│   ├── data/               # JSON data files
│   ├── image/              # Images and media
│   ├── projects/           # Project files
│   └── selfhosted/         # Self-hosted resources
├── css/                    # Stylesheets
├── js/                     # JavaScript modules
├── dist/                   # Production build output (auto-generated)
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Build configuration
└── .github/workflows/      # CI/CD configuration
```

## ⚙️ Configuration

### Vite Configuration (`vite.config.js`)
- **Base URL**: Configured for GitHub Pages deployment
- **Asset Optimization**: Minification and compression enabled
- **Development Server**: Hot reload on port 3000
- **Public Directory**: Static assets served from `/public`

### GitHub Actions (`.github/workflows/build-deploy.yml`)
- **Trigger**: Automatic builds on push to main branch
- **Node.js Version**: 18.x with npm caching
- **Deployment**: Automated deployment to GitHub Pages
- **Permissions**: Configured for GitHub Pages deployment

## 🌐 Deployment

### Automatic Deployment
The site is automatically built and deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment
```bash
# Build and deploy manually
npm run deploy
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve production build
npm run serve

# Deploy to GitHub Pages
npm run deploy
```

## 📊 Performance Features

- **Fast Build Times**: Vite's lightning-fast build system
- **Optimized Assets**: Automatic minification and compression
- **Modern JavaScript**: ES module support with fallbacks
- **Efficient Caching**: Asset fingerprinting for optimal browser caching
- **Bundle Optimization**: Intelligent code splitting and tree shaking

## 🔍 Browser Support

- Modern browsers with ES6+ support
- Progressive enhancement for older browsers
- Mobile-optimized responsive design
- Accessibility features and compliance

---

*This build system enhances the development experience while ensuring optimal production performance for the portfolio website.*