# Troubleshooting Guide

## Build Issues

### TypeScript Errors

```bash
cd packages/design-system && npm run type-check
```

### Circular Dependencies

```bash
npm run build 2>&1 | grep -i circular
```

## Test Issues

### Verbose Test Output

```bash
npm run test -- --verbose
```

### Run Specific Test File

```bash
npm run test button.test.tsx
```

## Storybook Issues

### Clear Cache and Restart

```bash
rm -rf .storybook-cache
npm run design-system:storybook
```

## Common Errors

### Import Path Issues

- Use path aliases (`@/components/*`) instead of relative imports
- Ensure exports are properly updated in index files

### Component Not Found

- Check category index file exports
- Verify main package index exports
- Ensure proper folder structure

### Accessibility Warnings

- Add proper ARIA attributes
- Implement keyboard navigation
- Check focus management
- Verify semantic HTML structure
