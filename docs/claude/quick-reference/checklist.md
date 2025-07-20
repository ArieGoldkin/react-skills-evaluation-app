# Component Creation Checklist

## Pre-Development

- [ ] Check for existing shadcn/ui component
- [ ] Check for Radix UI primitive if shadcn/ui unavailable
- [ ] Research existing patterns in codebase

## Component Development

- [ ] Create proper directory structure
- [ ] Implement with TypeScript interfaces
- [ ] Keep under 180 lines
- [ ] Use CVA for variant management
- [ ] Implement React.forwardRef for DOM elements
- [ ] Set displayName for debugging

## Testing & Documentation

- [ ] Add comprehensive Storybook stories
- [ ] Write unit tests (90% coverage minimum)
- [ ] Include accessibility tests
- [ ] Document in component README
- [ ] Update category index exports
- [ ] Update main package exports

## Quality Assurance

- [ ] Ensure WCAG AA accessibility compliance
- [ ] Test keyboard navigation
- [ ] Verify proper ARIA attributes
- [ ] Check focus management
- [ ] Test with screen readers (critical components)
- [ ] Run type-check, lint, and tests
- [ ] Verify integration with app package

## Security & Performance

- [ ] No hardcoded secrets or API keys
- [ ] Sanitize user inputs if applicable
- [ ] Implement proper error handling
- [ ] Use React.memo for pure components
- [ ] Optimize re-render patterns
