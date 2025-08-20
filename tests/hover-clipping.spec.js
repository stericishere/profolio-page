const { test, expect } = require('@playwright/test');

test('Check object card hover clipping', async ({ page }) => {
  // Navigate to the Netflix portfolio application
  await page.goto('http://localhost:3001');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  console.log('Starting Netflix portfolio navigation flow...');
  
  // Step 1: Handle Netflix opening animation sequence
  console.log('Looking for opening animation...');
  
  // Wait for animation to complete or skip button
  try {
    // Look for skip button or wait for animation to finish
    const skipButton = page.locator('button', { hasText: /skip|continue/i });
    if (await skipButton.isVisible({ timeout: 5000 })) {
      console.log('Skip button found, clicking...');
      await skipButton.click();
    } else {
      console.log('No skip button, waiting for animation to complete...');
      await page.waitForTimeout(8000); // Wait for typical Netflix animation duration
    }
  } catch (e) {
    console.log('Animation handling completed or not found');
  }
  
  // Step 2: Handle "Who's Watching?" page
  console.log('Looking for "Who\'s Watching?" page...');
  
  try {
    // Look for user profile selection
    const profileSelector = page.locator('[class*="profile"], [class*="user"], [data-testid*="profile"]').first();
    const whoIsWatchingText = page.locator('text=/who.*watching/i');
    
    if (await whoIsWatchingText.isVisible({ timeout: 5000 }) || await profileSelector.isVisible({ timeout: 5000 })) {
      console.log('Who\'s Watching page found, selecting profile...');
      
      // Click on the first available profile/user
      const firstProfile = profileSelector.or(page.locator('div[role="button"]').first());
      await firstProfile.click();
      await page.waitForTimeout(2000);
    } else {
      console.log('Who\'s Watching page not found or already passed');
    }
  } catch (e) {
    console.log('Profile selection completed or not needed');
  }
  
  // Step 3: Wait for main dashboard to load
  console.log('Waiting for main dashboard...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Extra time for content to load
  
  // Find object cards (content cards, template cards, etc.)
  const contentCards = page.locator('[class*="card"], [class*="Card"], [data-testid*="card"]');
  const templateCards = page.locator('[class*="template"], [class*="Template"]');
  
  // Get all card elements
  const allCards = await page.locator('div').filter({ has: page.locator('img') }).all();
  
  console.log(`Found ${allCards.length} potential card elements`);
  
  // Test hover effects on cards
  for (let i = 0; i < Math.min(allCards.length, 10); i++) {
    const card = allCards[i];
    
    // Get card bounds before hover
    const boundsBefore = await card.boundingBox();
    
    if (!boundsBefore) continue;
    
    console.log(`Testing card ${i + 1} at position: ${boundsBefore.x}, ${boundsBefore.y}`);
    
    // Hover over the card
    await card.hover();
    await page.waitForTimeout(500); // Wait for hover animations
    
    // Get card bounds after hover
    const boundsAfter = await card.boundingBox();
    
    if (!boundsAfter) continue;
    
    // Check if the card has grown beyond its container or viewport
    const viewport = page.viewportSize();
    
    // Check for clipping at viewport edges
    const clippedRight = boundsAfter.x + boundsAfter.width > viewport.width;
    const clippedLeft = boundsAfter.x < 0;
    const clippedBottom = boundsAfter.y + boundsAfter.height > viewport.height;
    const clippedTop = boundsAfter.y < 0;
    
    // Check for container overflow
    const parent = card.locator('..');
    let parentBounds = null;
    try {
      parentBounds = await parent.boundingBox();
    } catch (e) {
      // Parent might not be accessible
    }
    
    let clippedByParent = false;
    if (parentBounds) {
      clippedByParent = (
        boundsAfter.x < parentBounds.x ||
        boundsAfter.y < parentBounds.y ||
        boundsAfter.x + boundsAfter.width > parentBounds.x + parentBounds.width ||
        boundsAfter.y + boundsAfter.height > parentBounds.y + parentBounds.height
      );
    }
    
    // Log results
    console.log(`Card ${i + 1} hover results:`);
    console.log(`  Before: ${boundsBefore.width}x${boundsBefore.height} at (${boundsBefore.x}, ${boundsBefore.y})`);
    console.log(`  After:  ${boundsAfter.width}x${boundsAfter.height} at (${boundsAfter.x}, ${boundsAfter.y})`);
    console.log(`  Viewport clipping: Right=${clippedRight}, Left=${clippedLeft}, Bottom=${clippedBottom}, Top=${clippedTop}`);
    console.log(`  Parent clipping: ${clippedByParent}`);
    
    if (clippedRight || clippedLeft || clippedBottom || clippedTop || clippedByParent) {
      console.log(`⚠️  CLIPPING DETECTED on card ${i + 1}`);
      
      // Take screenshot for evidence
      await page.screenshot({ 
        path: `tests/screenshots/card-${i + 1}-clipping.png`,
        fullPage: true 
      });
    }
    
    // Move mouse away to reset hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
  }
  
  // Test specific Netflix-style cards if they exist
  const netflixCards = page.locator('.content-card, .template-card, [class*="netflix"]');
  const cardCount = await netflixCards.count();
  
  if (cardCount > 0) {
    console.log(`\nTesting ${cardCount} Netflix-style cards specifically:`);
    
    for (let i = 0; i < cardCount; i++) {
      const card = netflixCards.nth(i);
      
      // Get computed styles
      const styles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          overflow: computed.overflow,
          overflowX: computed.overflowX,
          overflowY: computed.overflowY,
          position: computed.position,
          zIndex: computed.zIndex,
          transform: computed.transform,
          transition: computed.transition,
        };
      });
      
      console.log(`Netflix card ${i + 1} styles:`, styles);
      
      // Check hover transform
      await card.hover();
      await page.waitForTimeout(300);
      
      const hoverStyles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          transform: computed.transform,
          zIndex: computed.zIndex,
        };
      });
      
      console.log(`Netflix card ${i + 1} hover styles:`, hoverStyles);
      
      // Reset hover
      await page.mouse.move(0, 0);
    }
  }
});