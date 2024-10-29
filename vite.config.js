// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:5000', // The backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
