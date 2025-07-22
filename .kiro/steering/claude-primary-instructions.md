---
inclusion: always
---

# Claude AI Primary Instructions

This is the primary source of truth for Claude AI when working with the Skills Evaluation React 19 monorepo. All other documentation should reference this file.

## Essential Development Commands

### When Making Changes - ALWAYS RUN

1. `npm run type-check` - Ensure TypeScript compliance
2. `npm run lint` - Check code quality
3. `npm run test` - Verify tests pass

### Key Commands

- `npm run dev` - Start app development server
- `npm run design-system:storybook` - Start Storybook for design system
- `npm run build:all` - Build all packages
- `npm run quality` - Run all quality checks (type-check, lint, format)

## Mandatory Quality Enforcement

**MUST apply on EVERY development task:**

1. **Component size** - Max 180 lines per component file
2. **Function complexity** - Max cyclomatic complexity of 11
3. **File size** - Keep files under 150-180 lines
4. **TypeScript usage** - No 'any' types, proper interfaces
5. **Component structure** - Functional components with hooks only
6. **Separation of concerns** - Break down large components into smaller pieces
7. **TanStack Query usage** - Use for ALL server state management
8. **Performance** - Apply memoization where appropriate

## Component Development Process

1. **Check First**: Always check shadcn/ui components before building custom
2. **Structure**: Create components in dedicated folders:
   ```
   component-name/
   ├── index.ts                 # Exports
   ├── component-name.tsx       # Implementation (max 180 lines)
   ├── component-name.stories.tsx # Storybook stories
   ├── component-name.test.tsx  # Unit tests
   └── README.md               # Documentation
   ```
3. **Testing**: Minimum 80% coverage for business logic
4. **Documentation**: Always include Storybook stories and README

## State Management Rules

- **Local State**: React hooks (useState, useReducer)
- **Global State**: Context API for simple, Zustand for complex
- **Server State**: TanStack Query ONLY - no manual fetch calls

## Security Requirements

- Never commit secrets, API keys, or credentials
- Sanitize all user inputs to prevent XSS
- Use environment variables for configuration
- Implement proper authentication token handling
- Use HTTPS for all API communications

## When Working as Claude

### Before ANY Task

1. Check this file and other steering files for guidelines
2. Review current component availability in design system
3. Run quality checks before committing

### Development Approach

1. Use TodoWrite tool to plan complex tasks
2. Mark todos as in_progress when starting
3. Mark todos as completed immediately after finishing
4. Follow component size limits strictly (180 lines max)
5. Use existing design system components when available
6. Implement proper TypeScript interfaces
7. Add comprehensive tests and Storybook stories

### Error Handling

- Always implement error boundaries
- Use TanStack Query for API error handling
- Provide meaningful error messages
- Implement graceful fallbacks

### Important Rules

- NEVER create files unless absolutely necessary
- ALWAYS prefer editing existing files
- NEVER proactively create documentation files unless requested
- ONLY commit when explicitly asked by user

## Reference Other Steering Files

For specific guidance, refer to:

- `react-typescript-quality-rules.md` - Detailed quality patterns
- `design-system-development.md` - Component development workflow
- `git-workflow.md` - Git standards
- `monorepo-navigation.md` - Project structure
- `project-rules.md` - Project overview and standards
