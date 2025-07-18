---
inclusion: manual
contextKey: mcp-checklist
---

# GitHub MCP Operations Checklist

## 🔍 Pre-Operation Checklist

### Environment Setup

- [ ] GitHub token is configured in `.env.local`
- [ ] Token has necessary permissions (repo access)
- [ ] Repository exists and is accessible
- [ ] Working directory is correct project

### Operation Planning

- [ ] Target repository is identified and safe for operations
- [ ] Branch strategy is planned (feature branch, not main)
- [ ] Commit message follows conventional format
- [ ] Files are organized and properly structured
- [ ] No sensitive data (API keys, passwords) in files

### Safety Verification

- [ ] **NOT pushing to main/master branch**
- [ ] Branch name follows naming conventions
- [ ] Commit message is descriptive and follows format
- [ ] File paths are correct and intentional
- [ ] Operation is reversible if needed

## 📋 During Operation

### File Operations

- [ ] File contents are correct and complete
- [ ] File extensions match content type
- [ ] Directory structure is logical
- [ ] No duplicate or conflicting files
- [ ] File sizes are reasonable

### Commit Details

- [ ] Commit message format: `type(scope): description`
- [ ] Message clearly describes what changed
- [ ] Related files are grouped in single commit
- [ ] Commit is atomic (single logical change)

## ✅ Post-Operation Checklist

### Verification

- [ ] Operation completed successfully
- [ ] Files were created/updated as expected
- [ ] Commit appears in repository history
- [ ] Branch is visible in repository
- [ ] No errors or warnings in response

### Follow-up Actions

- [ ] Create pull request if needed
- [ ] Notify team members if required
- [ ] Update local repository if working locally
- [ ] Document changes if significant
- [ ] Plan next steps or related tasks

## 🚨 Emergency Checklist

### If Something Goes Wrong

- [ ] Don't panic - most operations are reversible
- [ ] Check error message for specific issue
- [ ] Verify repository and branch names
- [ ] Check GitHub token permissions
- [ ] Review file contents for issues
- [ ] Consider creating revert commit if needed

### Common Issues

- [ ] **Token Error**: Check `.env.local` configuration
- [ ] **Permission Error**: Verify token has repo access
- [ ] **Branch Error**: Ensure branch exists or create it
- [ ] **File Error**: Check file paths and content
- [ ] **Network Error**: Retry operation after brief wait

## 📝 Operation Templates

### Quick Feature Addition

```
✅ Pre-flight:
- Repository: react-skills-evaluation-app
- Branch: feature/[feature-name]
- Message: feat: Add [feature description]
- Files: Component + Test + Documentation

✅ Safety:
- Not pushing to main ✓
- Descriptive commit message ✓
- Feature branch created ✓
- Files reviewed ✓
```

### Documentation Update

```
✅ Pre-flight:
- Repository: [project-repo]
- Branch: docs/[update-type]
- Message: docs: Update [what documentation]
- Files: README.md, docs/*.md

✅ Safety:
- Documentation only ✓
- No code changes ✓
- Clear descriptions ✓
- Proper formatting ✓
```

### Configuration Change

```
✅ Pre-flight:
- Repository: [project-repo]
- Branch: config/[config-type]
- Message: chore: Update [configuration type]
- Files: Config files only

✅ Safety:
- Configuration branch ✓
- No breaking changes ✓
- Tested locally ✓
- Backup available ✓
```

## 🎯 Success Criteria

### Operation Success

- [ ] All files pushed successfully
- [ ] Commit created with correct message
- [ ] Branch updated properly
- [ ] No errors or warnings
- [ ] Repository state is as expected

### Quality Success

- [ ] Code follows project standards
- [ ] Documentation is updated
- [ ] Tests are included where needed
- [ ] No sensitive data exposed
- [ ] Changes are reviewable

### Process Success

- [ ] Followed safety guidelines
- [ ] Used proper branch strategy
- [ ] Created appropriate commit messages
- [ ] Documented significant changes
- [ ] Communicated with team if needed

## 📊 Tracking

### Operation Log

```
Date: [YYYY-MM-DD]
Time: [HH:MM]
Repository: [owner/repo]
Branch: [branch-name]
Operation: [push_files/create_branch/etc]
Files: [count and types]
Message: [commit message]
Result: [success/failure]
Notes: [any additional notes]
```

### Weekly Review

- [ ] Review all MCP operations from the week
- [ ] Identify any patterns or issues
- [ ] Update guidelines if needed
- [ ] Share learnings with team
- [ ] Plan improvements for next week

---

**Remember**: When in doubt, use a feature branch and create a pull request. It's always better to be safe than sorry with repository operations!