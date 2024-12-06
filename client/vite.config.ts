import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        dir: 'build',
      }
    }
  }
});
