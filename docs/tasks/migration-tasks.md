# Jest to Vitest Migration Task Tracker

## Overview
This document provides a detailed task-by-task breakdown for migrating from Jest to Vitest across the Skills Evaluation monorepo. Each phase includes specific implementation steps, validation checkpoints, and rollback procedures.

**Related Documents:**
- [Migration Status Report](../claude/reports/migration-status.md) - Comprehensive migration plan and current status
- [Component Checklist](./component-checklist.md) - Quality gates for components
- [Component Task Template](./component-task-template.md) - Standardized component workflow
- [QA Tasks](./qa-tasks.md) - Quality assurance checklists
- [Current Sprint](./current-sprint.md) - Active development tracking
- [Implementation Plan](./implementation-plan.md) - Overall project roadmap

---

## Phase 1: Workspace Setup & Dependencies ⏳

### 1.1 Install Root Dependencies
**Status**: ⏳ Pending  
**Estimated Time**: 15 minutes  
**Dependencies**: None

#### Tasks:
- [ ] **Install Workspace Dependencies**
  ```bash
  npm install -D vitest @vitest/ui @vitest/coverage-v8
  ```
- [ ] **Verify Installation**: Check package.json for correct versions
- [ ] **Test Basic Setup**: Run `npx vitest --version` to confirm installation

#### Validation:
- [ ] Dependencies appear in root package.json devDependencies
- [ ] No installation errors or warnings
- [ ] Vitest version command executes successfully

#### Rollback:
```bash
npm uninstall vitest @vitest/ui @vitest/coverage-v8
```

---

### 1.2 Install Package Dependencies
**Status**: ⏳ Pending  
**Estimated Time**: 20 minutes  
**Dependencies**: 1.1 Complete

#### App Package Tasks:
- [ ] **Navigate to App Package**
  ```bash
  cd packages/app
  ```
- [ ] **Install App Dependencies**
  ```bash
  npm install -D vitest @vitejs/plugin-react jsdom vite-tsconfig-paths
  ```
- [ ] **Verify App Installation**: Check package.json updates

#### Design System Tasks:
- [ ] **Navigate to Design System**
  ```bash
  cd packages/design-system
  ```
- [ ] **Install Design System Dependencies**
  ```bash
  npm install -D vitest @vitejs/plugin-react jsdom vite
  ```
- [ ] **Verify Design System Installation**: Check package.json updates

#### Validation:
- [ ] Both packages have vitest dependencies installed
- [ ] No peer dependency warnings
- [ ] Package-lock.json files updated correctly

#### Rollback:
```bash
# App package
cd packages/app && npm uninstall vitest @vitejs/plugin-react jsdom vite-tsconfig-paths

# Design System
cd packages/design-system && npm uninstall vitest @vitejs/plugin-react jsdom vite
```

---

### 1.3 Create Workspace Configuration
**Status**: ⏳ Pending  
**Estimated Time**: 10 minutes  
**Dependencies**: 1.1, 1.2 Complete

#### Tasks:
- [ ] **Create Workspace File**: `vitest.workspace.ts` in project root
- [ ] **Add Workspace Configuration**:
  ```typescript
  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/app',
    'packages/design-system'
  ])
  ```
- [ ] **Test Workspace**: Run `npx vitest --workspace --run --reporter=verbose`

#### Validation:
- [ ] Workspace file created successfully
- [ ] Vitest recognizes both packages
- [ ] No configuration errors

#### Rollback:
```bash
rm vitest.workspace.ts
```

---

## Phase 2: Package Configuration ⏳

### 2.1 App Package Configuration
**Status**: ⏳ Pending  
**Estimated Time**: 30 minutes  
**Dependencies**: Phase 1 Complete

#### Tasks:
- [ ] **Create Vitest Config**: `packages/app/vitest.config.ts`
- [ ] **Configure Plugins**: React, tsconfig-paths
- [ ] **Set Test Environment**: jsdom for React components
- [ ] **Configure Path Aliases**: Match existing @ path mappings
- [ ] **Set Coverage Thresholds**: Match Jest configuration (80%)
- [ ] **Configure Test Patterns**: Match existing Jest patterns

#### Configuration Template:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    // ... rest of configuration
  }
})
```

#### Validation:
- [ ] Configuration file created without syntax errors
- [ ] TypeScript compilation passes
- [ ] Test discovery works: `npx vitest --run --reporter=verbose`

#### Rollback:
```bash
rm packages/app/vitest.config.ts
```

---

### 2.2 Design System Configuration
**Status**: ⏳ Pending  
**Estimated Time**: 25 minutes  
**Dependencies**: Phase 1 Complete

#### Tasks:
- [ ] **Create Vitest Config**: `packages/design-system/vitest.config.ts`
- [ ] **Configure React Plugin**: For component testing
- [ ] **Set Test Environment**: jsdom for components
- [ ] **Configure Path Aliases**: Design system aliases
- [ ] **Set Coverage Collection**: Exclude stories and types
- [ ] **Configure CSS Modules**: Stable class name strategy

#### Validation:
- [ ] Configuration file created successfully
- [ ] No TypeScript errors
- [ ] Test discovery works for design system tests

#### Rollback:
```bash
rm packages/design-system/vitest.config.ts
```

---

## Phase 3: Setup File Migration ⏳

### 3.1 App Setup File Migration
**Status**: ⏳ Pending  
**Estimated Time**: 20 minutes  
**Dependencies**: Phase 2 Complete

#### Tasks:
- [ ] **Create Setup File**: `packages/app/vitest.setup.ts`
- [ ] **Migrate Jest DOM**: Import `@testing-library/jest-dom`
- [ ] **Convert Jest Mocks**: Change `jest.fn()` to `vi.fn()`
- [ ] **Update Mock Imports**: Import `vi` from vitest
- [ ] **Migrate Next.js Mocks**: Update router and navigation mocks
- [ ] **Migrate Global Mocks**: ResizeObserver, IntersectionObserver, matchMedia

#### Key Changes:
```typescript
// Before (Jest)
jest.mock('next/navigation', () => ({ ... }))

// After (Vitest)
import { vi } from 'vitest'
vi.mock('next/navigation', () => ({ ... }))
```

#### Validation:
- [ ] Setup file imports successfully
- [ ] No undefined global errors
- [ ] Mocks work correctly in test runs

#### Rollback:
```bash
rm packages/app/vitest.setup.ts
```

---

### 3.2 Design System Setup Migration
**Status**: ⏳ Pending  
**Estimated Time**: 10 minutes  
**Dependencies**: Phase 2 Complete

#### Tasks:
- [ ] **Create Setup File**: `packages/design-system/vitest.setup.ts`
- [ ] **Import Jest DOM**: `@testing-library/jest-dom`
- [ ] **Test Setup**: Verify minimal setup works

#### Validation:
- [ ] Setup file created successfully
- [ ] Jest DOM matchers available
- [ ] No import errors

#### Rollback:
```bash
rm packages/design-system/vitest.setup.ts
```

---

## Phase 4: Scripts & Configuration Updates ⏳

### 4.1 Update Package Scripts
**Status**: ⏳ Pending  
**Estimated Time**: 15 minutes  
**Dependencies**: Phase 3 Complete

#### Root Package Tasks:
- [ ] **Update Root Scripts**: Replace Jest commands with Vitest
- [ ] **Add Workspace Commands**: `--workspace` flag for all commands
- [ ] **Add UI Command**: `test:ui` for Vitest UI
- [ ] **Preserve Existing**: Maintain compatibility with CLAUDE.md commands

#### Package Script Tasks:
- [ ] **Update App Scripts**: Individual package Vitest commands
- [ ] **Update Design System Scripts**: Package-specific commands
- [ ] **Test Script Changes**: Verify new scripts work

#### Script Changes:
```json
{
  "scripts": {
    "test": "vitest --workspace",
    "test:watch": "vitest --workspace --watch",
    "test:coverage": "vitest --workspace --coverage",
    "test:ci": "vitest --workspace --run --coverage",
    "test:ui": "vitest --workspace --ui"
  }
}
```

#### Validation:
- [ ] All scripts execute without errors
- [ ] Workspace commands discover all packages
- [ ] UI command opens Vitest interface

#### Rollback:
Restore original package.json scripts from git history

---

### 4.2 TypeScript Configuration Updates
**Status**: ⏳ Pending  
**Estimated Time**: 10 minutes  
**Dependencies**: Phase 3 Complete

#### Tasks:
- [ ] **Update App tsconfig**: Add vitest types
- [ ] **Update Design System tsconfig**: Add vitest types
- [ ] **Remove Jest Types**: Clean up @types/jest references
- [ ] **Verify Compilation**: Run type-check command

#### Configuration Changes:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

#### Validation:
- [ ] TypeScript compilation passes
- [ ] Vitest types are recognized
- [ ] No Jest type conflicts

#### Rollback:
Restore original tsconfig.json files from git

---

## Phase 5: Cleanup & Validation ⏳

### 5.1 Parallel Testing Validation
**Status**: ⏳ Pending  
**Estimated Time**: 30 minutes  
**Dependencies**: Phase 4 Complete

#### Tasks:
- [ ] **Run Jest Tests**: Ensure original tests still pass
- [ ] **Run Vitest Tests**: Verify new setup works
- [ ] **Compare Coverage**: Validate coverage metrics
- [ ] **Compare Performance**: Measure execution time
- [ ] **Test CI Integration**: Verify GitHub Actions compatibility

#### Validation Checklist:
- [ ] All Jest tests pass
- [ ] All Vitest tests pass  
- [ ] Coverage ≥ 80% in both systems
- [ ] Vitest 30%+ faster than Jest
- [ ] No console errors in either system

#### Issue Resolution:
- [ ] Document any test failures
- [ ] Fix compatibility issues
- [ ] Update test patterns if needed

---

### 5.2 Remove Jest Dependencies
**Status**: ⏳ Pending  
**Estimated Time**: 10 minutes  
**Dependencies**: 5.1 Complete and Validated

#### Tasks:
- [ ] **Uninstall App Jest**: Remove jest dependencies
- [ ] **Uninstall Design System Jest**: Remove jest dependencies
- [ ] **Clean Package Locks**: Update lock files
- [ ] **Verify No Broken Imports**: Check for jest references

#### Uninstall Commands:
```bash
# App package
cd packages/app
npm uninstall jest jest-environment-jsdom @types/jest

# Design System
cd packages/design-system  
npm uninstall jest jest-environment-jsdom ts-jest @types/jest
```

#### Validation:
- [ ] Jest dependencies removed from package.json
- [ ] No broken imports or references
- [ ] Bundle size reduced

---

### 5.3 Remove Jest Configuration Files
**Status**: ⏳ Pending  
**Estimated Time**: 5 minutes  
**Dependencies**: 5.2 Complete

#### Tasks:
- [ ] **Remove App Jest Config**: Delete jest.config.js, jest.setup.js
- [ ] **Remove Design System Jest Config**: Delete jest.config.cjs, jest.setup.js
- [ ] **Clean Git Tracking**: Remove deleted files from git
- [ ] **Final Validation**: Run all npm scripts

#### Files to Remove:
```bash
packages/app/jest.config.js
packages/app/jest.setup.js
packages/design-system/jest.config.cjs
packages/design-system/jest.setup.js
```

#### Validation:
- [ ] Configuration files removed
- [ ] No remaining Jest references
- [ ] All npm scripts work correctly

---

## Success Criteria & Sign-off

### ✅ Migration Complete Checklist
- [ ] **All Tests Pass**: 100% test passage with Vitest
- [ ] **Coverage Maintained**: ≥80% coverage in both packages
- [ ] **Performance Improved**: 30%+ faster test execution
- [ ] **CI/CD Updated**: GitHub Actions working with Vitest
- [ ] **Documentation Updated**: README and guides reflect new commands
- [ ] **Team Training**: Development team familiar with new workflow

### 📋 Post-Migration Tasks
- [ ] **Update CI/CD Pipeline**: Modify GitHub Actions workflow
- [ ] **Update Documentation**: CLAUDE.md and project READMEs
- [ ] **Team Communication**: Announce migration completion
- [ ] **Monitor Performance**: Track test execution metrics
- [ ] **Gather Feedback**: Collect developer experience feedback

---

## Emergency Rollback Procedure

### 🚨 Complete Rollback Steps
If critical issues discovered after migration:

1. **Restore Scripts**:
   ```bash
   git checkout HEAD~1 -- package.json packages/*/package.json
   ```

2. **Reinstall Jest**:
   ```bash
   npm install
   ```

3. **Remove Vitest Files**:
   ```bash
   rm vitest.workspace.ts
   rm packages/*/vitest.config.ts
   rm packages/*/vitest.setup.ts
   ```

4. **Restore Jest Configs**:
   ```bash
   git checkout HEAD~1 -- packages/*/jest.*
   ```

5. **Validate Rollback**:
   ```bash
   npm run test
   ```

### 📞 Escalation
If rollback fails, escalate to:
- Senior developer review
- Full git revert to pre-migration state
- Issue documentation for future retry

---

**Document Status**: Ready for Implementation  
**Last Updated**: 2025-01-20  
**Estimated Total Time**: 4-6 hours  
**Dependencies**: None - Ready to begin