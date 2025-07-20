# Claude AI Assistant Instructions

This document provides context and instructions for Claude AI when working with the Skills Evaluation React 19 monorepo.

## Project Overview

A React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration. The app provides personalized skill assessments and AI-powered recommendations using a custom design system built on shadcn/ui.

## Monorepo Structure

```
aiSkillimprove/
├── packages/
│   ├── app/                 # Next.js application
│   └── design-system/       # Shared design system
├── .kiro/steering/         # Project guidelines and rules
└── package.json            # Workspace configuration
```

## Development Commands

### Essential Commands
- `npm run dev` - Start app development server
- `npm run design-system:storybook` - Start Storybook for design system
- `npm run build:all` - Build all packages
- `npm run type-check` - Run TypeScript checks across workspaces
- `npm run lint` - Run ESLint across workspaces
- `npm run test` - Run tests across workspaces
- `npm run quality` - Run all quality checks (type-check, lint, format)

### When Making Changes
Always run these commands after making code changes:
1. `npm run type-check` - Ensure TypeScript compliance
2. `npm run lint` - Check code quality
3. `npm run test` - Verify tests pass

## Code Standards

### Component Architecture
- **Size Limit**: Components must not exceed 180 lines
- **Breakdown Rule**: Extract components that exceed 180 lines into smaller, focused components
- **Structure**: Create nested component folders for complex features
- Use functional components with TypeScript interfaces
- Implement proper error handling and loading states

### File Organization
- Keep files small and focused (max 150-180 lines)
- Use TypeScript for all new code
- Follow conventional commit messages (`feat:`, `fix:`, `docs:`, etc.)
- Create components in dedicated folders with:
  - `component.tsx` - Implementation
  - `component.stories.tsx` - Storybook stories
  - `component.test.tsx` - Unit tests
  - `index.ts` - Exports
  - `README.md` - Documentation

### State Management
- **Local State**: React hooks (useState, useReducer)
- **Global State**: Context API for simple state, Zustand for complex state
- **Server State**: TanStack Query (@tanstack/react-query) for all API interactions

## Design System Guidelines

### Component Priority Order
1. **First Choice**: Use shadcn/ui components when available
2. **Second Choice**: Build on Radix UI primitives
3. **Last Resort**: Custom implementation (with full accessibility)

### Component Structure
```
packages/design-system/src/components/[category]/[component-name]/
├── index.ts                    # Main export
├── [component-name].tsx        # Implementation
├── [component-name].stories.tsx # Storybook stories
├── [component-name].test.tsx   # Unit tests
└── README.md                   # Documentation
```

### Current Components Available
- **UI**: Button, ColorShowcase
- **Layout**: Container, Grid, AppLayout
- **Utilities**: cn (class name utility)

## Git Workflow

### Branch Naming
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Adding tests
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring

### Workflow Steps
1. Create feature branch: `git checkout -b feature/task-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push branch: `git push -u origin feature/task-name`
4. Create PR via GitHub

### Commit Message Format
```
<type>(<scope>): <description>

Examples:
feat(auth): add Google OAuth integration
fix(ui): resolve button alignment on mobile
docs(api): update authentication endpoints
test(utils): add unit tests for date helpers
```

## Security & Best Practices

### Code Security
- Never commit secrets, API keys, or credentials
- Sanitize all user inputs to prevent XSS
- Use environment variables for configuration
- Implement proper authentication token handling
- Use HTTPS for all API communications

### Accessibility (A11y)
- Ensure keyboard navigation for all interactive elements
- Implement proper ARIA labels and roles
- Maintain WCAG AA color contrast ratios
- Support screen readers with semantic HTML
- Provide alternative text for images

### Performance
- Implement proper memoization with useMemo/useCallback
- Use React.lazy for code splitting
- Optimize images and assets
- Use proper key props for lists
- Keep bundle size optimized

## Testing Requirements

### Coverage Standards
- Minimum 80% test coverage for business logic
- Test all component variants and props
- Include interaction testing with user-event
- Implement accessibility testing with jest-axe

### Testing Structure
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for critical user flows
- Mock external dependencies appropriately

## API Integration

### Standards
- Use TanStack Query for all server state management
- Implement consistent error handling across API calls
- Use proper HTTP status code handling
- Add request/response interceptors for common functionality
- Implement retry logic for failed requests

### Query Organization
- Group related queries in custom hooks
- Use hierarchical query key patterns
- Implement global error boundaries
- Configure proper stale times and cache times

## CI/CD Guidelines

### GitHub Actions
- Automated testing on every pull request
- Code quality checks (ESLint, Prettier, TypeScript)
- Build verification and bundle size monitoring
- Security scanning and dependency checks

### Deployment
- Staging environment: Automatic deployment on main branch merge
- Production deployment: Manual approval required
- Health checks and rollback mechanisms

## Environment Configuration

### Required Environment Variables
- Document all required variables in `.env.example`
- Use proper naming conventions
- Implement validation for required variables
- Separate build-time vs runtime configuration

## When Working as Claude

### Before Making Changes
1. Check existing steering files in `.kiro/steering/` for specific guidelines
2. Review monorepo structure and current component availability
3. Run quality checks: `npm run type-check && npm run lint`

### Mandatory Quality Enforcement
**MUST apply React/TypeScript Quality Rules on EVERY development task:**
1. **Component size** - ensure components don't exceed 180 lines
2. **Function complexity** - keep cyclomatic complexity under 11
3. **File size** - keep files under 150-180 lines
4. **TypeScript usage** - no 'any' types, proper interfaces
5. **Component structure** - functional components with hooks
6. **Separation of concerns** - break down large components
7. **TanStack Query usage** - proper query patterns and error handling
8. **Performance considerations** - memoization opportunities

Reference: `.kiro/steering/react-typescript-quality-rules.md` for detailed guidelines and refactoring patterns.

### Development Approach
1. Follow the component size limits (180 lines max)
2. Use existing design system components when possible
3. Check for shadcn/ui components before building custom ones
4. Implement proper TypeScript interfaces
5. Add comprehensive tests and Storybook stories
6. Follow conventional commit messages

### Error Handling
- Always implement proper error boundaries
- Use TanStack Query for API error handling
- Provide meaningful error messages
- Implement graceful fallbacks

### Documentation
- Update component README files
- Add JSDoc comments for complex functions
- Keep Storybook stories comprehensive
- Document breaking changes in PR descriptions

This CLAUDE.md serves as the primary reference for understanding the project structure, standards, and workflows when providing AI assistance for the Skills Evaluation monorepo.