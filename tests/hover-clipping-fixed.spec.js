const { test, expect } = require('@playwright/test');

test('Check object card hover clipping', async ({ page }) => {
  console.log('Starting Netflix portfolio navigation flow...');
  
  // Navigate to the application
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  
  // Step 1: Wait for Netflix opening animation to complete (automatically transitions)
  console.log('Waiting for opening animation to complete...');
  
  // Wait for the persona selection state
  await page.waitForSelector('text=/who.*watching/i', { timeout: 15000 });
  console.log('Persona selection page loaded');
  
  // Step 2: Select a persona to proceed to portfolio
  console.log('Selecting a persona...');
  
  // Look for persona cards/buttons and click the first one
  const personaCards = page.locator('[class*="persona"], [class*="card"], button, [role="button"]');
  await personaCards.first().click();
  console.log('Persona selected');
  
  // Step 3: Wait for portfolio content to load
  console.log('Waiting for portfolio content...');
  await page.waitForSelector('[class*="HorizontalSection"], [id*="projects"]', { timeout: 10000 });
  await page.waitForTimeout(2000); // Extra time for animations
  
  console.log('Portfolio loaded, starting hover clipping tests...');
  
  // Find content cards in HorizontalSection components
  const contentCards = page.locator('[class*="ContentCard"], [class*="TemplateCard"], [class*="card"]');
  const cardCount = await contentCards.count();
  
  console.log(`Found ${cardCount} content cards to test`);
  
  if (cardCount === 0) {
    console.log('No cards found, checking for alternative selectors...');
    
    // Look for images that might be cards
    const imageCards = page.locator('img[src*="project"], img[src*="experience"], div[class*="item"]');
    const imageCount = await imageCards.count();
    console.log(`Found ${imageCount} potential image cards`);
    
    if (imageCount > 0) {
      // Test image cards instead
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        await testCardHover(page, imageCards.nth(i), `image-card-${i + 1}`);
      }
    }
    
    return;
  }
  
  // Test hover effects on each card
  for (let i = 0; i < Math.min(cardCount, 5); i++) {
    await testCardHover(page, contentCards.nth(i), `card-${i + 1}`);
  }
  
  console.log('Hover clipping tests completed');
});

async function testCardHover(page, card, cardId) {
  try {
    console.log(`\nTesting hover on ${cardId}...`);
    
    // Get card bounds before hover
    const boundsBefore = await card.boundingBox();
    if (!boundsBefore) {
      console.log(`${cardId}: No bounding box found`);
      return;
    }
    
    console.log(`${cardId} before hover: ${boundsBefore.width}x${boundsBefore.height} at (${boundsBefore.x}, ${boundsBefore.y})`);
    
    // Scroll card into view if needed
    await card.scrollIntoViewIfNeeded();
    
    // Hover over the card
    await card.hover();
    await page.waitForTimeout(500); // Wait for hover animations
    
    // Get card bounds after hover
    const boundsAfter = await card.boundingBox();
    if (!boundsAfter) {
      console.log(`${cardId}: No bounding box after hover`);
      return;
    }
    
    console.log(`${cardId} after hover: ${boundsAfter.width}x${boundsAfter.height} at (${boundsAfter.x}, ${boundsAfter.y})`);
    
    // Check for size changes
    const widthChange = boundsAfter.width - boundsBefore.width;
    const heightChange = boundsAfter.height - boundsBefore.height;
    
    if (widthChange > 0 || heightChange > 0) {
      console.log(`${cardId} grew by: ${widthChange}px width, ${heightChange}px height`);
    }
    
    // Check viewport clipping
    const viewport = page.viewportSize();
    const clippedRight = boundsAfter.x + boundsAfter.width > viewport.width;
    const clippedLeft = boundsAfter.x < 0;
    const clippedBottom = boundsAfter.y + boundsAfter.height > viewport.height;
    const clippedTop = boundsAfter.y < 0;
    
    // Check for container overflow by looking at parent
    let clippedByParent = false;
    try {
      const parent = card.locator('..');
      const parentBounds = await parent.boundingBox();
      
      if (parentBounds) {
        clippedByParent = (
          boundsAfter.x < parentBounds.x ||
          boundsAfter.y < parentBounds.y ||
          boundsAfter.x + boundsAfter.width > parentBounds.x + parentBounds.width ||
          boundsAfter.y + boundsAfter.height > parentBounds.y + parentBounds.height
        );
      }
    } catch (e) {
      // Parent check failed, skip
    }
    
    // Report clipping issues
    const hasClipping = clippedRight || clippedLeft || clippedBottom || clippedTop || clippedByParent;
    
    if (hasClipping) {
      console.log(`🚨 CLIPPING DETECTED on ${cardId}:`);
      console.log(`  Viewport clipping: Right=${clippedRight}, Left=${clippedLeft}, Bottom=${clippedBottom}, Top=${clippedTop}`);
      console.log(`  Parent clipping: ${clippedByParent}`);
      
      // Take screenshot for evidence
      await page.screenshot({ 
        path: `tests/screenshots/${cardId}-clipping.png`,
        fullPage: false 
      });
      console.log(`  Screenshot saved: tests/screenshots/${cardId}-clipping.png`);
    } else {
      console.log(`✅ ${cardId}: No clipping detected`);
    }
    
    // Check CSS properties that might cause clipping
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
    
    console.log(`${cardId} CSS properties:`, JSON.stringify(styles, null, 2));
    
    // Reset hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
    
  } catch (error) {
    console.log(`Error testing ${cardId}:`, error.message);
  }
}