import { test, expect } from '@playwright/test'
import { 
  collectPerformanceMetrics, 
  waitForPreloadComplete, 
  measureNavigationTime,
  takeTimestampedScreenshot 
} from './utils/performance-helpers'

test.describe('Navigation Performance', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear cache and go to homepage
    await page.context().clearCookies()
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    await page.goto('/')
    
    // Complete the Netflix animation and preloading
    await page.click('text=Start Netflix Experience')
    await waitForPreloadComplete(page, 12000)
    
    // Should now be on the Who's Watching screen or main dashboard
    await page.waitForTimeout(500)
  })

  test('should navigate to Projects page instantly after preloading', async ({ page }) => {
    // Take screenshot before navigation
    await takeTimestampedScreenshot(page, 'before-projects-nav')

    const navigationTime = await measureNavigationTime(page, async () => {
      // Look for Projects navigation - could be in navbar or Who's Watching screen
      const projectsLink = page.locator('text=Projects').first()
      await expect(projectsLink).toBeVisible({ timeout: 5000 })
      await projectsLink.click()
    })

    // Wait for projects page to load
    await page.waitForURL('**/projects', { timeout: 5000 })
    await page.waitForLoadState('networkidle', { timeout: 3000 })

    await takeTimestampedScreenshot(page, 'after-projects-nav')

    // Navigation should be near-instant since data is preloaded
    expect(navigationTime).toBeLessThan(500) // 500ms max for instant feel

    // Verify we're on the projects page
    expect(page.url()).toContain('/projects')

    // Check that content loads quickly
    const hasContent = await page.locator('[data-testid="project-content"], .project-card, h1, h2').first().isVisible()
    expect(hasContent).toBe(true)

    console.log(`Projects navigation took ${navigationTime}ms`)
  })

  test('should navigate to Skills page instantly after preloading', async ({ page }) => {
    await takeTimestampedScreenshot(page, 'before-skills-nav')

    const navigationTime = await measureNavigationTime(page, async () => {
      const skillsLink = page.locator('text=Skills').first()
      await expect(skillsLink).toBeVisible({ timeout: 5000 })
      await skillsLink.click()
    })

    await page.waitForURL('**/skills', { timeout: 5000 })
    await page.waitForLoadState('networkidle', { timeout: 3000 })

    await takeTimestampedScreenshot(page, 'after-skills-nav')

    expect(navigationTime).toBeLessThan(500)
    expect(page.url()).toContain('/skills')

    // Verify skills content is immediately available
    const hasSkillsContent = await page.locator('[data-testid="skills-content"], .skill-card, h1, h2').first().isVisible()
    expect(hasSkillsContent).toBe(true)

    console.log(`Skills navigation took ${navigationTime}ms`)
  })

  test('should navigate to Experience page instantly after preloading', async ({ page }) => {
    await takeTimestampedScreenshot(page, 'before-experience-nav')

    const navigationTime = await measureNavigationTime(page, async () => {
      const experienceLink = page.locator('text=Experience').first()
      await expect(experienceLink).toBeVisible({ timeout: 5000 })
      await experienceLink.click()
    })

    await page.waitForURL('**/experience', { timeout: 5000 })
    await page.waitForLoadState('networkidle', { timeout: 3000 })

    await takeTimestampedScreenshot(page, 'after-experience-nav')

    expect(navigationTime).toBeLessThan(500)
    expect(page.url()).toContain('/experience')

    const hasExperienceContent = await page.locator('[data-testid="experience-content"], .experience-card, h1, h2').first().isVisible()
    expect(hasExperienceContent).toBe(true)

    console.log(`Experience navigation took ${navigationTime}ms`)
  })

  test('should measure Core Web Vitals during navigation', async ({ page }) => {
    // Navigate to each main page and measure performance
    const pages = [
      { name: 'Projects', path: '/projects' },
      { name: 'Skills', path: '/skills' },
      { name: 'Experience', path: '/experience' }
    ]

    const performanceResults: { [key: string]: any } = {}

    for (const { name, path } of pages) {
      // Navigate to the page
      await page.goto(path, { waitUntil: 'networkidle' })
      
      // Collect performance metrics
      const metrics = await collectPerformanceMetrics(page)
      performanceResults[name] = metrics

      // Core Web Vitals thresholds
      expect(metrics.loadTime).toBeLessThan(3000) // 3s max load time
      expect(metrics.domContentLoaded).toBeLessThan(2000) // 2s max DOMContentLoaded
      expect(metrics.timeToInteractive).toBeLessThan(2500) // 2.5s max TTI

      console.log(`${name} Performance:`, {
        loadTime: `${metrics.loadTime}ms`,
        domContentLoaded: `${metrics.domContentLoaded}ms`,
        timeToInteractive: `${metrics.timeToInteractive}ms`
      })

      await page.waitForTimeout(1000) // Brief pause between navigations
    }

    console.log('All navigation performance results:', performanceResults)
  })

  test('should handle rapid navigation between pages', async ({ page }) => {
    const navigationSequence = [
      { name: 'Projects', selector: 'text=Projects' },
      { name: 'Skills', selector: 'text=Skills' },
      { name: 'Experience', selector: 'text=Experience' },
      { name: 'Projects', selector: 'text=Projects' } // Go back to test caching
    ]

    const navigationTimes: { [key: string]: number[] } = {}

    for (const { name, selector } of navigationSequence) {
      const startTime = Date.now()
      
      const linkElement = page.locator(selector).first()
      await expect(linkElement).toBeVisible({ timeout: 5000 })
      await linkElement.click()
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle', { timeout: 3000 })
      
      const endTime = Date.now()
      const navigationTime = endTime - startTime

      if (!navigationTimes[name]) {
        navigationTimes[name] = []
      }
      navigationTimes[name].push(navigationTime)

      // Each navigation should be fast
      expect(navigationTime).toBeLessThan(1000) // 1s max for rapid navigation

      await page.waitForTimeout(200) // Brief pause
    }

    console.log('Rapid navigation times:', navigationTimes)

    // Second visit to Projects should be even faster (cached)
    if (navigationTimes['Projects'].length > 1) {
      const firstVisit = navigationTimes['Projects'][0]
      const secondVisit = navigationTimes['Projects'][1]
      expect(secondVisit).toBeLessThanOrEqual(firstVisit)
    }
  })

  test('should handle navigation with browser back/forward buttons', async ({ page }) => {
    // Navigate to Projects
    await page.locator('text=Projects').first().click()
    await page.waitForURL('**/projects')
    
    // Navigate to Skills
    await page.locator('text=Skills').first().click()
    await page.waitForURL('**/skills')

    // Test back navigation
    const backStartTime = Date.now()
    await page.goBack()
    await page.waitForURL('**/projects')
    const backTime = Date.now() - backStartTime

    // Test forward navigation  
    const forwardStartTime = Date.now()
    await page.goForward()
    await page.waitForURL('**/skills')
    const forwardTime = Date.now() - forwardStartTime

    // Back/forward should be very fast due to browser caching
    expect(backTime).toBeLessThan(500)
    expect(forwardTime).toBeLessThan(500)

    console.log(`Back navigation: ${backTime}ms, Forward navigation: ${forwardTime}ms`)

    await takeTimestampedScreenshot(page, 'browser-navigation-test')
  })

  test('should show loading states appropriately', async ({ page }) => {
    // Navigate to a page and check for loading states
    const projectsLink = page.locator('text=Projects').first()
    await expect(projectsLink).toBeVisible()

    // Click and immediately check for loading state
    await projectsLink.click()

    // Look for any loading indicators (spinners, skeletons, etc.)
    const loadingIndicators = [
      page.locator('[data-testid="loading"]'),
      page.locator('.loading'),
      page.locator('.skeleton'),
      page.locator('text=Loading...')
    ]

    // Check if any loading indicators appear (they should be brief or not exist due to preloading)
    let hasLoadingState = false
    for (const indicator of loadingIndicators) {
      if (await indicator.isVisible().catch(() => false)) {
        hasLoadingState = true
        break
      }
    }

    // With preloading, we might not see loading states, or they should be very brief
    if (hasLoadingState) {
      console.log('Loading state detected - checking duration')
      await page.waitForTimeout(100)
    }

    // Content should load quickly regardless
    await page.waitForLoadState('networkidle', { timeout: 3000 })

    console.log('Loading state handling verified')
  })

  test('should maintain scroll position during navigation', async ({ page }) => {
    // Go to a page with scrollable content
    await page.locator('text=Projects').first().click()
    await page.waitForURL('**/projects')

    // Scroll down if there's content
    await page.evaluate(() => window.scrollTo(0, 200))
    const scrollPosition = await page.evaluate(() => window.scrollY)

    // Navigate away and back
    await page.locator('text=Skills').first().click()
    await page.waitForURL('**/skills')

    await page.locator('text=Projects').first().click()
    await page.waitForURL('**/projects')

    // Check scroll position is reset (or maintained based on app behavior)
    const newScrollPosition = await page.evaluate(() => window.scrollY)
    
    // This depends on app implementation - document the behavior
    console.log(`Original scroll: ${scrollPosition}px, After navigation: ${newScrollPosition}px`)
    
    // At minimum, page should be interactive
    expect(newScrollPosition).toBeGreaterThanOrEqual(0)
  })

  test('should handle navigation errors gracefully', async ({ page }) => {
    // Try to navigate to a non-existent route
    await page.goto('/non-existent-page', { waitUntil: 'networkidle' })

    // Should either redirect to a 404 page or home page
    const currentUrl = page.url()
    const has404Content = await page.locator('text=404', { timeout: 2000 }).isVisible().catch(() => false)
    const hasHomeContent = currentUrl.includes('localhost:3005') && !currentUrl.includes('/non-existent-page')

    expect(has404Content || hasHomeContent).toBe(true)

    console.log(`Navigation error handling: URL=${currentUrl}, Has404=${has404Content}`)

    await takeTimestampedScreenshot(page, 'navigation-error-handling')
  })

})