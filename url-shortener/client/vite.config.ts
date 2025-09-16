import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Use either VITE_API_URL or default to localhost
  const API_URL = env.VITE_API_URL || 'http://localhost:3000';

  return {
    server: {
      // Only proxy in dev mode
      proxy: mode === 'development' ? {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
    plugins: [react()],
  };
});
