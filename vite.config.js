// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'https://pediatric-oncology-server.vercel.app', // The backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
