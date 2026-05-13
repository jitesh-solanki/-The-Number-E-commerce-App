import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers
    target: 'es2020',
    
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging (disable in production)
    sourcemap: false,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI Icons
          'icons-vendor': ['react-icons/fi', 'react-icons/fa'],
          
          // Animations
          'animation-vendor': ['framer-motion'],
          
          // Utilities
          'utils-vendor': ['react-hot-toast', 'react-helmet-async'],
        },
        
        // Custom chunk naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/css/[name]-[hash].[ext]',
      },
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Target es modules
    modulePreload: {
      polyfill: true,
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
  },
  
  // Server configuration
  server: {
    port: 5173,
    open: true,
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    open: true,
  },
})