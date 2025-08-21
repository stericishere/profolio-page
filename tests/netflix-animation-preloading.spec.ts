import { test, expect } from '@playwright/test'
import { 
  collectPerformanceMetrics, 
  monitorPreloadMetrics, 
  waitForPreloadComplete,
  takeTimestampedScreenshot 
} from './utils/performance-helpers'

test.describe('Netflix Animation and Preloading', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear any cached data
    await page.context().clearCookies()
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('should trigger data preloading when Netflix animation starts', async ({ page }) => {
    const consoleLogs: string[] = []
    let preloadStarted = false
    let animationStarted = false

    // Monitor console for preloading messages
    page.on('console', msg => {
      const text = msg.text()
      consoleLogs.push(text)
      
      if (text.includes('Netflix animation started - beginning data preload')) {
        animationStarted = true
      }
      
      if (text.includes('Starting background data preloading')) {
        preloadStarted = true
      }
    })

    await page.goto('/')

    // Should see the Netflix start button
    await expect(page.locator('text=Start Netflix Experience')).toBeVisible()
    
    // Take screenshot before starting
    await takeTimestampedScreenshot(page, 'before-netflix-start')

    const startTime = Date.now()

    // Click to start the Netflix sequence
    await page.click('text=Start Netflix Experience')

    // Wait for animation to start
    await page.waitForTimeout(100)
    await takeTimestampedScreenshot(page, 'netflix-animation-started')

    // Verify animation started and preloading began
    expect(animationStarted).toBe(true)
    expect(preloadStarted).toBe(true)

    // Wait for animation to complete (should be around 3.8 seconds)
    await page.waitForSelector('text=Start Netflix Experience', { state: 'hidden', timeout: 5000 })
    
    const animationEndTime = Date.now()
    const animationDuration = animationEndTime - startTime

    // Animation should complete in reasonable time (3.8s ± 1s)
    expect(animationDuration).toBeGreaterThan(3000)
    expect(animationDuration).toBeLessThan(6000)

    console.log(`Netflix animation completed in ${animationDuration}ms`)
    console.log('Console logs during animation:', consoleLogs.slice(0, 5))

    await takeTimestampedScreenshot(page, 'netflix-animation-completed')
  })

  test('should show Netflix STERIC animation with proper scaling and effects', async ({ page }) => {
    await page.goto('/')
    
    // Start the animation
    await page.click('text=Start Netflix Experience')

    // Verify the STERIC text appears
    await page.waitForSelector('text=S', { timeout: 2000 })
    
    // Check that all letters are visible with proper styling
    for (const letter of 'STERIC'.split('')) {
      const letterElement = page.locator(`text=${letter}`).first()
      await expect(letterElement).toBeVisible()
      
      // Check styling
      const styles = await letterElement.evaluate(el => {
        const computed = window.getComputedStyle(el)
        return {
          color: computed.color,
          textShadow: computed.textShadow,
          fontWeight: computed.fontWeight
        }
      })
      
      // Should have red color and text shadow
      expect(styles.textShadow).toContain('rgba')
      expect(styles.fontWeight).toBe('700')
    }

    await takeTimestampedScreenshot(page, 'netflix-steric-animation')

    // Wait for scaling up animation (should happen around 3s)
    await page.waitForTimeout(3500)
    await takeTimestampedScreenshot(page, 'netflix-scaling-animation')
  })

  test('should complete preloading within expected timeframe', async ({ page }) => {
    const preloadMetrics = await monitorPreloadMetrics(page)
    let preloadStartTime = 0
    let preloadCompleteTime = 0
    const progressUpdates: number[] = []

    page.on('console', msg => {
      const text = msg.text()
      
      if (text.includes('Starting background data preloading')) {
        preloadStartTime = Date.now()
      }
      
      if (text.includes('All data preloaded successfully')) {
        preloadCompleteTime = Date.now()
      }

      // Track progress updates
      const progressMatch = text.match(/setPreloadingProgress\((\d+)\)/)
      if (progressMatch) {
        progressUpdates.push(parseInt(progressMatch[1]))
      }
    })

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for preloading to complete
    const preloadCompleted = await waitForPreloadComplete(page, 12000)
    expect(preloadCompleted).toBe(true)

    const preloadDuration = preloadCompleteTime - preloadStartTime
    
    // Preloading should complete within 10 seconds
    expect(preloadDuration).toBeGreaterThan(0)
    expect(preloadDuration).toBeLessThan(10000)

    // Should have progress updates
    expect(progressUpdates.length).toBeGreaterThan(0)
    expect(Math.max(...progressUpdates)).toBe(100)

    console.log(`Preloading completed in ${preloadDuration}ms`)
    console.log('Progress updates:', progressUpdates)
  })

  test('should load all required data types during preloading', async ({ page }) => {
    const dataLoadEvents: { [key: string]: boolean } = {}
    const expectedDataTypes = ['topPicksData', 'projectsData', 'skillsData', 'experienceData', 'contactData']

    page.on('console', msg => {
      const text = msg.text()
      
      // Track when each data type is loaded
      expectedDataTypes.forEach(dataType => {
        if (text.includes(`${dataType} loaded`)) {
          dataLoadEvents[dataType] = true
        }
      })
    })

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for all data to load
    await waitForPreloadComplete(page, 12000)

    // Verify all data types were loaded
    expectedDataTypes.forEach(dataType => {
      expect(dataLoadEvents[dataType]).toBe(true)
    })

    console.log('Data load events:', dataLoadEvents)
  })

  test('should prefetch navigation routes during preloading', async ({ page }) => {
    const prefetchRoutes: string[] = []

    // Monitor network requests for prefetching
    page.on('request', request => {
      const url = request.url()
      if (url.includes('/projects') || url.includes('/skills') || 
          url.includes('/experience') || url.includes('/contact')) {
        prefetchRoutes.push(url)
      }
    })

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait for preloading
    await waitForPreloadComplete(page, 12000)

    // Should have prefetched the main routes
    const expectedRoutes = ['/projects', '/skills', '/experience', '/contact']
    expectedRoutes.forEach(route => {
      const prefetched = prefetchRoutes.some(url => url.includes(route))
      expect(prefetched).toBe(true)
    })

    console.log('Prefetched routes:', prefetchRoutes)
  })

  test('should validate preloaded data structure', async ({ page }) => {
    let dataValidationResults: { [key: string]: any } = {}

    page.on('console', msg => {
      const text = msg.text()
      
      // Capture validation results
      if (text.includes('validation passed') || text.includes('validation failed')) {
        dataValidationResults[Date.now()] = text
      }
    })

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    await waitForPreloadComplete(page, 12000)

    // Check that data validation occurred
    const validationMessages = Object.values(dataValidationResults)
    expect(validationMessages.length).toBeGreaterThan(0)

    // Should have successful validations
    const hasSuccessfulValidation = validationMessages.some(msg => 
      typeof msg === 'string' && msg.includes('validation passed')
    )
    expect(hasSuccessfulValidation).toBe(true)

    console.log('Data validation results:', dataValidationResults)
  })

  test('should measure performance impact of preloading', async ({ page }) => {
    await page.goto('/')

    // Collect initial performance metrics
    const initialMetrics = await collectPerformanceMetrics(page)

    await page.click('text=Start Netflix Experience')
    await waitForPreloadComplete(page, 12000)

    // Collect final performance metrics
    const finalMetrics = await collectPerformanceMetrics(page)

    // Performance should still be reasonable
    expect(finalMetrics.loadTime).toBeLessThan(5000) // 5 seconds max
    expect(finalMetrics.domContentLoaded).toBeLessThan(3000) // 3 seconds max

    console.log('Performance metrics:', {
      initial: initialMetrics,
      final: finalMetrics
    })
  })

  test('should handle audio playback attempt', async ({ page }) => {
    let audioPlayAttempted = false
    let audioPlayResult = ''

    page.on('console', msg => {
      const text = msg.text()
      if (text.includes('Audio playing successfully')) {
        audioPlayAttempted = true
        audioPlayResult = 'success'
      } else if (text.includes('Audio play failed')) {
        audioPlayAttempted = true
        audioPlayResult = 'failed'
      }
    })

    await page.goto('/')
    await page.click('text=Start Netflix Experience')

    // Wait a bit for audio to be attempted
    await page.waitForTimeout(1000)

    // Audio play should be attempted (success/failure depends on browser permissions)
    expect(audioPlayAttempted).toBe(true)
    expect(['success', 'failed']).toContain(audioPlayResult)

    console.log('Audio play result:', audioPlayResult)
  })

})