import { test, expect, type Page } from '@playwright/test';

test.describe("Who's Watching Page - Hover Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Wait for the Netflix opening animation to complete and reach the "Who's Watching" page
    // The opening animation should transition to persona selection after completion
    await page.waitForSelector('h1:has-text("Who\'s Watching?")', { timeout: 10000 });
    
    // Ensure all persona cards are loaded
    await page.waitForSelector('.grid .group', { timeout: 5000 });
  });

  test('should display all 4 persona cards correctly', async ({ page }) => {
    // Check that all 4 persona cards are present
    const personaCards = page.locator('.grid .group');
    await expect(personaCards).toHaveCount(4);

    // Verify each persona name is displayed
    await expect(page.locator('h2:has-text("Recruiter")')).toBeVisible();
    await expect(page.locator('h2:has-text("Developer")')).toBeVisible();
    await expect(page.locator('h2:has-text("Stalker")')).toBeVisible();
    await expect(page.locator('h2:has-text("Adventurer")')).toBeVisible();
  });

  test('should show hover effects on Recruiter card', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const recruiterAvatar = recruiterCard.locator('.bg-emerald-500');
    const recruiterName = recruiterCard.locator('h2');
    const recruiterDescription = recruiterCard.locator('p');

    // Initial state - description should be hidden
    await expect(recruiterDescription).toHaveCSS('opacity', '0');

    // Hover over the recruiter card
    await recruiterCard.hover();

    // Check hover effects
    await expect(recruiterAvatar).toHaveClass(/ring-4/);
    await expect(recruiterAvatar).toHaveClass(/ring-white/);
    await expect(recruiterName).toHaveClass(/group-hover:text-emerald-500/);
    await expect(recruiterDescription).toHaveCSS('opacity', '1');
    await expect(recruiterDescription).toContainText('Looking for talent');

    // Move mouse away and verify effects disappear
    await page.mouse.move(0, 0);
    await expect(recruiterDescription).toHaveCSS('opacity', '0');
  });

  test('should show hover effects on Developer card', async ({ page }) => {
    const developerCard = page.locator('.group:has(h2:has-text("Developer"))');
    const developerAvatar = developerCard.locator('.bg-gray-500');
    const developerName = developerCard.locator('h2');
    const developerDescription = developerCard.locator('p');

    // Initial state - description should be hidden
    await expect(developerDescription).toHaveCSS('opacity', '0');

    // Hover over the developer card
    await developerCard.hover();

    // Check hover effects
    await expect(developerAvatar).toHaveClass(/ring-4/);
    await expect(developerAvatar).toHaveClass(/ring-white/);
    await expect(developerName).toHaveClass(/group-hover:text-gray-400/);
    await expect(developerDescription).toHaveCSS('opacity', '1');
    await expect(developerDescription).toContainText('Technical exploration');

    // Move mouse away and verify effects disappear
    await page.mouse.move(0, 0);
    await expect(developerDescription).toHaveCSS('opacity', '0');
  });

  test('should show hover effects on Stalker card', async ({ page }) => {
    const stalkerCard = page.locator('.group:has(h2:has-text("Stalker"))');
    const stalkerAvatar = stalkerCard.locator('.bg-red-500');
    const stalkerName = stalkerCard.locator('h2');
    const stalkerDescription = stalkerCard.locator('p');

    // Initial state - description should be hidden
    await expect(stalkerDescription).toHaveCSS('opacity', '0');

    // Hover over the stalker card
    await stalkerCard.hover();

    // Check hover effects
    await expect(stalkerAvatar).toHaveClass(/ring-4/);
    await expect(stalkerAvatar).toHaveClass(/ring-white/);
    await expect(stalkerName).toHaveClass(/group-hover:text-red-500/);
    await expect(stalkerDescription).toHaveCSS('opacity', '1');
    await expect(stalkerDescription).toContainText('Curious observer');

    // Move mouse away and verify effects disappear
    await page.mouse.move(0, 0);
    await expect(stalkerDescription).toHaveCSS('opacity', '0');
  });

  test('should show hover effects on Adventurer card', async ({ page }) => {
    const adventurerCard = page.locator('.group:has(h2:has-text("Adventurer"))');
    const adventurerAvatar = adventurerCard.locator('.bg-amber-500');
    const adventurerName = adventurerCard.locator('h2');
    const adventurerDescription = adventurerCard.locator('p');

    // Initial state - description should be hidden
    await expect(adventurerDescription).toHaveCSS('opacity', '0');

    // Hover over the adventurer card
    await adventurerCard.hover();

    // Check hover effects
    await expect(adventurerAvatar).toHaveClass(/ring-4/);
    await expect(adventurerAvatar).toHaveClass(/ring-white/);
    await expect(adventurerName).toHaveClass(/group-hover:text-amber-500/);
    await expect(adventurerDescription).toHaveCSS('opacity', '1');
    await expect(adventurerDescription).toContainText('Explorer mindset');

    // Move mouse away and verify effects disappear
    await page.mouse.move(0, 0);
    await expect(adventurerDescription).toHaveCSS('opacity', '0');
  });

  test('should only show hover effects on the hovered card', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const developerCard = page.locator('.group:has(h2:has-text("Developer"))');
    const stalkerCard = page.locator('.group:has(h2:has-text("Stalker"))');
    const adventurerCard = page.locator('.group:has(h2:has-text("Adventurer"))');

    const recruiterDescription = recruiterCard.locator('p');
    const developerDescription = developerCard.locator('p');
    const stalkerDescription = stalkerCard.locator('p');
    const adventurerDescription = adventurerCard.locator('p');

    // Initially, all descriptions should be hidden
    await expect(recruiterDescription).toHaveCSS('opacity', '0');
    await expect(developerDescription).toHaveCSS('opacity', '0');
    await expect(stalkerDescription).toHaveCSS('opacity', '0');
    await expect(adventurerDescription).toHaveCSS('opacity', '0');

    // Hover over recruiter card
    await recruiterCard.hover();

    // Only recruiter description should be visible
    await expect(recruiterDescription).toHaveCSS('opacity', '1');
    await expect(developerDescription).toHaveCSS('opacity', '0');
    await expect(stalkerDescription).toHaveCSS('opacity', '0');
    await expect(adventurerDescription).toHaveCSS('opacity', '0');

    // Move to developer card
    await developerCard.hover();

    // Only developer description should be visible
    await expect(recruiterDescription).toHaveCSS('opacity', '0');
    await expect(developerDescription).toHaveCSS('opacity', '1');
    await expect(stalkerDescription).toHaveCSS('opacity', '0');
    await expect(adventurerDescription).toHaveCSS('opacity', '0');
  });

  test('should handle rapid hover movements correctly', async ({ page }) => {
    const cards = [
      page.locator('.group:has(h2:has-text("Recruiter"))'),
      page.locator('.group:has(h2:has-text("Developer"))'),
      page.locator('.group:has(h2:has-text("Stalker"))'),
      page.locator('.group:has(h2:has-text("Adventurer"))')
    ];

    // Rapidly hover over all cards
    for (const card of cards) {
      await card.hover();
      await page.waitForTimeout(100); // Small delay to ensure hover effects are applied
    }

    // Hover over the last card (Adventurer) and verify its effects
    const adventurerCard = cards[3];
    const adventurerDescription = adventurerCard.locator('p');
    
    await adventurerCard.hover();
    await expect(adventurerDescription).toHaveCSS('opacity', '1');
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await expect(adventurerDescription).toHaveCSS('opacity', '0');
  });

  test('should maintain hover effects during extended hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const recruiterDescription = recruiterCard.locator('p');
    const recruiterAvatar = recruiterCard.locator('.bg-emerald-500');

    // Hover and maintain position for extended time
    await recruiterCard.hover();
    
    // Verify effects are maintained over time
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(500);
      await expect(recruiterDescription).toHaveCSS('opacity', '1');
      await expect(recruiterAvatar).toHaveClass(/ring-4/);
    }
  });

  test('should handle click functionality after hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    
    // Hover first
    await recruiterCard.hover();
    
    // Click the card
    await recruiterCard.click();
    
    // Should navigate to the portfolio page
    // We can check for elements that appear after persona selection
    await expect(page.locator('nav')).toBeVisible({ timeout: 5000 });
    
    // Should show content related to the selected persona
    await expect(page.locator('h1:has-text("Steric Tsui")')).toBeVisible({ timeout: 5000 });
  });

  test('should work correctly on different viewport sizes', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const recruiterDescription = recruiterCard.locator('p');
    
    await recruiterCard.hover();
    await expect(recruiterDescription).toHaveCSS('opacity', '1');
    
    // Test on tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await recruiterCard.hover();
    await expect(recruiterDescription).toHaveCSS('opacity', '1');
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await recruiterCard.hover();
    await expect(recruiterDescription).toHaveCSS('opacity', '1');
  });
});