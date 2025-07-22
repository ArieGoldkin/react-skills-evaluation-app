import { test, expect, Page } from '@playwright/test';

test.describe('Enhanced Sidebar Navigation UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
  });

  test('1. Basic Navigation - Homepage Screenshot', async ({ page }) => {
    // Take screenshot of the homepage
    await page.screenshot({ 
      path: 'test-results/01-homepage.png', 
      fullPage: true 
    });
    
    // Check if the page loaded properly
    expect(await page.title()).toBeTruthy();
  });

  test('2. Basic Navigation - Direct Page Access', async ({ page }) => {
    const pages = [
      { path: '/dashboard', name: 'Dashboard' },
      { path: '/skills', name: 'Skills' },
      { path: '/assessments', name: 'Assessments' },
      { path: '/analytics', name: 'Analytics' },
      { path: '/admin', name: 'Admin' }
    ];

    for (const testPage of pages) {
      console.log(`Testing direct access to ${testPage.path}`);
      
      try {
        await page.goto(testPage.path, { waitUntil: 'networkidle' });
        
        // Take screenshot
        await page.screenshot({ 
          path: `test-results/02-direct-access-${testPage.name.toLowerCase()}.png`, 
          fullPage: true 
        });
        
        // Wait a moment for any dynamic content
        await page.waitForTimeout(2000);
        
      } catch (error) {
        console.log(`Could not access ${testPage.path}: ${error}`);
        // Take screenshot of error state
        await page.screenshot({ 
          path: `test-results/02-error-${testPage.name.toLowerCase()}.png`, 
          fullPage: true 
        });
      }
    }
  });

  test('3. Sidebar Functionality Tests', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(3000);
    
    // Look for sidebar toggle button
    const toggleSelectors = [
      '[data-testid="sidebar-toggle"]',
      'button[aria-label*="menu"]',
      'button[aria-label*="sidebar"]',
      '.sidebar-toggle',
      '[class*="hamburger"]',
      '[class*="menu-button"]'
    ];
    
    let toggleButton = null;
    for (const selector of toggleSelectors) {
      const element = await page.$(selector);
      if (element) {
        toggleButton = element;
        console.log(`Found toggle button with selector: ${selector}`);
        break;
      }
    }
    
    // Take screenshot of dashboard with sidebar
    await page.screenshot({ 
      path: 'test-results/03-dashboard-with-sidebar.png', 
      fullPage: true 
    });
    
    // Look for sidebar navigation elements
    const sidebarSelectors = [
      '.sidebar',
      '[data-testid="sidebar"]',
      'nav[role="navigation"]',
      '[class*="sidebar"]',
      '[class*="navigation"]'
    ];
    
    let sidebar = null;
    for (const selector of sidebarSelectors) {
      const element = await page.$(selector);
      if (element) {
        sidebar = element;
        console.log(`Found sidebar with selector: ${selector}`);
        break;
      }
    }
    
    if (sidebar) {
      // Test sidebar navigation items
      const navItems = await page.$$('nav a, .sidebar a, [class*="nav"] a');
      console.log(`Found ${navItems.length} navigation items`);
      
      for (let i = 0; i < Math.min(navItems.length, 5); i++) {
        try {
          const item = navItems[i];
          const text = await item.textContent();
          console.log(`Clicking navigation item: ${text}`);
          
          await item.click();
          await page.waitForTimeout(2000);
          
          await page.screenshot({ 
            path: `test-results/03-nav-item-${i + 1}.png`, 
            fullPage: true 
          });
        } catch (error) {
          console.log(`Error clicking navigation item ${i + 1}: ${error}`);
        }
      }
    }
  });

  test('4. Enhanced Features - Hover Effects and Animations', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(3000);
    
    // Find sidebar elements to test hover effects
    const hoverableElements = await page.$$('nav a, .sidebar a, [class*="nav"] a, button');
    
    console.log(`Testing hover effects on ${hoverableElements.length} elements`);
    
    for (let i = 0; i < Math.min(hoverableElements.length, 8); i++) {
      try {
        const element = hoverableElements[i];
        const text = await element.textContent();
        
        // Hover over the element
        await element.hover();
        await page.waitForTimeout(1000); // Wait for hover animation
        
        await page.screenshot({ 
          path: `test-results/04-hover-effect-${i + 1}.png`, 
          fullPage: true 
        });
        
        console.log(`Tested hover on: ${text}`);
      } catch (error) {
        console.log(`Error testing hover on element ${i + 1}: ${error}`);
      }
    }
    
    // Test for collapsible navigation groups
    const collapsibleElements = await page.$$('[aria-expanded], .collapsible, [class*="expandable"]');
    
    for (let i = 0; i < collapsibleElements.length; i++) {
      try {
        const element = collapsibleElements[i];
        await element.click();
        await page.waitForTimeout(1500); // Wait for animation
        
        await page.screenshot({ 
          path: `test-results/04-collapsible-${i + 1}.png`, 
          fullPage: true 
        });
      } catch (error) {
        console.log(`Error testing collapsible element ${i + 1}: ${error}`);
      }
    }
  });

  test('5. Breadcrumb Functionality', async ({ page }) => {
    const testPages = ['/dashboard', '/skills', '/assessments'];
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      await page.waitForTimeout(2000);
      
      // Look for breadcrumb elements
      const breadcrumbSelectors = [
        '.breadcrumb',
        '[data-testid="breadcrumb"]',
        '[aria-label*="breadcrumb"]',
        'nav[role="navigation"] ol',
        '.breadcrumbs'
      ];
      
      let foundBreadcrumb = false;
      for (const selector of breadcrumbSelectors) {
        const element = await page.$(selector);
        if (element) {
          foundBreadcrumb = true;
          console.log(`Found breadcrumb on ${testPage} with selector: ${selector}`);
          break;
        }
      }
      
      await page.screenshot({ 
        path: `test-results/05-breadcrumb-${testPage.replace('/', '')}.png`, 
        fullPage: true 
      });
    }
  });
});

test.describe('Mobile/Responsive Tests', () => {
  test('6. Mobile Viewport Tests', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const testPages = ['/', '/dashboard', '/skills'];
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      await page.waitForTimeout(3000);
      
      await page.screenshot({ 
        path: `test-results/06-mobile-${testPage.replace('/', 'home')}.png`, 
        fullPage: true 
      });
      
      // Test mobile menu functionality
      const mobileMenuSelectors = [
        '.mobile-menu',
        '[data-testid="mobile-menu"]',
        '.hamburger',
        '[class*="mobile"] button',
        'button[aria-label*="menu"]'
      ];
      
      for (const selector of mobileMenuSelectors) {
        const element = await page.$(selector);
        if (element) {
          try {
            await element.click();
            await page.waitForTimeout(1500);
            
            await page.screenshot({ 
              path: `test-results/06-mobile-menu-open-${testPage.replace('/', 'home')}.png`, 
              fullPage: true 
            });
            
            // Close menu
            await element.click();
            await page.waitForTimeout(1000);
            
          } catch (error) {
            console.log(`Error testing mobile menu: ${error}`);
          }
          break;
        }
      }
    }
  });
});

test.describe('Visual Quality Tests', () => {
  test('7. Visual Elements and Styling', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(3000);
    
    // Take high-quality screenshot for visual inspection
    await page.screenshot({ 
      path: 'test-results/07-visual-quality-dashboard.png', 
      fullPage: true 
    });
    
    // Test different page states
    const pages = ['/skills', '/assessments', '/analytics'];
    
    for (const testPage of pages) {
      try {
        await page.goto(testPage);
        await page.waitForTimeout(3000);
        
        await page.screenshot({ 
          path: `test-results/07-visual-quality-${testPage.replace('/', '')}.png`, 
          fullPage: true 
        });
      } catch (error) {
        console.log(`Error taking visual quality screenshot for ${testPage}: ${error}`);
      }
    }
    
    // Check for common UI elements
    const uiElements = [
      'button',
      'input',
      '[class*="badge"]',
      '[class*="icon"]',
      '[class*="avatar"]',
      '.card, [class*="card"]'
    ];
    
    for (const selector of uiElements) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} elements matching ${selector}`);
      }
    }
  });
});