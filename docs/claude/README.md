# Claude AI Documentation

Quick reference and guidelines for working with the Skills Evaluation monorepo.

## 🚀 Quick Start

1. **Check main instructions**: [CLAUDE.md](../../CLAUDE.md)
2. **Essential commands**: [commands.md](quick-reference/commands.md)
3. **Component checklist**: [checklist.md](quick-reference/checklist.md)

## 📁 Documentation Structure

### Quick Reference

- **[Commands](quick-reference/commands.md)** - Essential development commands
- **[Checklist](quick-reference/checklist.md)** - Component creation checklist
- **[Troubleshooting](quick-reference/troubleshooting.md)** - Common issues & fixes

### Guidelines

- **[Design System](guidelines/design-system.md)** - Comprehensive component development guide
- **[Folder Structure](guidelines/folder-structure.md)** - Project organization patterns

### Templates

- **[Component](templates/component.md)** - Implementation templates
- **[Stories](templates/stories.md)** - Storybook templates
- **[Tests](templates/tests.md)** - Testing templates

### Reports

- **[Design System Compliance](reports/design-system-compliance-report.md)** - Current status
- **[Migration Status](reports/migration-status.md)** - Jest to Vitest migration

## 🎯 Key Principles

### Component Development Priority

1. **shadcn/ui** - Use existing components when available
2. **Radix UI** - Build on primitives when shadcn/ui unavailable
3. **Custom** - Last resort with full accessibility

### Quality Standards

- Max 180 lines per component
- 90% test coverage minimum
- WCAG AA accessibility compliance
- TypeScript strict mode

### Workflow

1. Use TodoWrite for task tracking
2. Search codebase before changes
3. Run quality checks after changes
4. Only commit when explicitly requested

## 🔧 After Making Changes

Always run in order:

```bash
npm run type-check
npm run lint
npm run test
```

## 📚 Main Reference

This directory supplements the main [CLAUDE.md](../../CLAUDE.md) file. Always check there first for project instructions and context.
