import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    exclude: ['dist/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
