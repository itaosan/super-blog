# Super Blog Project

A modern blog application built with:

- React 18
- TypeScript 5
- Vite 5
- ESLint (TypeScript ESLint configuration)
- React Hooks lint rules
- React Refresh lint rules

## Features

- Type-safe components with TypeScript
- Hot Module Replacement (HMR)
- Strict ESLint rules for code quality
- Pre-configured React Refresh support
- Modern project structure

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

## Available Scripts

- `dev`: Start development server
- `build`: Create production build
- `lint`: Run ESLint checks
- `preview`: Preview production build

## ESLint Configuration

This project uses a comprehensive ESLint setup with:

- TypeScript ESLint recommended rules
- React Hooks rules
- React Refresh rules
- Browser environment globals

```js
// Current eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

## Project Structure

- `src/`: Main source code
- `public/`: Static assets
- `ai/`: AI-related utilities
- `.github/`: GitHub workflows
- `eslint.config.js`: ESLint configuration
- `tsconfig.*.json`: TypeScript configurations
