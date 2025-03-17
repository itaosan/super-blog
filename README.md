# Super Blog Project

[![CI/CD Status](https://github.com/itaosan/super-blog/actions/workflows/main.yml/badge.svg)](https://github.com/itaosan/super-blog/actions)

A full-stack blog application with AI integration built with:

**Frontend:**
- React 18 with Vite 5
- TypeScript 5
- CSS Modules
- React Router 6

**Code Quality:**
- Biome (TypeScript configuration)
- React Hooks lint rules
- React Refresh lint rules
- Prettier code formatting





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
- `lint`: Run Biome checks
- `preview`: Preview production build

## Biome Configuration

This project uses Biome for code formatting and linting with:

- TypeScript support
- React-specific rules
- Recommended style guidelines
- Auto-formatting capabilities

```json
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  }
}
```

## Project Structure

- `src/`: Main source code
- `public/`: Static assets
- `.github/`: GitHub workflows
- `biome.json`: Biome configuration
- `tsconfig.*.json`: TypeScript configurations
