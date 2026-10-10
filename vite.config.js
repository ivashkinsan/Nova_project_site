import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Пул фотографий проекта лежит в папке Public/ (1.jpg … 28.jpg).
  // Так они доступны по URL /1.jpg … /28.jpg и не дублируются в src/assets.
  publicDir: 'Public',
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
