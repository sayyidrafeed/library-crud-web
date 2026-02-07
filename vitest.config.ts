import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    svelte({
      hot: false,
      preprocess: vitePreprocess(),
      compilerOptions: {
        dev: true
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
        'dist/',
        'build/'
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85
      }
    },
    include: ['tests/**/*.{test,spec}.{ts,js}'],
    exclude: ['node_modules/', 'dist/']
  },
  resolve: {
    conditions: ['browser'],
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
