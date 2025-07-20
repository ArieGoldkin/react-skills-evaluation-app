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
npm run test                  # Run tests across workspaces
npm run quality               # All quality checks (type-check, lint, format)
```

## Build & Deploy

```bash
npm run build:all             # Build all packages
```

## Design System Specific

```bash
cd packages/design-system
npm run test                  # Design system tests
npm run build                 # Build design system
npm run type-check            # Design system type checks
```

## After Making Changes

Always run these in order:

1. `npm run type-check`
2. `npm run lint`
3. `npm run test`
