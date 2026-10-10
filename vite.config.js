import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.JPG', '**/*.JPEG', '**/*.svg'],
  build: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuild: {
      target: 'es2020',
    },
  },
});
