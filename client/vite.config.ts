import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({

  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom', // ← This is the key fix
    include: ['__tests__/**/*.test.ts?(x)'],
    exclude: ['build/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      all: true,
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
    dedupe: ['react', 'react-dom'], // prevent duplicate React issues
  },

});
