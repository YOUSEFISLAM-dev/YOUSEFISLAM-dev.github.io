import { defineConfig } from 'vite'

export default defineConfig({
  // Base URL for GitHub Pages deployment
  base: './',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Optimize assets
    minify: 'terser',
    cssMinify: true,
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Asset optimization
    rollupOptions: {
      output: {
        // Asset naming for better caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Public directory
  publicDir: 'public',
  
  // Asset handling
  assetsInclude: ['**/*.json']
})