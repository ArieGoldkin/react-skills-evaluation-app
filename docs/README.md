# Project Documentation

Welcome to the Skills Evaluation App documentation. This directory contains essential project documentation and resources.

## 📂 Documentation Structure

### 🔥 Core Documentation

- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current project status and progress
- **[ROADMAP.md](./ROADMAP.md)** - Future development phases and goals
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API endpoint reference
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Developer setup and workflow

### 🤖 Claude AI Guidelines

**Primary Source**: `.kiro/steering/` folder contains all Claude AI rules and guidelines.

- **[../CLAUDE.md](../CLAUDE.md)** - Pointer to steering folder (project root)
- **[claude/](./claude/)** - Legacy guidelines (archived, use steering folder instead)

### 🏗️ Backend Documentation

- **[backend/API_ENHANCEMENT_GUIDE.md](./backend/API_ENHANCEMENT_GUIDE.md)** - API development patterns
- **[backend/HYBRID_BACKEND_IMPLEMENTATION.md](./backend/HYBRID_BACKEND_IMPLEMENTATION.md)** - Backend architecture

### 📚 Archive

- **[archive/](./archive/)** - Historical documents and completed planning materials

## 🎯 Quick Reference

### For Developers

1. **Current Status**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
2. **Setup Guide**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
3. **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **API Docs**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### For Claude AI

1. **Primary Guidelines**: `.kiro/steering/claude-primary-instructions.md`
2. **Project Rules**: `.kiro/steering/project-rules.md`
3. **Quality Standards**: `.kiro/steering/react-typescript-quality-rules.md`

### For Project Management

1. **Current Progress**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
2. **Future Plans**: [ROADMAP.md](./ROADMAP.md)
3. **Development Process**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

## 📊 Current Status (Phase 1.4)

- **Design System**: 13/25+ components complete (52%)
- **Tests**: 418 passing across all components ✅
- **TypeScript**: 100% compliance, zero errors ✅
- **Current Focus**: Skill management forms + Dropdown Menu component

## 🏃‍♂️ Quick Start

### Essential Commands

```bash
npm run dev                 # Start development server
npm run type-check         # TypeScript validation
npm run lint               # Code quality check
npm run test               # Run test suite
npm run quality            # All quality checks
```

### Next Priority

**Dropdown Menu Component** - `packages/design-system/src/components/navigation/dropdown-menu/`

## 📋 Documentation Standards

### Status Indicators

- ✅ **Complete** - Fully implemented and tested
- 🔄 **In Progress** - Currently being worked on
- ⏳ **Planned** - Not yet started but planned
- ❌ **Blocked** - Cannot proceed due to dependencies

### File Organization

- Keep documentation current with implementation
- Use descriptive filenames with kebab-case
- Link between related documents
- Include practical examples where applicable

## 🔄 Maintenance

This documentation is actively maintained:

- **PROJECT_STATUS.md** - Updated with each phase completion
- **ROADMAP.md** - Revised based on progress and priorities
- **Archive folder** - Contains historical documents for reference
- **Steering files** - Primary source for Claude AI guidelines

---

_For the most current information, always check PROJECT_STATUS.md and the .kiro/steering/ folder._
