import { test, expect } from '@playwright/test'
import { 
  collectPerformanceMetrics, 
  waitForPreloadComplete,
  measureNavigationTime,
  takeTimestampedScreenshot 
} from './utils/performance-helpers'

test.describe('Complete User Workflow Journey', () => {

  test('should complete full user journey from opening animation to all pages', async ({ page }) => {
    const journeyMetrics: { [key: string]: number } = {}
    const startTime = Date.now()

    // Step 1: Land on homepage
    console.log('🚀 Starting complete user journey test')
    await page.goto('/')
    await takeTimestampedScreenshot(page, 'journey-01-homepage')

    // Step 2: Start Netflix experience
    await expect(page.locator('text=Start Netflix Experience')).toBeVisible()
    const animationStartTime = Date.now()
    await page.click('text=Start Netflix Experience')
    
    // Step 3: Wait for Netflix animation to complete
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })
    const animationEndTime = Date.now()
    journeyMetrics.animationDuration = animationEndTime - animationStartTime
    
    await takeTimestampedScreenshot(page, 'journey-02-animation-complete')

    // Step 4: Verify preloading completed
    const preloadCompleted = await waitForPreloadComplete(page, 12000)
    expect(preloadCompleted).toBe(true)
    journeyMetrics.preloadComplete = Date.now() - animationStartTime

    // Step 5: Navigate through all main sections
    const navigationSteps = [
      { name: 'Projects', selector: 'text=Projects', expectedUrl: '/projects' },
      { name: 'Skills', selector: 'text=Skills', expectedUrl: '/skills' },
      { name: 'Experience', selector: 'text=Experience', expectedUrl: '/experience' },
      { name: 'Contact', selector: 'text=Contact', expectedUrl: '/contact' }
    ]

    for (const step of navigationSteps) {
      console.log(`📍 Navigating to ${step.name}`)
      
      const navStartTime = Date.now()
      const linkElement = page.locator(step.selector).first()
      
      // Ensure link is visible before clicking
      await expect(linkElement).toBeVisible({ timeout: 5000 })
      await linkElement.click()
      
      // Wait for navigation
      await page.waitForURL(`**${step.expectedUrl}`, { timeout: 5000 })
      await page.waitForLoadState('networkidle', { timeout: 5000 })
      
      const navEndTime = Date.now()
      journeyMetrics[`${step.name.toLowerCase()}Navigation`] = navEndTime - navStartTime

      // Verify we're on the correct page
      expect(page.url()).toContain(step.expectedUrl)

      // Verify content is present
      const hasContent = await page.locator('h1, h2, main, [data-testid*="content"]')
                                   .first()
                                   .isVisible({ timeout: 3000 })
      expect(hasContent).toBe(true)

      await takeTimestampedScreenshot(page, `journey-03-${step.name.toLowerCase()}-page`)

      // Brief pause to simulate real user behavior
      await page.waitForTimeout(500)
    }

    // Step 6: Test browser navigation (back/forward)
    console.log('🔄 Testing browser navigation')
    const backNavTime = await measureNavigationTime(page, async () => {
      await page.goBack()
      await page.waitForLoadState('networkidle', { timeout: 3000 })
    })
    journeyMetrics.backNavigation = backNavTime

    const forwardNavTime = await measureNavigationTime(page, async () => {
      await page.goForward()
      await page.waitForLoadState('networkidle', { timeout: 3000 })
    })
    journeyMetrics.forwardNavigation = forwardNavTime

    // Step 7: Return to home and test Who's Watching flow (if exists)
    console.log('🏠 Returning to home')
    await page.goto('/', { waitUntil: 'networkidle' })
    
    const totalJourneyTime = Date.now() - startTime
    journeyMetrics.totalJourneyTime = totalJourneyTime

    await takeTimestampedScreenshot(page, 'journey-04-complete')

    // Validate all journey metrics
    expect(journeyMetrics.animationDuration).toBeLessThan(6000) // Animation under 6s
    expect(journeyMetrics.preloadComplete).toBeLessThan(12000) // Preload under 12s
    expect(journeyMetrics.projectsNavigation).toBeLessThan(1000) // Fast navigation
    expect(journeyMetrics.skillsNavigation).toBeLessThan(1000)
    expect(journeyMetrics.experienceNavigation).toBeLessThan(1000)
    expect(journeyMetrics.backNavigation).toBeLessThan(500) // Browser nav very fast
    expect(journeyMetrics.forwardNavigation).toBeLessThan(500)

    console.log('✅ Complete user journey metrics:', journeyMetrics)
  })

  test('should handle Who\'s Watching screen interaction (if present)', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for animation to complete
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    await takeTimestampedScreenshot(page, 'whos-watching-screen')

    // Check if Who's Watching screen is present
    const whosWatchingElements = [
      page.locator('text=Who\'s Watching?'),
      page.locator('[data-testid="whos-watching"]'),
      page.locator('.whos-watching'),
      page.locator('text=Developer'),
      page.locator('text=Recruiter'),
      page.locator('text=Adventure')
    ]

    let whosWatchingVisible = false
    for (const element of whosWatchingElements) {
      if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
        whosWatchingVisible = true
        console.log('Who\'s Watching screen detected')
        
        // Try to interact with a profile
        if (await element.isClickable().catch(() => false)) {
          await element.click()
          await page.waitForTimeout(1000)
        }
        break
      }
    }

    if (!whosWatchingVisible) {
      console.log('No Who\'s Watching screen detected - may go directly to dashboard')
    }

    // Regardless, should eventually reach a navigable state
    const navElements = await Promise.race([
      page.waitForSelector('text=Projects', { timeout: 5000 }),
      page.waitForSelector('text=Skills', { timeout: 5000 }),
      page.waitForSelector('nav', { timeout: 5000 }),
      page.waitForSelector('[data-testid="navigation"]', { timeout: 5000 })
    ]).catch(() => null)

    expect(navElements).not.toBeNull()

    console.log('Who\'s Watching interaction test completed')
  })

  test('should handle mobile-responsive journey', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/')
    await takeTimestampedScreenshot(page, 'mobile-journey-01-start')

    // Start Netflix experience on mobile
    await page.click('text=Start Netflix Experience')
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    await takeTimestampedScreenshot(page, 'mobile-journey-02-animation-complete')

    // Mobile navigation might be in a hamburger menu
    const mobileNavSelectors = [
      'button[aria-label="Menu"]',
      '.hamburger',
      '[data-testid="mobile-menu"]',
      'button:has-text("Menu")'
    ]

    let mobileMenuOpened = false
    for (const selector of mobileNavSelectors) {
      const element = page.locator(selector).first()
      if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
        await element.click()
        mobileMenuOpened = true
        await page.waitForTimeout(500)
        break
      }
    }

    console.log('Mobile menu opened:', mobileMenuOpened)

    // Try to navigate to Projects
    const projectsLink = page.locator('text=Projects').first()
    if (await projectsLink.isVisible({ timeout: 3000 })) {
      await projectsLink.click()
      await page.waitForURL('**/projects', { timeout: 5000 })
      
      await takeTimestampedScreenshot(page, 'mobile-journey-03-projects')
    }

    // Test scrolling on mobile
    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(500)

    await takeTimestampedScreenshot(page, 'mobile-journey-04-scrolled')

    console.log('Mobile responsive journey completed')
  })

  test('should handle accessibility navigation', async ({ page }) => {
    await page.goto('/')

    // Test keyboard navigation
    await page.keyboard.press('Tab')
    const focusedElement = await page.locator(':focus').textContent()
    console.log('First focusable element:', focusedElement)

    // Start with Enter key
    if (focusedElement?.includes('Start Netflix Experience')) {
      await page.keyboard.press('Enter')
    } else {
      await page.click('text=Start Netflix Experience')
    }

    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    // Test tab navigation through the interface
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      await page.waitForTimeout(200)
    }

    // Take screenshot showing focus states
    await takeTimestampedScreenshot(page, 'accessibility-navigation')

    // Try to navigate with keyboard
    const currentFocus = await page.locator(':focus')
    const focusText = await currentFocus.textContent().catch(() => '')
    
    if (focusText && (focusText.includes('Projects') || focusText.includes('Skills'))) {
      await page.keyboard.press('Enter')
      await page.waitForTimeout(1000)
    }

    console.log('Accessibility navigation test completed')
  })

  test('should measure end-to-end performance across full journey', async ({ page }) => {
    const performanceData: { [key: string]: any } = {}
    const journeyStartTime = Date.now()

    // Initial load
    await page.goto('/')
    const initialMetrics = await collectPerformanceMetrics(page)
    performanceData.initialLoad = initialMetrics

    // Netflix animation performance
    await page.click('text=Start Netflix Experience')
    const animationStartTime = Date.now()
    
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })
    const animationDuration = Date.now() - animationStartTime
    performanceData.animationDuration = animationDuration

    // Navigation performance to each page
    const pages = ['projects', 'skills', 'experience']
    for (const pageName of pages) {
      const navStartTime = Date.now()
      
      const linkElement = page.locator(`text=${pageName}`, { hasText: new RegExp(pageName, 'i') }).first()
      await expect(linkElement).toBeVisible({ timeout: 5000 })
      await linkElement.click()
      
      await page.waitForURL(`**/${pageName}`, { timeout: 5000 })
      await page.waitForLoadState('networkidle', { timeout: 5000 })
      
      const navDuration = Date.now() - navStartTime
      const pageMetrics = await collectPerformanceMetrics(page)
      
      performanceData[`${pageName}Navigation`] = navDuration
      performanceData[`${pageName}Metrics`] = pageMetrics
    }

    const totalJourneyTime = Date.now() - journeyStartTime
    performanceData.totalJourneyTime = totalJourneyTime

    // Validate performance thresholds
    expect(initialMetrics.loadTime).toBeLessThan(5000) // 5s initial load
    expect(animationDuration).toBeLessThan(6000) // 6s animation
    expect(performanceData.projectsNavigation).toBeLessThan(1000) // 1s navigation
    expect(performanceData.skillsNavigation).toBeLessThan(1000)
    expect(performanceData.experienceNavigation).toBeLessThan(1000)
    expect(totalJourneyTime).toBeLessThan(20000) // 20s total journey

    console.log('🔍 End-to-end performance summary:', {
      initialLoadTime: `${initialMetrics.loadTime}ms`,
      animationDuration: `${animationDuration}ms`,
      projectsNav: `${performanceData.projectsNavigation}ms`,
      skillsNav: `${performanceData.skillsNavigation}ms`,
      experienceNav: `${performanceData.experienceNavigation}ms`,
      totalJourney: `${totalJourneyTime}ms`
    })
  })

  test('should handle user interruption scenarios', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Simulate user interruption during animation
    await page.waitForTimeout(2000) // Wait 2s into animation
    await page.keyboard.press('Escape') // Try to interrupt
    
    // Animation should continue or handle interruption gracefully
    const animationStillVisible = await page.locator('text=Start Netflix Experience')
                                            .isVisible({ timeout: 1000 })
                                            .catch(() => false)

    // Either animation continues or app handles interruption
    if (animationStillVisible) {
      console.log('Animation continues despite interruption')
      await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })
    } else {
      console.log('Animation was interrupted and handled gracefully')
    }

    await takeTimestampedScreenshot(page, 'user-interruption-test')

    // App should be in a usable state
    const appIsUsable = await page.locator('body').isVisible()
    expect(appIsUsable).toBe(true)
  })

  test('should handle rapid user interactions', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Start Netflix Experience')
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    // Rapid navigation clicks
    const links = ['Projects', 'Skills', 'Experience', 'Projects', 'Skills']
    
    for (const linkText of links) {
      const linkElement = page.locator(`text=${linkText}`).first()
      if (await linkElement.isVisible({ timeout: 1000 })) {
        await linkElement.click()
        // Very brief pause to simulate rapid clicking
        await page.waitForTimeout(100)
      }
    }

    // Let the final navigation settle
    await page.waitForLoadState('networkidle', { timeout: 5000 })

    // App should handle rapid interactions without breaking
    const currentUrl = page.url()
    expect(currentUrl).toContain('localhost:3005')

    const hasContent = await page.locator('h1, h2, main').first().isVisible({ timeout: 3000 })
    expect(hasContent).toBe(true)

    console.log('Rapid interactions handled, final URL:', currentUrl)

    await takeTimestampedScreenshot(page, 'rapid-interactions-test')
  })

})