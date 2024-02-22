import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/text-editor",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        dir: 'text-editor',
        entryFileNames: 'rich-editor-wc.js',
        assetFileNames: 'rich-editor-wc.css',
        chunkFileNames: 'chunk.js',
        manualChunks: undefined,
      },
    },
  },
});
