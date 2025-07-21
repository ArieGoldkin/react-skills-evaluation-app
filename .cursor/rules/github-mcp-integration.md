# GitHub MCP Integration Guidelines

## 🚨 Critical Safety Rules

### Repository Access Control

- **Safe Repos**: `react-skills-evaluation-app`, `skill-gap-analyzer`, `students-list`
- **Protected Repos**: `storelux`, `storeluxBackend` (require extra caution)
- Always create feature branches for protected repositories

### Branch Protection

- Never push directly to `main`/`master` branches
- Always use feature branches for changes
- Use descriptive commit messages with conventional format
- Verify repository and branch before operations

## 📝 Commit Message Standards

### Conventional Commit Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

### Examples

- `feat(auth): Add OAuth2 integration`
- `fix(ui): Resolve mobile button alignment`
- `docs(api): Update authentication guide`
- `test(utils): Add date formatting tests`

## ⚡ Quick Workflows

### Feature Development

1. Create feature branch: `feature/component-name`
2. Push files with descriptive commit message
3. Create PR for review (optional)

### Documentation Updates

- Use `docs/` branch prefix
- Update README, guides, and documentation
- Include clear descriptions of changes

### Configuration Changes

- Use `config/` branch prefix
- Update ESLint, Prettier, TypeScript configs
- Test changes before pushing

## 🔒 File Operation Guidelines

### Safe Operations (Low Risk)

- Documentation files (`*.md`, `docs/**/*`)
- Configuration files (`.eslintrc.*`, `tsconfig.json`, `package.json`)
- Test files (`**/*.test.*`, `**/*.spec.*`)

### High-Risk Operations (Require Confirmation)

- Source code changes (`src/**/*.ts`, `src/**/*.tsx`)
- Build and deployment files (`Dockerfile`, `.github/workflows/**/*`)
- Critical configuration (`next.config.*`, `vercel.json`)

## 🚫 What NOT to Do

- ❌ Push directly to `main`/`master` branches
- ❌ Use vague commit messages like "update" or "fix"
- ❌ Hardcode tokens or sensitive data in code
- ❌ Skip error handling in MCP operations
- ❌ Push without verifying target repository

## ✅ Best Practices

- ✅ Use conventional commit messages
- ✅ Batch related files in single commit
- ✅ Create feature branches for all changes
- ✅ Include tests with new features
- ✅ Verify operations before execution
- ✅ Handle errors gracefully
- ✅ Reference issue numbers in commits

## 📚 Reference Files

For detailed guidelines, refer to:

- `.kiro/steering/github-mcp-guidelines.md` - Comprehensive guidelines
- `.kiro/steering/github-mcp-project-config.md` - Project-specific rules
- `.kiro/steering/github-mcp-quick-reference.md` - Quick reference
- `.kiro/steering/github-mcp-checklist.md` - Safety checklist

## 🔧 MCP Tool Usage

### Common Operations

1. **Create Branch**: Use `create_branch` with descriptive names
2. **Update Files**: Use `create_or_update_file` with proper commit messages
3. **Create PRs**: Use `create_pull_request` for code review
4. **Check Status**: Use `get_pull_request_status` to monitor changes

### Error Handling

- Always verify repository and branch names
- Check file paths before operations
- Handle API rate limits gracefully
- Provide clear error messages

## 🎯 Project-Specific Rules

### Branch Naming Conventions

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `test/` - Testing
- `chore/` - Maintenance
- `config/` - Configuration changes
- `refactor/` - Code refactoring

### Repository-Specific Guidelines

- **aiSkillimprove**: Main project, safe for all operations
- **skill-gap-analyzer**: Analysis tools, safe for feature development
- **students-list**: Student management, safe for updates
- **storelux/storeluxBackend**: E-commerce, require extra caution

## 📋 Safety Checklist

Before any MCP operation:

- [ ] Verify target repository
- [ ] Confirm branch name
- [ ] Check file paths
- [ ] Review commit message format
- [ ] Ensure no sensitive data in commits
- [ ] Test changes locally if possible
- [ ] Handle potential errors gracefully
