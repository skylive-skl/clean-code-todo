import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['app.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.browser,
    },
  },
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
]);
