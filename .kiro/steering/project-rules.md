---
inclusion: always
---

# Project Rules - React 19 Skill Evaluation App

## Project Overview

A React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration. The app provides personalized skill assessments and AI-powered recommendations using a custom design system built on shadcn/ui.

## Development Standards

### Code Quality

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Implement proper error handling and loading states
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions

### Component Architecture

- Use functional components with hooks
- Implement proper prop typing with TypeScript interfaces
- Keep components small and focused (single responsibility)
- Use composition over inheritance
- Implement proper component lifecycle management
- **Component Size Limit**: Components must not exceed 180 lines of code
- **Component Breakdown**: When a component exceeds 180 lines, break it down into smaller components
- **Nested Components Structure**: For feature components that become too large, create a nested components folder and extract smaller components that are called from the parent component
- This approach ensures proper separation of concerns and maintainability

### File Size and Separation of Concerns

- Keep files small and focused (max 150-180 lines)
- Separate concerns into different files and modules
- Extract complex logic into custom hooks or utility functions
- Split large components into smaller, composable pieces
- Create separate files for types, constants, and utilities
- Use barrel exports (index.ts) to organize related modules

### Function Complexity

- Keep function complexity low (max cyclomatic complexity of 11)
- Break down complex functions into smaller, focused functions
- Use early returns to reduce nesting levels
- Extract conditional logic into separate functions when appropriate
- Prefer pure functions over functions with side effects

## State Management

### Local State

- Use React hooks (useState, useReducer) for component-level state
- Keep state as close to where it's used as possible
- Use custom hooks to encapsulate stateful logic

### Global State

- Implement Context API for simple global state (theme, user preferences)
- Consider Zustand for complex client-side state management
- Avoid prop drilling by lifting state appropriately

### Server State Management

- Use TanStack Query (@tanstack/react-query) for all server state management
- Implement proper query keys and query functions
- Leverage built-in caching, background updates, and error handling
- Use mutations for data modifications (POST, PUT, DELETE operations)
- Implement optimistic updates where appropriate
- Configure proper stale times and cache times based on data volatility

## TanStack Query Best Practices

### Query Organization

- Group related queries in custom hooks (e.g., useSkillsData, useUserProfile)

### Query Keys

- Use consistent, hierarchical query key patterns (['skills', userId], ['assessments', skillId])

### Error Handling

- Implement global error boundaries and query-specific error states

### Loading States

- Use isLoading, isFetching, and isError states appropriately

### Mutations

- Always invalidate related queries after successful mutations

### Offline Support

- Configure retry logic and offline behavior for critical queries

### DevTools

- Use TanStack Query DevTools in development for debugging

## Data Flow Architecture

```
API Layer (lib/api/) → TanStack Query → React Components
                    ↓
               Custom Hooks (hooks/queries/)
                    ↓
            Component State (useState/useReducer)
```

## Performance Guidelines

- Implement proper memoization with useMemo/useCallback
- Use React.lazy for code splitting
- Optimize images and assets
- Implement proper loading states
- Use proper key props for lists

## File Structure Guidelines

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom hooks
│   └── queries/        # TanStack Query hooks
├── lib/                # Utilities and configurations
│   └── api/           # API layer
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── utils/              # Utility functions
```

## TypeScript Standards

- Define interfaces for all props and data structures
- Use strict TypeScript configuration
- Avoid `any` type - use proper typing or `unknown`
- Create reusable type definitions in dedicated files
- Use generic types where appropriate

## Testing Guidelines

- Write unit tests for utility functions
- Test custom hooks with React Testing Library
- Implement integration tests for critical user flows
- Mock external dependencies appropriately
- Maintain good test coverage for business logic

## API Integration & Error Handling

### API Integration Standards

- Implement consistent error handling across all API calls
- Use proper HTTP status code handling (401, 403, 404, 500, etc.)
- Implement retry logic for failed requests
- Add request/response interceptors for common functionality
- Use proper timeout configurations
- Implement proper loading and error states for all API calls
- Use consistent API response formats and error structures

### Error Boundaries

- Implement React Error Boundaries for graceful error handling
- Create fallback UI components for error states
- Log errors appropriately for debugging and monitoring

## Security Standards

### Data Protection

- Sanitize all user inputs to prevent XSS attacks
- Implement proper authentication token handling
- Never store sensitive data in localStorage (use secure httpOnly cookies)
- Validate all data on both client and server side
- Implement proper CORS handling
- Use HTTPS for all API communications

### Authentication & Authorization

- Implement proper JWT token refresh mechanisms
- Handle token expiration gracefully
- Implement proper logout functionality that clears all sensitive data
- Use secure storage methods for authentication tokens

## Accessibility (A11y) Standards

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Implement proper tab order and focus management
- Provide keyboard shortcuts for common actions

### Screen Reader Support

- Implement proper ARIA labels and roles
- Use semantic HTML elements appropriately
- Provide alternative text for all images and icons
- Ensure proper heading hierarchy (h1, h2, h3, etc.)

### Visual Accessibility

- Maintain proper color contrast ratios (WCAG AA compliance)
- Ensure text is readable and scalable
- Provide visual focus indicators
- Support high contrast and dark mode themes

## Environment Configuration

### Environment Management

- Use environment variables for all configuration settings
- Never commit sensitive keys, tokens, or credentials to version control
- Implement different configurations for development, staging, and production
- Use proper build-time vs runtime configuration separation
- Document all required environment variables

### Configuration Files

- Create .env.example files with all required variables
- Use proper naming conventions for environment variables
- Implement validation for required environment variables

## Git & Development Workflow

### Commit Standards

- Use conventional commit messages (feat:, fix:, docs:, refactor:, test:, chore:)
- Write clear, descriptive commit messages
- Keep commits atomic and focused on single changes
- Reference issue numbers in commit messages when applicable

### Branch Management

- Use meaningful branch naming conventions:
  - feature/skill-assessment-ui
  - fix/auth-token-refresh
  - refactor/component-structure
- Implement proper branch protection rules
- Require pull request reviews before merging to main
- Use squash merging for feature branches

### Code Review Process

- Require at least one code review for all pull requests
- Review for code quality, security, and adherence to project standards
- Test functionality before approving pull requests
- Provide constructive feedback and suggestions

## CI/CD & GitHub Actions

### Continuous Integration Pipeline

- **Automated Testing**: Run all tests on every pull request
- **Code Quality Checks**: Implement ESLint, Prettier, and TypeScript checks
- **Build Verification**: Ensure the application builds successfully
- **Security Scanning**: Run dependency vulnerability checks
- **Performance Testing**: Monitor bundle size and performance metrics

### GitHub Actions Workflows

#### Pull Request Workflow

```yaml
# .github/workflows/pr-check.yml
- Lint and format code (ESLint, Prettier)
- Type checking (TypeScript)
- Run unit and integration tests
- Build application
- Check bundle size
- Security audit (npm audit)
- Accessibility testing
```

#### Main Branch Workflow

```yaml
# .github/workflows/deploy.yml
- All PR checks
- End-to-end testing
- Build production bundle
- Deploy to staging environment
- Run smoke tests
- Deploy to production (manual approval)
```

### Deployment Standards

- **Staging Environment**: Automatic deployment on main branch merge
- **Production Deployment**: Manual approval required
- **Rollback Strategy**: Implement quick rollback mechanisms
- **Environment Parity**: Ensure staging mirrors production
- **Health Checks**: Implement post-deployment health verification

### Code Quality Gates

- **Test Coverage**: Maintain minimum 80% test coverage
- **Bundle Size**: Monitor and alert on bundle size increases
- **Performance Budget**: Set performance budgets for key metrics
- **Dependency Updates**: Automated dependency update PRs
- **Security Alerts**: Immediate notifications for security vulnerabilities

### Branch Protection Rules

- Require status checks to pass before merging
- Require pull request reviews
- Require branches to be up to date before merging
- Restrict pushes to main branch
- Require signed commits for production releases
