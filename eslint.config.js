import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
// import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
// import reactCompiler from 'eslint-plugin-react-compiler';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },}
  },
  pluginJs.configs.recommended,
  // reactHooks.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: { 'react/jsx-uses-react': 'off', 'react/react-in-jsx-scope': 'off',
     },
  },
  {
    ignores: [
      '**/*.d.ts',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/node_modules/**',
      `**/dist/**`,
      `**/build/**`,
      `**/out/**`,
      '**/vite.config.ts',
    ],
  },
];
