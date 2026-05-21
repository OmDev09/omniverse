import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['react', 'react-dom', 'react/jsx-dev-runtime', 'react-dom/client']
  }
});
