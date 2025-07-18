---
inclusion: manual
contextKey: mcp-quick-ref
---

# GitHub MCP Quick Reference

## 🚨 Safety First

- ❌ Never push directly to `main`/`master`
- ✅ Always use feature branches
- ✅ Use descriptive commit messages
- ✅ Verify repo/branch before operations

## 📝 Common Commands

### Push Files (Most Used)

```javascript
push_files({
  owner: "ArieGoldkin",
  repo: "my-project",
  branch: "feature/my-feature", // NOT main!
  files: [
    { path: "src/component.tsx", content: "..." },
    { path: "src/component.test.tsx", content: "..." },
  ],
  message: "feat: Add new component with tests",
});
```

### Create Branch

```javascript
create_branch({
  owner: "ArieGoldkin",
  repo: "my-project",
  branch: "feature/new-feature",
  from_branch: "main",
});
```

### Get File Contents

```javascript
get_file_contents({
  owner: "ArieGoldkin",
  repo: "my-project",
  path: "src/config.ts",
});
```

## 🏷️ Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

**Examples:**

- `feat(auth): Add OAuth2 integration`
- `fix(ui): Resolve mobile button alignment`
- `docs(api): Update authentication guide`
- `test(utils): Add date formatting tests`

## ⚡ Quick Workflows

### 1. Feature Development

```javascript
// 1. Create branch
create_branch({ branch: "feature/user-profile", from_branch: "main" })

// 2. Push feature files
push_files({
  branch: "feature/user-profile",
  files: [...],
  message: "feat: Add user profile component"
})

// 3. Create PR (optional)
create_pull_request({
  title: "Add user profile component",
  head: "feature/user-profile",
  base: "main"
})
```

### 2. Documentation Update

```javascript
push_files({
  branch: "docs/update-readme",
  files: [
    { path: "README.md", content: "..." },
    { path: "docs/setup.md", content: "..." },
  ],
  message: "docs: Update README and setup guide",
});
```

### 3. Configuration Changes

```javascript
push_files({
  branch: "config/eslint-update",
  files: [{ path: ".eslintrc.json", content: JSON.stringify(config, null, 2) }],
  message: "chore: Update ESLint configuration",
});
```

## 🔧 Environment Setup

```bash
# .env.local
GITHUB_TOKEN=github_pat_your_token_here
```

## 🚫 What NOT to Do

- ❌ `branch: "main"` (use feature branches)
- ❌ `message: "update"` (be descriptive)
- ❌ Hardcode tokens in code
- ❌ Push sensitive data (API keys, passwords)
- ❌ Skip error handling

## ✅ Best Practices

- ✅ Use conventional commit messages
- ✅ Batch related files in single commit
- ✅ Create feature branches for changes
- ✅ Include tests with new features
- ✅ Verify operations before execution
- ✅ Handle errors gracefully

## 🆘 Troubleshooting

| Error                      | Solution                  |
| -------------------------- | ------------------------- |
| `GITHUB_TOKEN not set`     | Add token to `.env.local` |
| `Resource not accessible`  | Check token permissions   |
| `Reference does not exist` | Create branch first       |
| `SHA does not match`       | Get latest file SHA       |

## 📞 Need Help?

Reference the full guidelines in `.kiro/steering/github-mcp-guidelines.md`