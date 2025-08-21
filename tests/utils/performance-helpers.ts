import { Page } from '@playwright/test'

export interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  timeToInteractive: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  navigationStart: number
  navigationEnd: number
}

export interface PreloadMetrics {
  preloadStartTime: number
  preloadEndTime: number
  preloadDuration: number
  dataLoadTimes: {
    topPicks?: number
    projects?: number
    skills?: number
    experience?: number
    contact?: number
  }
  preloadProgress: number[]
  preloadError?: string
}

/**
 * Collects comprehensive performance metrics from the page
 */
export async function collectPerformanceMetrics(page: Page): Promise<PerformanceMetrics> {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType('paint')
    
    // Get Core Web Vitals
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
    const lcp = (window as any).__LCP__ || 0 // This needs to be set up in the app
    const cls = (window as any).__CLS__ || 0 // This needs to be set up in the app
    const fid = (window as any).__FID__ || 0 // This needs to be set up in the app
    
    return {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstContentfulPaint: fcp,
      largestContentfulPaint: lcp,
      timeToInteractive: navigation.domInteractive - navigation.fetchStart,
      cumulativeLayoutShift: cls,
      firstInputDelay: fid,
      navigationStart: navigation.fetchStart,
      navigationEnd: navigation.loadEventEnd
    }
  })
}

/**
 * Monitors console logs for preload progress and timing
 */
export async function monitorPreloadMetrics(page: Page): Promise<PreloadMetrics> {
  const preloadLogs: string[] = []
  const progressUpdates: number[] = []
  let preloadStartTime = 0
  let preloadEndTime = 0
  let preloadError: string | undefined

  // Listen for console logs related to preloading
  page.on('console', msg => {
    const text = msg.text()
    preloadLogs.push(`[${Date.now()}] ${text}`)
    
    if (text.includes('Starting background data preloading')) {
      preloadStartTime = Date.now()
    }
    
    if (text.includes('All data preloaded successfully')) {
      preloadEndTime = Date.now()
    }
    
    if (text.includes('Data preloading failed')) {
      preloadError = text
    }

    // Extract progress updates
    const progressMatch = text.match(/progress.*?(\d+)%?/)
    if (progressMatch) {
      progressUpdates.push(parseInt(progressMatch[1]))
    }
  })

  return {
    preloadStartTime,
    preloadEndTime,
    preloadDuration: preloadEndTime - preloadStartTime,
    dataLoadTimes: {}, // Will be populated by analyzing console logs
    preloadProgress: progressUpdates,
    preloadError
  }
}

/**
 * Waits for preloading to complete with timeout
 */
export async function waitForPreloadComplete(page: Page, timeoutMs = 12000): Promise<boolean> {
  try {
    // Wait for the preloading success message in console
    await page.waitForFunction(() => {
      return window.console.log.toString().includes('All data preloaded successfully') ||
             document.body.textContent?.includes('preloading complete')
    }, { timeout: timeoutMs })
    
    return true
  } catch (error) {
    console.log(`Preload timeout after ${timeoutMs}ms`)
    return false
  }
}

/**
 * Measures navigation time between pages
 */
export async function measureNavigationTime(page: Page, action: () => Promise<void>): Promise<number> {
  const startTime = Date.now()
  await action()
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle', { timeout: 5000 })
  
  const endTime = Date.now()
  return endTime - startTime
}

/**
 * Checks if data is ready in the preload context
 */
export async function checkDataReadiness(page: Page): Promise<{ [key: string]: boolean }> {
  return await page.evaluate(() => {
    // Access the React context or global state to check data readiness
    const dataTypes = ['topPicksData', 'projectsData', 'skillsData', 'experienceData', 'contactData']
    const readiness: { [key: string]: boolean } = {}
    
    dataTypes.forEach(dataType => {
      // This assumes the data readiness is exposed globally for testing
      readiness[dataType] = !!(window as any)[`__${dataType}_ready__`]
    })
    
    return readiness
  })
}

/**
 * Simulates slow network conditions for fallback testing
 */
export async function simulateSlowNetwork(page: Page) {
  const client = await page.context().newCDPSession(page)
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 50 * 1024, // 50 KB/s
    uploadThroughput: 20 * 1024,   // 20 KB/s
    latency: 2000 // 2 second latency
  })
}

/**
 * Restores normal network conditions
 */
export async function restoreNetworkConditions(page: Page) {
  const client = await page.context().newCDPSession(page)
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0
  })
}

/**
 * Gets console error messages
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = []
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  
  return errors
}

/**
 * Takes a screenshot with timestamp for debugging
 */
export async function takeTimestampedScreenshot(page: Page, name: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `${name}-${timestamp}.png`
  const path = `tests/screenshots/${filename}`
  
  await page.screenshot({ path, fullPage: true })
  return path
}