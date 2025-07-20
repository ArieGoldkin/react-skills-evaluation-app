# React/TypeScript Code Quality Rules

## Mandatory Quality Checks for Every Development Task

This rule set MUST be applied to every React/TypeScript file modification or creation in the project. These checks ensure maintainability, performance, and adherence to project standards.

## Code Size and Complexity Rules

### 1. Component Size Limit
- **Maximum**: 180 lines per component
- **Action**: Extract components exceeding 180 lines into smaller, focused components
- **Structure**: Create nested component folders for complex features

### 2. Function Complexity
- **Maximum**: Cyclomatic complexity under 11
- **Action**: Break down complex functions into smaller, single-purpose functions
- **Extract**: Custom hooks for complex state logic

### 3. File Size Limit
- **Maximum**: 150-180 lines per file
- **Action**: Split large files into multiple focused modules
- **Organization**: Group related functionality in separate files

## TypeScript Standards

### 4. Type Safety Requirements
- **No 'any' types** - Use proper type definitions
- **Required**: Explicit interfaces for all props and state
- **Prefer**: Union types over 'any' for flexible types
- **Use**: Generic types for reusable components

### 5. Component Structure Standards
- **Required**: Functional components with hooks only
- **Pattern**: Props interface → Component → Export
- **Hooks**: Use proper dependency arrays and cleanup
- **State**: Prefer local state, use Context/Zustand for global needs

## Architecture and Separation Rules

### 6. Separation of Concerns
- **Business Logic**: Extract to custom hooks
- **Data Fetching**: Use TanStack Query patterns
- **UI Logic**: Keep in component, extract if complex
- **Utilities**: Separate utility functions in dedicated files

### 7. TanStack Query Standards
- **Required**: Use for all server state management
- **Pattern**: Custom hooks for query organization
- **Error Handling**: Implement consistent error boundaries
- **Keys**: Use hierarchical query key patterns

### 8. Performance Considerations
- **Memoization**: Use useMemo/useCallback for expensive operations
- **Re-renders**: Identify and prevent unnecessary re-renders
- **Code Splitting**: Use React.lazy for large components
- **Dependencies**: Optimize useEffect dependency arrays

## Refactoring Guidelines

### When Components Exceed 180 Lines
1. **Identify logical sections** within the component
2. **Extract UI sections** into smaller components
3. **Move business logic** to custom hooks
4. **Create component composition** instead of monolithic components

### Function Complexity Reduction
1. **Extract helper functions** from complex logic
2. **Create custom hooks** for stateful logic
3. **Use early returns** to reduce nesting
4. **Split conditional rendering** into separate components

### File Organization Improvements
1. **Group related components** in folders
2. **Separate concerns** into different files
3. **Create barrel exports** (index.ts) for clean imports
4. **Move types** to dedicated type files when shared

### TypeScript Improvements
1. **Replace 'any'** with proper union types or generics
2. **Create interfaces** for all component props
3. **Use discriminated unions** for complex state
4. **Implement proper error types** for API responses

## Quality Check Workflow

### Before Submitting Code
1. **Run type checks**: `npm run type-check`
2. **Run linting**: `npm run lint`
3. **Run tests**: `npm run test`
4. **Verify component sizes** using code metrics
5. **Check for performance issues** in complex components

### Code Review Checklist
- [ ] All components under 180 lines
- [ ] All functions under 11 cyclomatic complexity
- [ ] No 'any' types used
- [ ] Proper TypeScript interfaces defined
- [ ] TanStack Query patterns followed
- [ ] Performance optimizations applied where needed
- [ ] Separation of concerns maintained

## Enforcement

These rules are **MANDATORY** for every development task. Any violations must be addressed before code completion. Focus on:

1. **Maintainability** - Code should be easy to understand and modify
2. **Performance** - Optimized for React 19 best practices
3. **Type Safety** - Full TypeScript compliance
4. **Architecture** - Proper separation and organization

## Examples of Common Violations and Solutions

### Large Component Refactoring
```typescript
// ❌ Violation: 250-line component
export function UserDashboard() {
  // 250 lines of mixed logic
}

// ✅ Solution: Broken into smaller components
export function UserDashboard() {
  return (
    <div>
      <UserHeader />
      <UserStats />
      <UserActivity />
    </div>
  )
}
```

### Complex Function Refactoring
```typescript
// ❌ Violation: High complexity function
function processUserData(data: any) {
  // 15+ conditional branches
}

// ✅ Solution: Extracted smaller functions
function processUserData(data: UserData) {
  const validated = validateUserData(data)
  const processed = transformUserData(validated)
  return formatUserOutput(processed)
}
```

### TypeScript Improvements
```typescript
// ❌ Violation: Using 'any'
function handleResponse(data: any) {
  return data.result
}

// ✅ Solution: Proper typing
interface ApiResponse<T> {
  result: T
  status: number
  error?: string
}

function handleResponse<T>(data: ApiResponse<T>): T {
  return data.result
}
```