import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import sortKeys from 'eslint-plugin-sort-keys-fix';
import eslintReact from 'eslint-plugin-react';
// import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: typescriptParser,
        files: ['**/*.{ts,tsx}'],
        project: 'tsconfig.json',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'eslint-plugin-react-compiler': reactCompiler,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeys,
      'eslint-plugin-react': eslintReact,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'method', 'constructor', 'field'] },
      ],
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/sort-type-constituents': 'error',
      'react/jsx-handler-names': [
        'error',
        {
          checkInlineFunction: true,
          checkLocalVariables: true,
          eventHandlerPrefix: 'handle',
        },
      ],
      'react/jsx-pascal-case': ['error', {}],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'eslint-plugin-react-compiler/react-compiler': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        2,
        { caseSensitive: false },
      ],
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: true, minKeys: 2, natural: false },
      ],
      'sort-keys-fix/sort-keys-fix': 'error',
    },
  },
  {
    ignores: [
      'eslint.config.js',
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
