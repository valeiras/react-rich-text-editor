import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'rich-editor-wc.js',
        assetFileNames: 'rich-editor-wc.css',
        chunkFileNames: 'chunk.js',
        manualChunks: undefined,
      },
    },
  },
});
