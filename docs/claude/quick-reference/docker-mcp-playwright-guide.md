# Docker MCP Playwright UI Testing Guide

## Overview

This guide provides comprehensive instructions for using the Docker MCP Playwright toolkit to test and navigate the Skills Evaluation app's user interface. The toolkit provides browser automation capabilities through Playwright running in Docker containers.

## Prerequisites

- Development server running (`npm run dev` - serves on http://localhost:3000)
- Docker MCP integration configured and available
- Skills Evaluation app loaded and accessible

## Available Tools Reference

### Core Browser Control
- `mcp__MCP_DOCKER__browser_install` - Install browser if needed
- `mcp__MCP_DOCKER__browser_navigate` - Navigate to URLs
- `mcp__MCP_DOCKER__browser_navigate_back` - Go back to previous page
- `mcp__MCP_DOCKER__browser_navigate_forward` - Go forward to next page
- `mcp__MCP_DOCKER__browser_close` - Close the browser page

### Page Interaction
- `mcp__MCP_DOCKER__browser_click` - Perform clicks (left, right, middle, double-click)
- `mcp__MCP_DOCKER__browser_type` - Type text into elements
- `mcp__MCP_DOCKER__browser_press_key` - Press keyboard keys
- `mcp__MCP_DOCKER__browser_hover` - Hover over elements
- `mcp__MCP_DOCKER__browser_drag` - Drag and drop between elements
- `mcp__MCP_DOCKER__browser_select_option` - Select options in dropdowns

### Page Analysis & Capture
- `mcp__MCP_DOCKER__browser_snapshot` - Capture accessibility snapshots (preferred)
- `mcp__MCP_DOCKER__browser_take_screenshot` - Take visual screenshots
- `mcp__MCP_DOCKER__browser_evaluate` - Execute JavaScript on page

### Advanced Features
- `mcp__MCP_DOCKER__browser_file_upload` - Upload files to forms
- `mcp__MCP_DOCKER__browser_handle_dialog` - Handle JavaScript dialogs
- `mcp__MCP_DOCKER__browser_wait_for` - Wait for elements or conditions
- `mcp__MCP_DOCKER__browser_resize` - Resize browser window

### Tab Management
- `mcp__MCP_DOCKER__browser_tab_new` - Open new tabs
- `mcp__MCP_DOCKER__browser_tab_close` - Close tabs
- `mcp__MCP_DOCKER__browser_tab_select` - Switch between tabs
- `mcp__MCP_DOCKER__browser_tab_list` - List all open tabs

### Debugging & Monitoring
- `mcp__MCP_DOCKER__browser_console_messages` - Get console messages
- `mcp__MCP_DOCKER__browser_network_requests` - Monitor network requests

## Common Workflows

### 1. Basic Setup Workflow

```
1. Ensure dev server is running: npm run dev (http://localhost:3000)
2. Install browser: mcp__MCP_DOCKER__browser_install
3. Navigate to app: mcp__MCP_DOCKER__browser_navigate (url: "http://localhost:3000")
4. Take initial snapshot: mcp__MCP_DOCKER__browser_snapshot
```

### 2. UI Component Testing Workflow

```
1. Navigate to page
2. Take baseline screenshot
3. Interact with components
4. Verify changes with new snapshots
5. Test different states/variants
```

### 3. Form Testing Workflow

```
1. Navigate to form page
2. Fill form fields using browser_type
3. Test validation states
4. Submit form
5. Verify response/navigation
```

## Skills Evaluation App Specific Guide

### Homepage Structure (`http://localhost:3000`)

**Key Components to Test:**
- **Theme Toggle** (top-right corner)
  - Cycles through: light → dark → system → light
  - Visual icon changes: sun → moon → monitor
- **Login Form** (right column)
  - Email input field
  - Password input field
  - "Remember me" checkbox
  - Sign in button
  - Google OAuth button
- **Feature Cards** (left column)
  - Skills Analysis
  - AI Recommendations
  - Progress Tracking

### Theme Toggle Testing

```
Element: "Theme toggle button in top right"
Ref: Look for button with sun/moon/monitor icons

Test Workflow:
1. Take screenshot of current theme
2. Click theme toggle
3. Verify theme change (visual and icon)
4. Repeat to test all three modes
5. Verify system mode respects OS preference
```

### Login Form Testing

```
Email Input:
- Element: "Email input field"
- Ref: input[type="email"] or id="email"
- Test: Type valid/invalid email formats

Password Input:
- Element: "Password input field" 
- Ref: input[type="password"] or id="password"
- Test: Type password, verify masking

Remember Me Checkbox:
- Element: "Remember me checkbox"
- Ref: input[type="checkbox"] or id="remember"
- Test: Click to toggle state

Sign In Button:
- Element: "Sign in button"
- Test: Click and verify form submission behavior

Google Login Button:
- Element: "Google login button"
- Test: Click and verify OAuth redirect
```

### Responsive Testing

```
1. Set initial size: browser_resize (width: 1920, height: 1080)
2. Take desktop screenshot
3. Resize to tablet: browser_resize (width: 768, height: 1024)
4. Take tablet screenshot
5. Resize to mobile: browser_resize (width: 375, height: 667)
6. Take mobile screenshot
7. Verify layout adaptations
```

## Element Targeting Best Practices

### Human-Readable Descriptions
Use clear, descriptive element descriptions:
- ✅ "Theme toggle button in top right corner"
- ✅ "Email input field in login form"
- ❌ "button"
- ❌ "input"

### Element References
Use specific selectors when available:
- CSS selectors: `#email`, `.theme-toggle`
- ARIA labels: `[aria-label="Toggle theme"]`
- Data attributes: `[data-testid="login-form"]`

## Error Handling & Debugging

### Common Issues

**Browser Not Found:**
```
Solution: Run mcp__MCP_DOCKER__browser_install first
```

**Element Not Found:**
```
1. Take snapshot to see current page state
2. Check element description accuracy
3. Wait for element: browser_wait_for
4. Verify page loaded completely
```

**Timeouts:**
```
1. Increase wait times
2. Check network requests for loading states
3. Use browser_console_messages for JavaScript errors
```

### Debugging Tools

**Check Console Errors:**
```
mcp__MCP_DOCKER__browser_console_messages
```

**Monitor Network Activity:**
```
mcp__MCP_DOCKER__browser_network_requests
```

**Execute Custom JavaScript:**
```
mcp__MCP_DOCKER__browser_evaluate
function: "() => { return document.readyState; }"
```

## Best Practices

### 1. Always Start with Snapshots
- Take accessibility snapshots before interactions
- Use snapshots to understand page structure
- Prefer snapshots over screenshots for automation

### 2. Use Descriptive Element Names
- Be specific about element location and purpose
- Include context (e.g., "in login form", "in header")

### 3. Wait for Page States
- Use browser_wait_for for dynamic content
- Check console messages for errors
- Verify network requests complete

### 4. Test Accessibility
- Use accessibility snapshots to verify ARIA labels
- Test keyboard navigation
- Verify semantic HTML structure

### 5. Document Findings
- Take screenshots of different states
- Note any UI/UX issues found
- Record successful interaction patterns

## Integration with Project Workflow

### Development Commands Reference
- Start dev server: `npm run dev`
- Run type checks: `npm run type-check`
- Run linting: `npm run lint`
- Run tests: `npm run test`

### File Locations
- App source: `packages/app/src/`
- Components: `packages/app/src/components/`
- Design system: `packages/design-system/src/`

### Documentation Updates
After testing sessions, update:
- `docs/tasks/qa-tasks.md` - QA findings
- `docs/app-implementation-progress.md` - Progress notes
- Component README files if issues found

## Future Enhancements

### Automated Test Suites
Consider creating reusable test workflows for:
- Theme functionality testing
- Form validation testing
- Responsive design verification
- Accessibility compliance checking

### Integration with CI/CD
The Docker MCP Playwright toolkit could be integrated into:
- Pre-commit hooks for UI testing
- Pull request validation
- Automated regression testing

---

**Last Updated:** Current session
**Related Files:**
- `docs/claude/quick-reference/commands.md` - Development commands
- `docs/claude/quick-reference/troubleshooting.md` - General troubleshooting
- `packages/app/src/app/page.tsx` - Homepage component
- `packages/design-system/src/components/theme/theme-toggle.tsx` - Theme toggle component