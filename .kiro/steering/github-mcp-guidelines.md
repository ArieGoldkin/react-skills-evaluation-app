---
inclusion: always
---

# GitHub MCP Tools Guidelines

This document provides guidelines and best practices for using GitHub MCP (Model Context Protocol) tools in development workflows for the Skills Evaluation App project.

**Project Context:**

- **Repository**: react-skills-evaluation-app (ArieGoldkin/react-skills-evaluation-app)
- **Current Status**: 13/25+ design system components completed (52% complete)
- **Architecture**: Monorepo with app and design-system packages
- **Documentation**: Comprehensive docs/ folder with task management and guidelines

## Overview

GitHub MCP tools allow AI assistants to interact directly with GitHub repositories, enabling automated file operations, repository management, and workflow automation.

## Available MCP Tools

### Core Repository Operations

- `push_files` - Push multiple files to a repository in a single commit
- `create_or_update_file` - Create or update a single file
- `get_file_contents` - Retrieve file contents from a repository
- `delete_file` - Delete files from a repository
- `create_repository` - Create new repositories
- `fork_repository` - Fork existing repositories

### Branch and Commit Management

- `create_branch` - Create new branches
- `list_branches` - List repository branches
- `list_commits` - Get commit history
- `get_commit` - Get specific commit details

### Issue and PR Management

- `create_issue` - Create new issues
- `list_issues` - List repository issues
- `get_issue` - Get specific issue details
- `create_pull_request` - Create pull requests
- `list_pull_requests` - List pull requests
- `merge_pull_request` - Merge pull requests

## Safety Guidelines

### 🚨 Critical Safety Rules

1. **Never Push to Main/Master Without Review**

   ```javascript
   // ❌ DANGEROUS - Direct push to main
   push_files({
     owner: "user",
     repo: "production-app",
     branch: "main", // AVOID!
     files: [...]
   })

   // ✅ SAFE - Use feature branches
   push_files({
     owner: "user",
     repo: "production-app",
     branch: "feature/mcp-automation", // GOOD!
     files: [...]
   })
   ```

2. **Always Use Descriptive Commit Messages**

   ```javascript
   // ❌ BAD
   message: "update files";

   // ✅ GOOD
   message: "feat: Add user authentication components and tests";
   ```

3. **Verify Repository and Branch Before Operations**
   ```javascript
   // Always confirm target before destructive operations
   console.log(`Pushing to: ${owner}/${repo}:${branch}`);
   ```

### 🔒 Repository Access Control

1. **Production Repositories**
   - Require explicit confirmation for production repos
   - Use pull requests instead of direct pushes
   - Always create feature branches

2. **Development/Test Repositories**
   - Safe for direct operations
   - Good for testing MCP workflows
   - Use for prototyping and experimentation

## Best Practices

### File Operations

1. **Batch Related Changes**

   ```javascript
   // ✅ GOOD - Single commit for related files
   push_files({
     files: [
       { path: "src/components/Button.tsx", content: "..." },
       { path: "src/components/Button.test.tsx", content: "..." },
       { path: "src/components/index.ts", content: "..." },
     ],
     message: "feat: Add Button component with tests",
   });
   ```

2. **Organize File Structure**

   ```javascript
   // ✅ GOOD - Clear directory structure
   files: [
     { path: "docs/api/authentication.md", content: "..." },
     { path: "docs/api/users.md", content: "..." },
     { path: "docs/README.md", content: "..." },
   ];
   ```

3. **Include Proper File Extensions**
   ```javascript
   // ✅ GOOD - Proper extensions for syntax highlighting
   { path: "config/database.json", content: "{...}" },
   { path: "scripts/deploy.sh", content: "#!/bin/bash..." },
   { path: "docs/setup.md", content: "# Setup Guide..." }
   ```

### Commit Message Conventions

Follow conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat(auth): Add OAuth2 integration with Google
fix(ui): Resolve button alignment issue on mobile
docs(api): Update authentication endpoint documentation
test(utils): Add unit tests for date formatting functions
```

## Common Use Cases

### 1. Documentation Updates

```javascript
push_files({
  owner: "ArieGoldkin",
  repo: "react-skills-evaluation-app",
  branch: "docs/update-progress",
  files: [
    {
      path: "docs/tasks/current-progress.md",
      content: "# Updated component completion status...",
    },
    {
      path: "docs/tasks/implementation-plan.md",
      content: "# Updated roadmap with new milestones...",
    },
  ],
  message: "docs: Update design system progress and implementation plan",
});
```

### 2. Design System Component Development

```javascript
// Create feature branch first
create_branch({
  owner: "ArieGoldkin",
  repo: "react-skills-evaluation-app",
  branch: "feature/dropdown-menu-component",
  from_branch: "main",
});

// Then push component files following established structure
push_files({
  owner: "ArieGoldkin",
  repo: "react-skills-evaluation-app",
  branch: "feature/dropdown-menu-component",
  files: [
    {
      path: "packages/design-system/src/components/navigation/dropdown-menu/dropdown-menu.tsx",
      content: "...",
    },
    {
      path: "packages/design-system/src/components/navigation/dropdown-menu/dropdown-menu.stories.tsx",
      content: "...",
    },
    {
      path: "packages/design-system/src/components/navigation/dropdown-menu/dropdown-menu.test.tsx",
      content: "...",
    },
    {
      path: "packages/design-system/src/components/navigation/dropdown-menu/index.ts",
      content: "...",
    },
    {
      path: "packages/design-system/src/components/navigation/dropdown-menu/README.md",
      content: "...",
    },
  ],
  message:
    "feat(design-system): Add Dropdown Menu component with comprehensive tests and stories",
});
```

### 3. Configuration Management

```javascript
push_files({
  owner: "ArieGoldkin",
  repo: "my-project",
  branch: "config/update-eslint",
  files: [
    {
      path: ".eslintrc.json",
      content: JSON.stringify(eslintConfig, null, 2),
    },
    {
      path: ".prettierrc",
      content: JSON.stringify(prettierConfig, null, 2),
    },
  ],
  message: "chore: Update ESLint and Prettier configurations",
});
```

## Error Handling

### Common Errors and Solutions

1. **Authentication Errors**

   ```
   Error: GITHUB_TOKEN environment variable not set
   ```

   **Solution:** Ensure GitHub token is properly configured in `.env.local`

2. **Permission Errors**

   ```
   Error: Resource not accessible by integration
   ```

   **Solution:** Check token permissions and repository access rights

3. **Branch Not Found**

   ```
   Error: Reference does not exist
   ```

   **Solution:** Create branch first or verify branch name

4. **File Conflicts**
   ```
   Error: SHA does not match
   ```
   **Solution:** Get latest file SHA before updating existing files

### Error Handling Pattern

```javascript
try {
  const result = await push_files({
    owner: "ArieGoldkin",
    repo: "my-project",
    branch: "feature/new-feature",
    files: [...],
    message: "feat: Add new feature"
  });

  console.log("✅ Files pushed successfully:", result.object.sha);
} catch (error) {
  console.error("❌ Failed to push files:", error.message);

  // Handle specific errors
  if (error.message.includes("GITHUB_TOKEN")) {
    console.log("💡 Check your GitHub token configuration");
  } else if (error.message.includes("not found")) {
    console.log("💡 Verify repository and branch names");
  }
}
```

## Security Considerations

### Token Management

1. **Environment Variables Only**
   - Never hardcode tokens in source code
   - Use `.env.local` for local development
   - Use secure environment variables in production

2. **Token Permissions**
   - Use minimal required permissions
   - Regularly rotate tokens
   - Monitor token usage

3. **Repository Access**
   - Limit token access to necessary repositories
   - Use organization tokens for team projects
   - Audit repository permissions regularly

### Data Protection

1. **Sensitive Information**
   - Never commit secrets, API keys, or passwords
   - Use `.gitignore` for sensitive files
   - Scan commits for sensitive data

2. **Code Review**
   - Review all MCP-generated commits
   - Verify file contents before pushing
   - Use pull requests for important changes

## Workflow Integration

### CI/CD Integration

```javascript
// Example: Automated documentation updates
if (process.env.CI) {
  await push_files({
    owner: process.env.GITHUB_REPOSITORY_OWNER,
    repo: process.env.GITHUB_REPOSITORY_NAME,
    branch: "docs/auto-update",
    files: generateDocumentationFiles(),
    message: "docs: Auto-update API documentation [skip ci]",
  });
}
```

### Development Workflow

1. **Feature Development**
   - Create feature branch
   - Push incremental changes
   - Create pull request
   - Merge after review

2. **Bug Fixes**
   - Create hotfix branch
   - Push fix with tests
   - Create urgent PR
   - Deploy after merge

3. **Documentation**
   - Update docs with code changes
   - Push to docs branch
   - Auto-merge if tests pass

## Monitoring and Logging

### Activity Logging

```javascript
const logMCPActivity = (operation, details) => {
  console.log(`[MCP] ${new Date().toISOString()} - ${operation}:`, details);
};

// Log before operations
logMCPActivity("PUSH_FILES", {
  repo: `${owner}/${repo}`,
  branch,
  fileCount: files.length,
  message,
});
```

### Success Tracking

```javascript
// Track successful operations
const trackSuccess = (operation, result) => {
  console.log(`✅ ${operation} completed:`, {
    sha: result.object.sha,
    timestamp: new Date().toISOString(),
  });
};
```

## Troubleshooting

### Debug Mode

Enable detailed logging for troubleshooting:

```javascript
const DEBUG_MCP = process.env.DEBUG_MCP === "true";

if (DEBUG_MCP) {
  console.log("🔍 MCP Debug Info:", {
    owner,
    repo,
    branch,
    fileCount: files.length,
    tokenPresent: !!process.env.GITHUB_TOKEN,
  });
}
```

### Common Issues Checklist

- [ ] GitHub token is set and valid
- [ ] Repository exists and is accessible
- [ ] Branch exists or can be created
- [ ] File paths are valid
- [ ] Commit message follows conventions
- [ ] No sensitive data in files
- [ ] Proper error handling implemented

## Conclusion

GitHub MCP tools are powerful automation capabilities that require careful use. Following these guidelines ensures safe, effective, and maintainable GitHub operations through AI assistance.

Remember: **With great power comes great responsibility** - always verify operations before execution, especially on production repositories.
