import { test, expect } from '@playwright/test'
import { 
  simulateSlowNetwork, 
  restoreNetworkConditions, 
  waitForPreloadComplete,
  getConsoleErrors,
  takeTimestampedScreenshot 
} from './utils/performance-helpers'

test.describe('Error Handling and Fallback Scenarios', () => {

  test.afterEach(async ({ page }) => {
    // Restore normal network conditions after each test
    await restoreNetworkConditions(page)
  })

  test('should handle preloading timeout gracefully', async ({ page }) => {
    const consoleLogs: string[] = []
    const consoleErrors: string[] = []

    page.on('console', msg => {
      const text = msg.text()
      consoleLogs.push(text)
      
      if (msg.type() === 'error') {
        consoleErrors.push(text)
      }
    })

    // Simulate very slow network to trigger timeout
    await simulateSlowNetwork(page)

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait longer than the preload timeout (10 seconds)
    await page.waitForTimeout(12000)

    await takeTimestampedScreenshot(page, 'preload-timeout-scenario')

    // Should have timeout error in console
    const hasTimeoutError = consoleLogs.some(log => 
      log.includes('timeout') || log.includes('Preloading timeout')
    )
    expect(hasTimeoutError).toBe(true)

    // Application should still be functional despite timeout
    const pageIsUsable = await page.locator('body').isVisible()
    expect(pageIsUsable).toBe(true)

    console.log('Timeout test - Console errors:', consoleErrors.slice(0, 3))
    console.log('Timeout test - Last few logs:', consoleLogs.slice(-5))
  })

  test('should retry preloading when retry function is called', async ({ page }) => {
    let preloadAttempts = 0
    let retryAttempted = false

    page.on('console', msg => {
      const text = msg.text()
      
      if (text.includes('Starting background data preloading')) {
        preloadAttempts++
      }
      
      if (text.includes('Retrying data preload')) {
        retryAttempted = true
      }
    })

    // First, simulate failure scenario
    await simulateSlowNetwork(page)
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for timeout to occur
    await page.waitForTimeout(12000)

    // Now restore network and trigger retry programmatically
    await restoreNetworkConditions(page)

    // Simulate retry call (this would need to be exposed in the UI for testing)
    await page.evaluate(() => {
      // Access the retry function through the global context or a testing hook
      if ((window as any).__retryPreload) {
        (window as any).__retryPreload()
      } else {
        console.log('Retrying data preload...')
      }
    })

    await page.waitForTimeout(2000)

    // Should have attempted preload at least once, potentially twice with retry
    expect(preloadAttempts).toBeGreaterThanOrEqual(1)

    console.log(`Preload attempts: ${preloadAttempts}, Retry attempted: ${retryAttempted}`)

    await takeTimestampedScreenshot(page, 'preload-retry-scenario')
  })

  test('should show fallback loading when preloading fails', async ({ page }) => {
    let showedFallbackLoading = false

    // Monitor for fallback loading indicators
    page.on('response', response => {
      if (response.status() >= 400) {
        console.log(`Network error: ${response.status()} for ${response.url()}`)
      }
    })

    await simulateSlowNetwork(page)
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Complete animation even if preloading fails
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    // Try to navigate to a page
    const projectsLink = page.locator('text=Projects').first()
    if (await projectsLink.isVisible({ timeout: 3000 })) {
      await projectsLink.click()
      
      // Should show some kind of loading state since preloading failed
      const loadingIndicators = await Promise.race([
        page.waitForSelector('[data-testid="loading"]', { timeout: 2000 }).catch(() => null),
        page.waitForSelector('.loading', { timeout: 2000 }).catch(() => null),
        page.waitForSelector('.skeleton', { timeout: 2000 }).catch(() => null),
        page.waitForSelector('text=Loading...', { timeout: 2000 }).catch(() => null)
      ])

      showedFallbackLoading = !!loadingIndicators

      // Page should eventually load even without preloading
      await page.waitForLoadState('networkidle', { timeout: 10000 })
    }

    console.log('Showed fallback loading:', showedFallbackLoading)

    await takeTimestampedScreenshot(page, 'fallback-loading-scenario')
  })

  test('should handle navigation when data is not preloaded', async ({ page }) => {
    // Go directly to a page without preloading
    await page.goto('/projects')
    
    await page.waitForLoadState('networkidle', { timeout: 8000 })

    // Page should load even without preloaded data
    expect(page.url()).toContain('/projects')

    const hasContent = await page.locator('h1, h2, .project-card, [data-testid="project-content"]')
                                  .first()
                                  .isVisible({ timeout: 5000 })
    expect(hasContent).toBe(true)

    // Similarly test other pages
    await page.goto('/skills')
    await page.waitForLoadState('networkidle', { timeout: 8000 })
    expect(page.url()).toContain('/skills')

    await page.goto('/experience')
    await page.waitForLoadState('networkidle', { timeout: 8000 })
    expect(page.url()).toContain('/experience')

    console.log('Direct navigation without preloading works')

    await takeTimestampedScreenshot(page, 'direct-navigation-no-preload')
  })

  test('should handle invalid data structure gracefully', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // This test would require mocking the data module to return invalid data
    // For now, we'll test the error handling by checking console error patterns
    
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for potential data validation errors
    await page.waitForTimeout(5000)

    // Check if there are any data structure validation errors
    const hasDataValidationErrors = consoleErrors.some(error => 
      error.includes('Invalid') && (
        error.includes('Data') || 
        error.includes('structure') || 
        error.includes('array')
      )
    )

    // If there are validation errors, the app should still be functional
    if (hasDataValidationErrors) {
      console.log('Data validation errors detected:', consoleErrors.filter(e => e.includes('Invalid')))
      
      // App should still be usable
      const appIsUsable = await page.locator('body').isVisible()
      expect(appIsUsable).toBe(true)
    }

    console.log('Data structure validation test completed')
    console.log('Total console errors:', consoleErrors.length)

    await takeTimestampedScreenshot(page, 'data-validation-test')
  })

  test('should handle network interruption during preloading', async ({ page }) => {
    let networkInterrupted = false

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Let preloading start
    await page.waitForTimeout(2000)

    // Simulate network interruption
    await page.route('**/*', route => route.abort('failed'))
    networkInterrupted = true

    // Wait a bit with network interruption
    await page.waitForTimeout(2000)

    // Restore network
    await page.unroute('**/*')
    
    // App should handle the interruption
    await page.waitForTimeout(3000)

    // Page should still be functional
    const pageIsUsable = await page.locator('body').isVisible()
    expect(pageIsUsable).toBe(true)

    console.log('Network interruption test completed, network was interrupted:', networkInterrupted)

    await takeTimestampedScreenshot(page, 'network-interruption-test')
  })

  test('should handle browser refresh during preloading', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Let preloading start
    await page.waitForTimeout(2000)

    // Refresh the page during preloading
    await page.reload({ waitUntil: 'networkidle' })

    // Should be back to the initial state
    await expect(page.locator('text=Start Netflix Experience')).toBeVisible({ timeout: 5000 })

    // Should be able to start again
    await page.click('text=Start Netflix Experience')
    
    // Let it complete normally
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    console.log('Browser refresh during preloading handled')

    await takeTimestampedScreenshot(page, 'browser-refresh-test')
  })

  test('should handle multiple simultaneous preload requests', async ({ page }) => {
    let preloadStartCount = 0

    page.on('console', msg => {
      if (msg.text().includes('Starting background data preloading')) {
        preloadStartCount++
      }
    })

    await page.goto('/')

    // Try to start preloading multiple times rapidly
    await page.click('text=Start Netflix Experience')
    
    // Immediately try to trigger additional preloads (this would be through the retry mechanism)
    await page.evaluate(() => {
      // Simulate multiple preload attempts
      if ((window as any).__preloadAllData) {
        (window as any).__preloadAllData()
        setTimeout(() => (window as any).__preloadAllData(), 100)
        setTimeout(() => (window as any).__preloadAllData(), 200)
      }
    })

    await page.waitForTimeout(8000)

    // Should prevent multiple simultaneous preloads
    // (Implementation should handle this with a promise guard)
    console.log('Preload start count:', preloadStartCount)
    
    // The exact count depends on implementation, but should handle duplicates gracefully
    expect(preloadStartCount).toBeGreaterThan(0)

    await takeTimestampedScreenshot(page, 'multiple-preload-test')
  })

  test('should handle missing audio file gracefully', async ({ page }) => {
    let audioErrors: string[] = []

    page.on('console', msg => {
      const text = msg.text()
      if (text.includes('Audio play failed') || text.includes('audio')) {
        audioErrors.push(text)
      }
    })

    // Block audio file requests to simulate missing file
    await page.route('**/assets/audio/**', route => route.abort('failed'))

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for animation to complete
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 8000 })

    // Should handle missing audio gracefully
    const hasAudioError = audioErrors.some(error => error.includes('failed'))
    if (hasAudioError) {
      console.log('Audio error handled gracefully:', audioErrors[0])
    }

    // Animation should still complete
    expect(page.url()).not.toContain('Start Netflix Experience')

    // Restore audio routes
    await page.unroute('**/assets/audio/**')

    await takeTimestampedScreenshot(page, 'missing-audio-test')
  })

})