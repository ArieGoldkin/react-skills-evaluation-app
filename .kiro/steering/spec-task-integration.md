---
inclusion: always
---

# Spec Task Integration with Documentation

## Overview

This document defines how to integrate the Kiro spec task execution workflow with the comprehensive task documentation system established in the `docs/` folder.

## Task Execution Workflow

### Before Executing Spec Tasks

Always check the current project status:

1. **Review Current Progress**: Check `docs/tasks/current-progress.md` for:
   - 13/25+ components completed (52% complete)
   - 418 tests passing across all components
   - Next priority: Dropdown Menu Component

2. **Check Implementation Plan**: Reference `docs/tasks/implementation-plan.md` for:
   - Phase-by-phase roadmap
   - Component priorities and dependencies
   - Success criteria and milestones

3. **Use Task Templates**: Follow `docs/tasks/component-task-template.md` for:
   - Standardized implementation workflow
   - Estimation guidelines (2-3 hours per component)
   - Quality gates and success criteria

### Task Execution Guidelines

When executing tasks for design system components:

#### 1. Task Status Management

- Always update task status using the `taskStatus` tool:
  - Set to "in_progress" before starting implementation
  - Set to "completed" when fully implemented and tested
  - For tasks with sub-tasks, complete all sub-tasks first

#### 2. Implementation Approach

- Reference established patterns from 13 completed components
- Follow folder structure: `packages/design-system/src/components/[category]/[component-name]/`
- Create all required files: component.tsx, stories.tsx, test.tsx, index.ts, README.md
- Use CVA (Class Variance Authority) for variant management

#### 3. Quality Validation

- Follow established testing patterns (90%+ coverage, 30+ tests typical)
- Create Storybook stories (12+ variations per component)
- Update export management (category and main index files)
- Implement TypeScript interfaces and React.forwardRef patterns

### Integration with Current Progress

#### Task Completion Updates

When completing spec tasks, update progress in:

- `docs/tasks/current-progress.md` - Real-time component status
- Component completion metrics (tests passing, coverage, etc.)

#### Quality Validation

Use established quality gates from completed components:

- TypeScript compilation (zero errors)
- Test coverage (90%+ minimum, current: 100%)
- Accessibility compliance (WCAG AA)
- Documentation completeness (Storybook + README)

### Task Execution Commands

Reference the established development commands:

```bash
# Design system development
npm run design-system:storybook
npm run design-system:test
npm run design-system:build

# Quality checks (run after implementation)
npm run type-check
npm run lint
npm run test
```

## Task Execution Best Practices

### 1. One Task at a Time

- Focus on implementing one task completely before moving to the next
- For complex tasks with sub-tasks, complete sub-tasks in order
- Verify each task against requirements before marking as complete

### 2. Reference Existing Components

- Use completed components as reference for implementation patterns
- Follow established patterns for folder structure and file organization
- Maintain consistency with existing component APIs

### 3. Quality First Approach

- Prioritize quality over speed
- Follow all established quality gates
- Ensure 100% test coverage for all components
- Maintain WCAG AA accessibility compliance

### 4. Documentation Integration

- Update progress documentation after completing each task
- Add detailed completion metrics (tests passing, coverage, etc.)
- Document any challenges or learnings for future reference

## Conclusion

This integration ensures that the Kiro spec task execution workflow leverages the comprehensive task documentation system, maintaining consistency with the established patterns from 13 completed components while providing clear guidance for future development.

**Key Integration Points:**

- Tasks reference current progress and established patterns
- Implementation follows proven component development workflow
- Quality gates match current project standards (418 tests, 100% coverage)
- Success criteria integrate with ongoing progress tracking
