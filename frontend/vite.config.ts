import { defineConfig } from 'vite';
import react from '@viteplugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/furniture-showroom/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
