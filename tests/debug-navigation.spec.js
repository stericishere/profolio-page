const { test, expect } = require('@playwright/test');

test('Debug Netflix navigation flow', async ({ page }) => {
  console.log('Starting navigation debug...');
  
  // Navigate to the application
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  
  // Take initial screenshot
  await page.screenshot({ path: 'tests/screenshots/01-initial-load.png', fullPage: true });
  console.log('Initial page loaded');
  
  // Check what's currently visible
  const title = await page.title();
  console.log('Page title:', title);
  
  const body = await page.locator('body').textContent();
  console.log('Page text content (first 200 chars):', body?.substring(0, 200));
  
  // Look for common Netflix elements
  const netflixLogo = page.locator('img[alt*="Netflix"], [class*="netflix"], [data-testid*="netflix"]');
  const isLogoVisible = await netflixLogo.isVisible();
  console.log('Netflix logo visible:', isLogoVisible);
  
  // Check for animation elements
  const animationElements = await page.locator('video, [class*="animation"], [class*="intro"]').count();
  console.log('Animation elements found:', animationElements);
  
  // Check for "Who's Watching" text
  const whoIsWatching = page.locator('text=/who.*watching/i');
  const isWhoIsWatchingVisible = await whoIsWatching.isVisible();
  console.log('Who\'s Watching text visible:', isWhoIsWatchingVisible);
  
  // Look for profile/user selection elements
  const profiles = await page.locator('[class*="profile"], [class*="user"]').count();
  console.log('Profile elements found:', profiles);
  
  // Wait a bit and check again
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tests/screenshots/02-after-wait.png', fullPage: true });
  
  // Check for any buttons
  const buttons = await page.locator('button').count();
  console.log('Buttons found:', buttons);
  
  if (buttons > 0) {
    for (let i = 0; i < Math.min(buttons, 3); i++) {
      const buttonText = await page.locator('button').nth(i).textContent();
      console.log(`Button ${i + 1}:`, buttonText?.trim());
    }
  }
  
  // Look for clickable elements
  const clickables = await page.locator('[role="button"], a, button, [onclick]').count();
  console.log('Clickable elements found:', clickables);
  
  // Check for any navigation cues
  const navElements = await page.locator('nav, [class*="nav"], [class*="menu"]').count();
  console.log('Navigation elements found:', navElements);
  
  console.log('Debug complete');
});