import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'rich-editor-wc.js',
        assetFileNames: 'rich-editor-wc.css',
        chunkFileNames: 'chunks.js',
        manualChunks: {},
      },
    },
  },
});
