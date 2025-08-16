import { test, expect } from '@playwright/test';

test.describe("Visual Hover Effects Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the "Who's Watching" page to appear after Netflix animation
    await page.waitForSelector('h1:has-text("Who\'s Watching?")', { timeout: 15000 });
    
    // Wait for all persona cards to be rendered
    await page.waitForSelector('.grid .group', { timeout: 5000 });
    await page.waitForTimeout(1000); // Additional wait for animations to settle
  });

  test('should show scaling and elevation effects on card hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    
    // Get initial transform state
    const initialTransform = await recruiterCard.evaluate(el => getComputedStyle(el).transform);
    
    // Hover over the card
    await recruiterCard.hover();
    
    // Wait for animation to complete
    await page.waitForTimeout(500);
    
    // The card should have transform applied (scale and translate)
    const hoverTransform = await recruiterCard.evaluate(el => getComputedStyle(el).transform);
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).not.toBe('none');
  });

  test('should show ring animation on avatar hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const recruiterAvatar = recruiterCard.locator('div').first(); // Avatar container
    
    // Initially, avatar should not have ring classes
    const initialClasses = await recruiterAvatar.getAttribute('class');
    expect(initialClasses).not.toContain('ring-4');
    
    // Hover over the card
    await recruiterCard.hover();
    
    // Wait for CSS transition
    await page.waitForTimeout(500);
    
    // Avatar should now have ring classes
    const hoverClasses = await recruiterAvatar.getAttribute('class');
    expect(hoverClasses).toContain('group-hover:ring-4');
    expect(hoverClasses).toContain('group-hover:ring-white');
  });

  test('should show text color changes on hover', async ({ page }) => {
    const personas = [
      { name: 'Recruiter', expectedColorClass: 'group-hover:text-emerald-500' },
      { name: 'Developer', expectedColorClass: 'group-hover:text-gray-400' },
      { name: 'Stalker', expectedColorClass: 'group-hover:text-red-500' },
      { name: 'Adventurer', expectedColorClass: 'group-hover:text-amber-500' }
    ];

    for (const persona of personas) {
      const card = page.locator(`.group:has(h2:has-text("${persona.name}"))`);
      const nameElement = card.locator('h2');
      
      // Check that the hover color class is present
      const classes = await nameElement.getAttribute('class');
      expect(classes).toContain(persona.expectedColorClass);
      
      // Hover to trigger the effect
      await card.hover();
      await page.waitForTimeout(300);
      
      // Move away to reset
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
    }
  });

  test('should show description fade-in animation', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const description = recruiterCard.locator('p');
    
    // Initially, description should be completely transparent
    const initialOpacity = await description.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(initialOpacity)).toBe(0);
    
    // Also check max-height is 0
    const initialMaxHeight = await description.evaluate(el => getComputedStyle(el).maxHeight);
    expect(initialMaxHeight).toBe('0px');
    
    // Hover over the card
    await recruiterCard.hover();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Description should become visible
    const hoverOpacity = await description.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(hoverOpacity)).toBe(1);
  });

  test('should show background pattern animation on hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const backgroundPattern = recruiterCard.locator('.absolute.inset-0.opacity-30');
    
    // Hover over the card
    await recruiterCard.hover();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Background pattern should have hover effects
    const classes = await backgroundPattern.getAttribute('class');
    expect(classes).toContain('group-hover:opacity-60');
    expect(classes).toContain('group-hover:scale-110');
  });

  test('should animate face elements on hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const mouth = recruiterCard.locator('.w-8.h-1.bg-black.rounded-full');
    
    // Hover over the card
    await recruiterCard.hover();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Mouth should have hover animation classes
    const mouthClasses = await mouth.getAttribute('class');
    expect(mouthClasses).toContain('group-hover:scale-x-110');
    expect(mouthClasses).toContain('group-hover:translate-y-0.5');
  });

  test('should handle smooth transitions between cards', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const developerCard = page.locator('.group:has(h2:has-text("Developer"))');
    
    const recruiterDesc = recruiterCard.locator('p');
    const developerDesc = developerCard.locator('p');
    
    // Hover over recruiter
    await recruiterCard.hover();
    await page.waitForTimeout(400);
    
    // Recruiter description should be visible
    let recruiterOpacity = await recruiterDesc.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(recruiterOpacity)).toBe(1);
    
    // Move to developer card
    await developerCard.hover();
    await page.waitForTimeout(400);
    
    // Recruiter description should be hidden, developer should be visible
    recruiterOpacity = await recruiterDesc.evaluate(el => getComputedStyle(el).opacity);
    const developerOpacity = await developerDesc.evaluate(el => getComputedStyle(el).opacity);
    
    expect(parseFloat(recruiterOpacity)).toBe(0);
    expect(parseFloat(developerOpacity)).toBe(1);
  });

  test('should maintain animations during continuous hover', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const description = recruiterCard.locator('p');
    
    // Hover and hold
    await recruiterCard.hover();
    
    // Check effects are maintained over several seconds
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1000);
      const opacity = await description.evaluate(el => getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBe(1);
    }
  });

  test('should reset all effects when mouse leaves hover area', async ({ page }) => {
    const recruiterCard = page.locator('.group:has(h2:has-text("Recruiter"))');
    const description = recruiterCard.locator('p');
    
    // Hover over the card
    await recruiterCard.hover();
    await page.waitForTimeout(400);
    
    // Verify effects are active
    let opacity = await description.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(1);
    
    // Move mouse completely away from any card
    await page.mouse.move(50, 50); // Top-left corner, away from cards
    await page.waitForTimeout(400);
    
    // All effects should be reset
    opacity = await description.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(0);
  });
});