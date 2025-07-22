import { test, expect } from '@playwright/test';

test.describe('Detailed Sidebar Analysis', () => {
  test('Examine actual sidebar structure and elements', async ({ page }) => {
    // Go to homepage first
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Take homepage screenshot
    await page.screenshot({ 
      path: 'test-results/detailed-01-homepage.png', 
      fullPage: true 
    });
    
    // Try to bypass the error by checking what's actually rendered in the DOM
    await page.goto('/dashboard');
    await page.waitForTimeout(5000);
    
    // Close any error overlays
    try {
      await page.click('button:has-text("×")');
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log('No error overlay found or could not close');
    }
    
    // Take screenshot after potential error dismissal
    await page.screenshot({ 
      path: 'test-results/detailed-02-dashboard-after-error-close.png', 
      fullPage: true 
    });
    
    // Look for sidebar elements in the DOM
    const sidebarElements = await page.$$eval('[data-sidebar]', elements => 
      elements.map(el => ({
        tag: el.tagName,
        dataAttribute: el.getAttribute('data-sidebar'),
        textContent: el.textContent?.trim().substring(0, 100),
        className: el.className,
        isVisible: el.offsetParent !== null
      }))
    );
    
    console.log('Sidebar elements found:', sidebarElements);
    
    // Check for navigation links
    const navLinks = await page.$$eval('a[href]', links => 
      links.map(link => ({
        href: link.getAttribute('href'),
        text: link.textContent?.trim(),
        isVisible: link.offsetParent !== null
      })).filter(link => link.href?.startsWith('/'))
    );
    
    console.log('Navigation links found:', navLinks);
    
    // Test sidebar visibility states
    const sidebarStates = await page.$eval('[data-state]', el => el.getAttribute('data-state'));
    console.log('Sidebar state:', sidebarStates);
    
    // Check for hover functionality by evaluating CSS
    const hoverStyles = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      const hoverRules = [];
      
      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules);
          rules.forEach(rule => {
            if (rule.selectorText && rule.selectorText.includes(':hover')) {
              hoverRules.push({
                selector: rule.selectorText,
                cssText: rule.cssText.substring(0, 200)
              });
            }
          });
        } catch (e) {
          // Cross-origin stylesheet or other error
        }
      });
      
      return hoverRules;
    });
    
    console.log('Hover styles found:', hoverStyles.length);
  });

  test('Test sidebar interactions without error overlay', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Navigate by clicking on elements in the HTML structure we know exists
    const navElements = await page.$$('a[href="/dashboard"], a[href="/skills"], a[href="/assessments"]');
    
    for (let i = 0; i < Math.min(navElements.length, 3); i++) {
      try {
        const element = navElements[i];
        const href = await element.getAttribute('href');
        
        console.log(`Clicking navigation element with href: ${href}`);
        await element.click();
        await page.waitForTimeout(3000);
        
        // Take screenshot
        await page.screenshot({ 
          path: `test-results/detailed-nav-${i + 1}-${href?.replace('/', '')}.png`, 
          fullPage: true 
        });
        
        // Check if sidebar is present after navigation
        const sidebarPresent = await page.$('[data-sidebar="sidebar"]');
        console.log(`Sidebar present after navigating to ${href}:`, !!sidebarPresent);
        
      } catch (error) {
        console.log(`Error clicking navigation element ${i + 1}:`, error);
      }
    }
  });

  test('Examine sidebar collapse/expand functionality', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Look for sidebar rail/toggle button
    const toggleButton = await page.$('[data-sidebar="rail"]');
    
    if (toggleButton) {
      console.log('Found sidebar toggle button');
      
      // Test collapse/expand
      await toggleButton.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: 'test-results/detailed-sidebar-toggled.png', 
        fullPage: true 
      });
      
      // Click again to restore
      await toggleButton.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: 'test-results/detailed-sidebar-restored.png', 
        fullPage: true 
      });
    } else {
      console.log('No sidebar toggle button found');
    }
  });
});