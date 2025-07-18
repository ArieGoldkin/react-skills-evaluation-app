---
inclusion: always
---

# GitHub MCP Project Configuration

## Project-Specific GitHub MCP Rules

### Repository Configuration

```javascript
// Safe repositories for MCP operations
const SAFE_REPOS = [
  "react-skills-evaluation-app", // Current project - safe for development
  "skill-gap-analyzer", // Development project
  "students-list", // Test repository
];

// Protected repositories (require extra caution)
const PROTECTED_REPOS = [
  "storelux", // Production application
  "storeluxBackend", // Production backend
];

// Always use feature branches for these repos
const REQUIRE_FEATURE_BRANCHES = [
  ...PROTECTED_REPOS,
  "react-skills-evaluation-app", // Even for current project
];
```

### Branch Naming Conventions

```javascript
// Approved branch prefixes
const BRANCH_PREFIXES = {
  feature: "feature/", // New features
  fix: "fix/", // Bug fixes
  docs: "docs/", // Documentation
  test: "test/", // Testing
  chore: "chore/", // Maintenance
  config: "config/", // Configuration changes
  refactor: "refactor/", // Code refactoring
};

// Examples:
// feature/user-authentication
// fix/mobile-button-alignment
// docs/api-documentation
// test/unit-test-coverage
// chore/dependency-updates
```

### File Operation Guidelines

#### Safe Operations (Low Risk)

```javascript
// Documentation updates
const SAFE_OPERATIONS = [
  "README.md",
  "docs/**/*.md",
  "*.md",
  ".kiro/steering/*.md",
  "mcp-tests/**/*",
];

// Configuration files (medium risk)
const CONFIG_FILES = [
  ".eslintrc.*",
  ".prettierrc*",
  "tsconfig.json",
  "package.json",
  "tailwind.config.*",
];
```

#### High-Risk Operations (Require Confirmation)

```javascript
// Source code changes
const HIGH_RISK_OPERATIONS = [
  "src/**/*.ts",
  "src/**/*.tsx",
  "src/**/*.js",
  "src/**/*.jsx",
];

// Build and deployment files
const CRITICAL_FILES = [
  "Dockerfile",
  "docker-compose.yml",
  ".github/workflows/**/*",
  "next.config.*",
  "vercel.json",
];
```

## Project Workflow Templates

### 1. Feature Development Template

```javascript
async function developFeature(featureName, files) {
  const branchName = `feature/${featureName}`;

  // 1. Create feature branch
  await create_branch({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    branch: branchName,
    from_branch: "main",
  });

  // 2. Push feature files
  await push_files({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    branch: branchName,
    files: files,
    message: `feat: ${featureName.replace(/-/g, " ")}`,
  });

  // 3. Create pull request
  await create_pull_request({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    title: `Add ${featureName.replace(/-/g, " ")} feature`,
    head: branchName,
    base: "main",
    body: `## Feature: ${featureName}\n\nThis PR adds the ${featureName} feature.\n\n### Changes:\n- Add new components\n- Include tests\n- Update documentation`,
  });
}
```

### 2. Documentation Update Template

```javascript
async function updateDocumentation(docFiles) {
  await push_files({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    branch: "docs/auto-update",
    files: docFiles,
    message: "docs: Update project documentation",
  });
}
```

### 3. Configuration Update Template

```javascript
async function updateConfiguration(configFiles) {
  const branchName = "config/update-tooling";

  await create_branch({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    branch: branchName,
    from_branch: "main",
  });

  await push_files({
    owner: "ArieGoldkin",
    repo: "react-skills-evaluation-app",
    branch: branchName,
    files: configFiles,
    message: "chore: Update development tooling configuration",
  });
}
```

## Safety Checks

### Pre-Operation Validation

```javascript
function validateMCPOperation(operation) {
  const checks = {
    hasToken: !!process.env.GITHUB_TOKEN,
    validRepo: SAFE_REPOS.includes(operation.repo),
    validBranch: operation.branch !== "main" && operation.branch !== "master",
    hasMessage: operation.message && operation.message.length > 10,
    followsConvention:
      /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+/.test(
        operation.message
      ),
  };

  const failed = Object.entries(checks)
    .filter(([_, passed]) => !passed)
    .map(([check]) => check);

  if (failed.length > 0) {
    throw new Error(`MCP operation failed validation: ${failed.join(", ")}`);
  }

  return true;
}
```

### Operation Logging

```javascript
function logMCPOperation(operation, result) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    operation: operation.type,
    repository: `${operation.owner}/${operation.repo}`,
    branch: operation.branch,
    message: operation.message,
    fileCount: operation.files?.length || 0,
    success: !!result,
    sha: result?.object?.sha,
  };

  console.log("[MCP]", JSON.stringify(logEntry, null, 2));

  // Optional: Save to log file
  // fs.appendFileSync('.mcp-operations.log', JSON.stringify(logEntry) + '\n');
}
```

## Environment-Specific Rules

### Development Environment

```javascript
const DEV_CONFIG = {
  allowDirectPush: false, // Always use branches
  requirePR: true, // Always create PRs
  autoMerge: false, // Manual merge only
  allowExperiments: true, // OK to test MCP features
  logLevel: "debug", // Detailed logging
};
```

### Production Environment

```javascript
const PROD_CONFIG = {
  allowDirectPush: false, // Never push to main
  requirePR: true, // Always require PR
  requireReview: true, // Require code review
  autoMerge: false, // Manual merge only
  allowExperiments: false, // No experimental features
  logLevel: "info", // Standard logging
};
```

## Integration with Project Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "mcp:validate": "node scripts/validate-mcp-config.js",
    "mcp:test": "node scripts/test-mcp-operations.js",
    "mcp:docs": "node scripts/generate-docs-via-mcp.js",
    "mcp:deploy-docs": "node scripts/deploy-docs-via-mcp.js"
  }
}
```

### Example Validation Script

```javascript
// scripts/validate-mcp-config.js
const requiredEnvVars = ["GITHUB_TOKEN"];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

console.log("✅ MCP configuration is valid");
```

## Monitoring and Alerts

### Success Metrics

- Successful operations per day
- Failed operations and reasons
- Most used MCP tools
- Repository activity via MCP

### Alert Conditions

- Failed authentication attempts
- Operations on protected repositories
- Direct pushes to main branch
- Unusual activity patterns

## Conclusion

This configuration provides a safe, structured approach to using GitHub MCP tools in the Skills Evaluation App project. Always prioritize safety and follow the established patterns for consistent, reliable automation.
