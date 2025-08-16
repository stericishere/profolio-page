import { test, expect } from '@playwright/test';

test('GIF scaling shows content at bottom after animation and persona selection', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Wait for Netflix opening animation to complete (it should automatically transition)
  await page.waitForSelector('[data-testid="whos-watching"]', { timeout: 10000 });
  
  // Select a persona (Recruiter has GIF background)
  await page.click('[data-testid="persona-recruiter"]');
  
  // Wait for the portfolio page to load
  await page.waitForSelector('#projects', { timeout: 5000 });
  
  // Check that the background image is present and scaled correctly
  const backgroundImg = page.locator('img[alt="Recruiter background"]');
  await expect(backgroundImg).toBeVisible();
  
  // Check that the image has the correct classes for scaling
  await expect(backgroundImg).toHaveClass(/h-3\/4/);
  await expect(backgroundImg).toHaveClass(/object-top/);
  
  // Verify that content below is visible (projects section should be partially visible)
  const projectsSection = page.locator('#projects');
  await expect(projectsSection).toBeVisible();
  
  // Take a screenshot to verify visual appearance
  await page.screenshot({ path: 'gif-scaling-test.png', fullPage: true });
  
  console.log('GIF scaling test completed - screenshot saved as gif-scaling-test.png');
});