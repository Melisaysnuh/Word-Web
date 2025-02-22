import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],  // Test files are separate
    exclude: ['dist/**', 'node_modules/**'],  // Ignore compiled output
  },
  resolve: {
    alias: {
      '@': './src', // Allows you to import using '@/utils' instead of relative paths
    },
  },
});
