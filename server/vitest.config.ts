import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['__tests__/**/*.test.ts'], // ✅ Looks inside `server/__tests__/`
        exclude: ['dist/**', 'node_modules/**'], // ✅ Ignore compiled files
    },
});
