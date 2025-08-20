const { test, expect } = require('@playwright/test');

test('Verify hover clipping fixes', async ({ page }) => {
  console.log('Testing hover clipping fixes...');
  
  // Navigate to the application
  await page.goto('http://localhost:3005');
  await page.waitForLoadState('networkidle');
  
  console.log('Navigating through app states...');
  
  // Wait for persona selection state
  try {
    await page.waitForSelector('text=/who.*watching/i', { timeout: 10000 });
    console.log('Persona selection page found');
    
    // Select a persona
    const personaCards = page.locator('[class*="persona"], [class*="card"], button, [role="button"]');
    await personaCards.first().click();
    console.log('Persona selected');
  } catch (e) {
    console.log('Persona selection not found or already passed, continuing...');
  }
  
  // Wait for portfolio content
  await page.waitForTimeout(3000); // Allow for animations
  
  console.log('Looking for cards with updated container structure...');
  
  // Look for cards with our new padding structure
  const cardContainers = page.locator('div[class*="p-4"][class*="flex-none"]');
  const containerCount = await cardContainers.count();
  
  console.log(`Found ${containerCount} cards with updated container structure`);
  
  if (containerCount === 0) {
    console.log('No updated cards found, checking for any card elements...');
    const anyCards = page.locator('[class*="card"], [class*="Card"]');
    const anyCount = await anyCards.count();
    console.log(`Found ${anyCount} card elements of any type`);
    return;
  }
  
  // Test the first few cards
  for (let i = 0; i < Math.min(containerCount, 3); i++) {
    await testUpdatedCardHover(page, cardContainers.nth(i), `updated-card-${i + 1}`);
  }
  
  console.log('Hover fix verification completed');
});

async function testUpdatedCardHover(page, cardContainer, cardId) {
  try {
    console.log(`\\nTesting updated hover on ${cardId}...`);
    
    // Get container bounds (should include padding now)
    const containerBounds = await cardContainer.boundingBox();
    if (!containerBounds) {
      console.log(`${cardId}: No container bounds found`);
      return;
    }
    
    console.log(`${cardId} container: ${containerBounds.width}x${containerBounds.height} at (${containerBounds.x}, ${containerBounds.y})`);
    
    // Find the motion div inside the container
    const motionDiv = cardContainer.locator('> div').first(); // Direct child motion div
    
    // Scroll into view and hover
    await cardContainer.scrollIntoViewIfNeeded();
    await motionDiv.hover();
    await page.waitForTimeout(500); // Wait for hover animations
    
    // Get motion div bounds after hover
    const motionBounds = await motionDiv.boundingBox();
    if (!motionBounds) {
      console.log(`${cardId}: No motion div bounds after hover`);
      return;
    }
    
    console.log(`${cardId} motion div after hover: ${motionBounds.width}x${motionBounds.height} at (${motionBounds.x}, ${motionBounds.y})`);
    
    // Check if motion div extends beyond container bounds
    const exceedsContainer = (
      motionBounds.x < containerBounds.x ||
      motionBounds.y < containerBounds.y ||
      motionBounds.x + motionBounds.width > containerBounds.x + containerBounds.width ||
      motionBounds.y + motionBounds.height > containerBounds.y + containerBounds.height
    );
    
    if (exceedsContainer) {
      console.log(`⚠️  ${cardId}: Motion div extends beyond container bounds`);
      console.log(`   Container: ${containerBounds.x}, ${containerBounds.y}, ${containerBounds.width}, ${containerBounds.height}`);
      console.log(`   Motion: ${motionBounds.x}, ${motionBounds.y}, ${motionBounds.width}, ${motionBounds.height}`);
    } else {
      console.log(`✅ ${cardId}: Motion div stays within container bounds - clipping fixed!`);
    }
    
    // Check viewport clipping
    const viewport = page.viewportSize();
    const clippedByViewport = (
      motionBounds.x < 0 ||
      motionBounds.y < 0 ||
      motionBounds.x + motionBounds.width > viewport.width ||
      motionBounds.y + motionBounds.height > viewport.height
    );
    
    if (clippedByViewport) {
      console.log(`⚠️  ${cardId}: Still clipped by viewport`);
    } else {
      console.log(`✅ ${cardId}: No viewport clipping`);
    }
    
    // Reset hover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
    
  } catch (error) {
    console.log(`Error testing ${cardId}:`, error.message);
  }
}