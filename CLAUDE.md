# Claude AI Assistant Instructions

## IMPORTANT: Primary Source of Truth

**ALL Claude AI guidelines and instructions are now consolidated in the `.kiro/steering/` folder.**

The steering folder contains all rules, standards, and guidelines for Claude AI assistance on this project.

## Key Steering Files

- **Primary Instructions**: `.kiro/steering/claude-primary-instructions.md` - Essential commands and rules
- **Project Rules**: `.kiro/steering/project-rules.md` - Project overview and standards
- **Frontend Quality**: `.kiro/steering/react-typescript-quality-rules.md` - React/TypeScript patterns
- **Backend Quality**: `.kiro/steering/backend-api-development-guidelines.md` - API development rules
- **Design System**: `.kiro/steering/design-system-development.md` - Component workflow
- **Git Workflow**: `.kiro/steering/git-workflow.md` - Version control standards
- **Monorepo Guide**: `.kiro/steering/monorepo-navigation.md` - Project structure

## Quick Reference

For essential commands and immediate guidance, see:
`.kiro/steering/claude-primary-instructions.md`

All steering files have `inclusion: always` metadata and are automatically loaded for every Claude interaction.

## VS Code Tasks Configuration

**IMPORTANT**: This project has a comprehensive VS Code tasks system configured in `.vscode/tasks.json` with:

### Available Task Categories:

- 🎨 **Frontend Tasks** - Development, building, and design system
- 🗄️ **Database Tasks** - Prisma operations (generate, migrate, studio, seed, reset)
- ✅ **Quality Tasks** - Type-checking, linting, formatting
- 🧪 **Testing Tasks** - Run tests, watch mode, coverage
- 🔒 **Security Tasks** - npm audit and dependency checks
- 🚀 **Deployment Tasks** - Production builds and pre-deployment checks
- 🚦 **Compound Tasks** - Common workflows (e.g., Start All, Pre-commit Check)

### Key Commands to Run (via VS Code Task Runner):

- **Development**: Use `🚦 Dev | Start All` to launch frontend + design system
- **Quality Checks**: Use `✅ Quality | Check All` before committing
- **Testing**: Use `🧪 Test | Run` or `🧪 Test | Watch` for testing
- **Database**: Use `🗄️ Database | Setup` for complete DB initialization
- **Pre-commit**: Use `🚦 Git | Pre-commit Check` before committing

### DO NOT:

- Create duplicate npm scripts that already exist in tasks.json
- Suggest running commands directly when a VS Code task exists
- Recreate the tasks configuration - it's already optimized

### DO:

- Reference existing tasks by their emoji labels
- Use the task runner for all development workflows
- Check `.vscode/tasks.json` before suggesting new commands
- Leverage keyboard shortcuts defined in `.vscode/keybindings.json`

**Note**: All tasks have been verified to work with the current package.json scripts.

---

_This file now serves as a pointer to the authoritative guidelines in the steering folder._
