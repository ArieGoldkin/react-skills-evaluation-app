# Essential Commands

Quick reference for the most commonly used commands in the Skills Evaluation monorepo.

## Development

```bash
npm run dev                    # Start app development server
npm run design-system:storybook # Start Storybook for design system
```

## Quality Checks

```bash
npm run type-check            # TypeScript checks across workspaces
npm run lint                  # ESLint checks across workspaces
npm run test                  # Run Vitest tests across workspaces (224 tests)
npm run test:ci               # Run tests with coverage for CI
npm run quality               # All quality checks (type-check, lint, format)
```

## Build & Deploy

```bash
npm run build:all             # Build all packages
```

## Design System Specific

```bash
cd packages/design-system
npm run test                  # Vitest tests for design system
npm run build                 # Build design system
npm run type-check            # Design system type checks
```

## Testing Commands

```bash
npm run test                  # Run all Vitest tests (224 tests across workspaces)
npm run test:ci               # Run tests with coverage for CI
npm run test:watch            # Run tests in watch mode
npm test                      # Alias for npm run test
```

## After Making Changes

Always run these in order:

1. `npm run type-check`
2. `npm run lint`
3. `npm run test`
