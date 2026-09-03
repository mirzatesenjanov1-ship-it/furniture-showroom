import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/furniture-showroom/',
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    ignoreAnnotations: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    minify: false,
    rollupOptions: {
      onwarn(warning, warn) {
        return; // Бардык warning'дерди толугу менен өчүрүү
      }
    }
  }
});
