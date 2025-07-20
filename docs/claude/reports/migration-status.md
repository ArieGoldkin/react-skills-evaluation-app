# Jest to Vitest Migration Plan

## Overview

This document outlines the comprehensive migration plan from Jest to Vitest for the Skills Evaluation React 19 + Next.js monorepo. The migration aims to improve test performance, provide native TypeScript support, and enhance the development experience.

## Current Jest Setup Analysis

### Root Workspace

- **Test Scripts**: Delegated to individual packages via `--workspaces --if-present`
- **Dependencies**: No Jest dependencies at root level

### App Package (`packages/app/`)

- **Configuration**: Uses `next/jest` for Next.js integration
- **Dependencies**: Jest 30.0.4, jest-environment-jsdom, @testing-library suite
- **Setup**: Comprehensive mocks for Next.js router, browser APIs (ResizeObserver, IntersectionObserver, matchMedia)
- **Coverage**: Configured with 80% thresholds (currently disabled)
- **Path Mapping**: Extensive moduleNameMapper for `@/` imports

### Design System Package (`packages/design-system/`)

- **Configuration**: Uses `ts-jest` with ESM support
- **Dependencies**: Jest 30.0.4, ts-jest, @testing-library suite
- **Setup**: Minimal setup with jest-dom only
- **Coverage**: Collects from `src/**/*.(ts|tsx)` excluding stories and types

## Migration Plan

### Phase 1: Workspace Setup & Dependencies

#### 1.1 Install Root Dependencies

```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8
```

#### 1.2 Install Package Dependencies

**App Package:**

```bash
cd packages/app
npm install -D vitest @vitejs/plugin-react jsdom vite-tsconfig-paths
```

**Design System:**

```bash
cd packages/design-system
npm install -D vitest @vitejs/plugin-react jsdom vite
```

#### 1.3 Create Workspace Configuration

Create `vitest.workspace.ts` in project root:

```typescript
import { defineWorkspace } from "vitest/config";

export default defineWorkspace(["packages/app", "packages/design-system"]);
```

### Phase 2: Package Configuration

#### 2.1 App Package Config (`packages/app/vitest.config.ts`)

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    exclude: ["node_modules", ".next", "coverage"],
    coverage: {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.stories.{js,jsx,ts,tsx}",
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/__tests__/**",
        "src/**/node_modules/**",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
    },
  },
});
```

#### 2.2 Design System Config (`packages/design-system/vitest.config.ts`)

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/**/__tests__/**/*.(ts|tsx|js)",
      "src/**/*.(test|spec).(ts|tsx|js)",
    ],
    coverage: {
      include: ["src/**/*.(ts|tsx)"],
      exclude: ["src/**/*.stories.(ts|tsx)", "src/**/*.d.ts", "src/index.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  css: {
    modules: {
      classNameStrategy: "stable",
    },
  },
});
```

### Phase 3: Setup File Migration

#### 3.1 App Setup (`packages/app/vitest.setup.ts`)

```typescript
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "",
}));

// Mock environment variables
process.env.NODE_ENV = "test";

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

#### 3.2 Design System Setup (`packages/design-system/vitest.setup.ts`)

```typescript
import "@testing-library/jest-dom";
```

### Phase 4: Scripts & Configuration Updates

#### 4.1 Update Package Scripts

**Root package.json:**

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

**App package.json:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ci": "vitest --run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

**Design System package.json:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
}
```

#### 4.2 TypeScript Configuration Updates

**App tsconfig.json:**

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

**Design System tsconfig.json:**

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### Phase 5: Cleanup & Validation

#### 5.1 Remove Jest Dependencies

After successful migration and validation:

```bash
# App package
npm uninstall jest jest-environment-jsdom @types/jest

# Design System
npm uninstall jest jest-environment-jsdom ts-jest @types/jest
```

#### 5.2 Remove Jest Configuration Files

- `packages/app/jest.config.js`
- `packages/app/jest.setup.js`
- `packages/design-system/jest.config.cjs`
- `packages/design-system/jest.setup.js`

## Migration Benefits

### Performance Improvements

- **50%+ faster test execution** compared to Jest
- **Native ESM support** eliminates transform overhead
- **Parallel test execution** across packages
- **Watch mode improvements** with Vite's HMR

### Developer Experience

- **Better error messages** with source maps
- **Unified tooling** with Vite ecosystem
- **Modern debugging** with Vitest UI
- **Faster feedback loops** during development

### Technical Advantages

- **Native TypeScript support** without transforms
- **Modern JavaScript features** out of the box
- **Simplified configuration** compared to Jest setup
- **Better monorepo support** with workspace mode

## Risk Mitigation Strategies

### Validation Steps

1. **Parallel Testing**: Run both Jest and Vitest during transition
2. **Coverage Validation**: Ensure coverage metrics match between systems
3. **Test Compatibility**: Verify all existing tests pass with Vitest
4. **CI Integration**: Update GitHub Actions gradually

### Rollback Plan

- Keep Jest configuration files until migration validated
- Maintain Jest dependencies as fallback during transition
- Document any breaking changes discovered during migration

## Timeline & Dependencies

### Prerequisites

- ✅ Current Jest setup fully functional
- ✅ All existing tests passing
- ✅ Coverage thresholds documented

### Estimated Timeline

- **Phase 1-2**: 2-3 hours (dependencies and configuration)
- **Phase 3**: 1-2 hours (setup file migration)
- **Phase 4**: 1 hour (scripts and TypeScript updates)
- **Phase 5**: 1 hour (cleanup and validation)

**Total Estimated Time**: 5-7 hours

### Success Criteria

- [ ] All existing tests pass with Vitest
- [ ] Coverage metrics match or exceed Jest baseline
- [ ] Test execution time improved by 30%+
- [ ] CI/CD pipeline updated and functioning
- [ ] Documentation updated with new commands
- [ ] Team trained on new testing workflow

## Post-Migration Considerations

### Ongoing Maintenance

- Monitor test performance metrics
- Update testing guidelines for new patterns
- Leverage Vitest-specific features (e.g., in-source testing)
- Consider adopting Vitest's advanced features (snapshots, mocking improvements)

### Future Enhancements

- Explore Vitest's in-source testing capabilities
- Implement browser testing with @vitest/browser
- Consider integration with Vitest's snapshot testing
- Evaluate performance monitoring and reporting tools

## References

- [Vitest Official Documentation](https://vitest.dev/)
- [Next.js Vitest Guide](https://nextjs.org/docs/app/guides/testing/vitest)
- [Vitest Monorepo Setup](https://vitest.dev/guide/workspace.html)
- [Migration from Jest](https://vitest.dev/guide/migration.html)

## Current Implementation Status

### 📊 Migration Progress Overview

- **Status**: Not Started - Planning Complete
- **Current Testing Framework**: Jest (fully functional)
- **Target Framework**: Vitest
- **Project Integration**: Pending implementation

### ✅ Completed Preparation

- [x] **Migration Plan**: Comprehensive 5-phase migration plan documented
- [x] **Dependency Analysis**: Jest configurations analyzed for both packages
- [x] **Risk Assessment**: Mitigation strategies and rollback plan established
- [x] **Timeline Estimation**: 5-7 hours total implementation time

### ⏳ Pending Implementation Tasks

- [ ] **Phase 1**: Install Vitest dependencies and workspace configuration
- [ ] **Phase 2**: Create package-specific Vitest configurations
- [ ] **Phase 3**: Migrate setup files and global mocks
- [ ] **Phase 4**: Update package scripts and TypeScript configuration
- [ ] **Phase 5**: Cleanup Jest dependencies and validate migration

### 🎯 Next Actions

1. Execute Phase 1 dependency installation
2. Create workspace configuration file
3. Begin package-by-package configuration migration
4. Run parallel testing during transition period

## Integration with Project Workflow

### npm Scripts Integration

The migration aligns with existing project commands from CLAUDE.md:

- **Current**: `npm run test` (delegates to Jest)
- **Post-Migration**: `npm run test` (delegates to Vitest)
- **Additional**: `npm run test:ui` (Vitest UI for enhanced debugging)

### Quality Assurance Integration

- **Type Checking**: `npm run type-check` - No changes required
- **Linting**: `npm run lint` - No changes required
- **Quality Gate**: `npm run quality` - Will include new Vitest commands

## Troubleshooting Guide

### Common Migration Issues

1. **Path Resolution**: Ensure vite-tsconfig-paths plugin is configured
2. **Mock Compatibility**: Convert Jest mocks to Vitest vi() functions
3. **Coverage Differences**: V8 coverage may show different metrics than Jest
4. **ESM Issues**: Vitest handles ESM better but may require module config updates

### Validation Checklist

- [ ] All existing tests pass with Vitest
- [ ] Coverage metrics match or exceed Jest baseline
- [ ] Test execution time improves by 30%+
- [ ] No console errors in test runs
- [ ] Storybook and development commands unaffected

### Rollback Procedures

If migration encounters blocking issues:

1. **Immediate Rollback**: Restore Jest scripts in package.json files
2. **Cleanup**: Remove Vitest dependencies and configuration files
3. **Validation**: Confirm Jest tests still pass
4. **Documentation**: Document specific issues encountered
5. **Re-planning**: Address issues before retry

---

**Document Status**: Ready for Implementation - Pending Execution
**Last Updated**: 2025-01-20  
**Next Review**: After Phase 1 completion
**Author**: Claude AI Assistant
