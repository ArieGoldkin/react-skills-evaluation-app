# Git Workflow for New Tasks

## Starting a New Task

When beginning work on a new task, always follow this workflow:

### 1. Create Feature Branch First

```bash
# Create and switch to new feature branch
git checkout -b feature/task-name

# Or for different task types:
git checkout -b fix/bug-description
git checkout -b docs/documentation-update
git checkout -b refactor/component-restructure
git checkout -b test/add-unit-tests
git checkout -b chore/dependency-updates
```

### 2. Make Initial Commit

After creating the branch, make your first commit with the initial changes:

```bash
# Stage your changes
git add .

# Commit with conventional commit message
git commit -m "feat: initial implementation of task-name"

# Push the new branch to remote
git push -u origin feature/task-name
```

### 3. Continue Development

Continue making commits on the feature branch:

```bash
git add .
git commit -m "feat: add component logic"
git push
```

### 4. Create Pull Request

When ready, create a PR to merge back to main:

```bash
# Push final changes
git push

# Then create PR via GitHub UI or CLI
gh pr create --title "Add task-name feature" --body "Description of changes"
```

## Branch Naming Conventions

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Adding tests
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring
- `config/` - Configuration changes

## Commit Message Format

```
<type>(<scope>): <description>

Examples:
feat(auth): add Google OAuth integration
fix(ui): resolve button alignment on mobile
docs(api): update authentication endpoints
test(utils): add unit tests for date helpers
```

This workflow ensures:

- Clean commit history
- Proper feature isolation
- Easy code review process
- Safe integration with main branch
