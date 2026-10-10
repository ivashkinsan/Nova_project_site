import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Держим в синхроне с vite.config.js (именно .js подхватывается Vite первым).
  publicDir: 'Public',
});
