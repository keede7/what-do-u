import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // API Server CORS Config
  server: {
    proxy: {
      'api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // /api/xx => /xx
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
