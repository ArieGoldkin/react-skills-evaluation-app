---
inclusion: always
---

# Spec Workflow Integration with Task Documentation

## Overview

This document defines how the Kiro spec workflow integrates with the comprehensive task documentation system established in the `docs/` folder.

## Spec Workflow Enhancement

### Before Creating New Specs

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

### Spec Creation Guidelines

When creating specs for design system components:

#### Requirements Phase

- Reference existing component patterns from completed components
- Use `docs/tasks/component-checklist.md` for quality requirements
- Consider shadcn/ui availability (first choice) vs Radix UI primitives (second choice)
- Include accessibility requirements (WCAG AA compliance mandatory)

#### Design Phase

- Reference established patterns from 13 completed components
- Include folder structure: `packages/design-system/src/components/[category]/[component-name]/`
- Plan for required files: component.tsx, stories.tsx, test.tsx, index.ts, README.md
- Consider CVA (Class Variance Authority) for variant management

#### Task List Phase

- Follow established testing patterns (90%+ coverage, 30+ tests typical)
- Include Storybook story requirements (12+ variations per component)
- Reference export management (category and main index updates)
- Plan for TypeScript interfaces and React.forwardRef patterns

### Integration with Current Progress

#### Task Status Updates

When executing spec tasks, update progress in:

- `docs/tasks/current-progress.md` - Real-time component status
- Component completion metrics (tests passing, coverage, etc.)

#### Quality Validation

Use established quality gates from completed components:

- TypeScript compilation (zero errors)
- Test coverage (90%+ minimum, current: 100%)
- Accessibility compliance (WCAG AA)
- Documentation completeness (Storybook + README)

### Spec Templates for Design System Components

#### Component Spec Template

```markdown
# [Component Name] Component Spec

## Requirements

### User Stories

As a developer using the design system, I want [component functionality], so that [benefit].

### Acceptance Criteria

1. WHEN implementing the component THEN it SHALL follow the established folder structure pattern
2. WHEN creating variants THEN the component SHALL use CVA for variant management
3. WHEN testing THEN the component SHALL achieve 90%+ test coverage
4. WHEN documenting THEN the component SHALL include 12+ Storybook variations

## Design

### Implementation Approach

1. **Research Phase**: Check shadcn/ui availability first
2. **Base Implementation**: Use shadcn/ui or Radix UI primitives
3. **Enhancement**: Add project-specific features and styling
4. **Integration**: Follow established TypeScript and accessibility patterns

### File Structure
```

packages/design-system/src/components/[category]/[component-name]/
├── index.ts
├── [component-name].tsx
├── [component-name].stories.tsx
├── [component-name].test.tsx
└── README.md

```

### Quality Requirements
- Maximum 180 lines per component file
- React.forwardRef for DOM elements
- TypeScript interfaces with VariantProps
- WCAG AA accessibility compliance

## Tasks

- [ ] 1. Research shadcn/ui and Radix UI availability
- [ ] 2. Create component folder structure
- [ ] 3. Implement base component with TypeScript
- [ ] 4. Add CVA variant system
- [ ] 5. Create comprehensive test suite (30+ tests)
- [ ] 6. Build Storybook stories (12+ variations)
- [ ] 7. Write component README with examples
- [ ] 8. Update export indexes (category and main)
- [ ] 9. Validate against component checklist
- [ ] 10. Update progress documentation
```

### Success Metrics Integration

Align spec success criteria with established project metrics:

- **Test Coverage**: Match current 100% coverage on completed components
- **Documentation**: Follow pattern of complete Storybook + README
- **Accessibility**: Maintain WCAG AA compliance across all components
- **TypeScript**: Zero compilation errors (current standard)
- **Performance**: Component size limits (180 lines max)

### Workflow Commands Integration

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

## Conclusion

This integration ensures that the Kiro spec workflow leverages the comprehensive task documentation system, maintaining consistency with the established patterns from 13 completed components while providing clear guidance for future development.

**Key Integration Points:**

- Specs reference current progress and established patterns
- Task lists align with proven component development workflow
- Quality gates match current project standards (418 tests, 100% coverage)
- Success criteria integrate with ongoing progress tracking
