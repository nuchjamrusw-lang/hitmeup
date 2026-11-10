import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  // Relative base + HashRouter lets the build run from any static host or sub-folder.
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { chunkSizeWarningLimit: 1000 },
});
