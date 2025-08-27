/**
 * Utility functions for managing hover effects and preventing clipping
 */

export interface ElementBounds {
  x: number
  y: number
  width: number
  height: number
}

export interface ViewportBounds {
  width: number
  height: number
}

/**
 * Detects if an element is near viewport edges
 */
export function detectEdgeProximity(
  elementBounds: ElementBounds,
  viewport: ViewportBounds,
  threshold: number = 50
) {
  const { x, y, width, height } = elementBounds
  
  return {
    nearLeftEdge: x < threshold,
    nearRightEdge: x + width > viewport.width - threshold,
    nearTopEdge: y < threshold,
    nearBottomEdge: y + height > viewport.height - threshold
  }
}

/**
 * Calculates optimal transform origin based on element position
 */
export function getOptimalTransformOrigin(
  elementBounds: ElementBounds,
  viewport: ViewportBounds
): string {
  const edgeProximity = detectEdgeProximity(elementBounds, viewport)
  
  let xOrigin = 'center'
  let yOrigin = 'center'
  
  // Adjust horizontal origin
  if (edgeProximity.nearLeftEdge) {
    xOrigin = 'left'
  } else if (edgeProximity.nearRightEdge) {
    xOrigin = 'right'
  }
  
  // Adjust vertical origin
  if (edgeProximity.nearTopEdge) {
    yOrigin = 'top'
  } else if (edgeProximity.nearBottomEdge) {
    yOrigin = 'bottom'
  }
  
  return `${xOrigin} ${yOrigin}`
}

/**
 * Calculates safe scale factor to prevent clipping
 */
export function getSafeScaleFactor(
  elementBounds: ElementBounds,
  viewport: ViewportBounds,
  desiredScale: number = 1.15,
  padding: number = 20
): number {
  const { x, y, width, height } = elementBounds
  
  // Check horizontal constraints
  const leftSpace = x - padding
  const rightSpace = viewport.width - (x + width) - padding
  const maxHorizontalScale = Math.min(
    (leftSpace + width) / width,
    (rightSpace + width) / width,
    desiredScale
  )
  
  // Check vertical constraints
  const topSpace = y - padding
  const bottomSpace = viewport.height - (y + height) - padding
  const maxVerticalScale = Math.min(
    (topSpace + height) / height,
    (bottomSpace + height) / height,
    desiredScale
  )
  
  return Math.min(maxHorizontalScale, maxVerticalScale, desiredScale)
}

/**
 * Determines if hover effects should be applied based on available space
 */
export function shouldAllowHoverEffects(
  elementBounds: ElementBounds,
  viewport: ViewportBounds,
  minSpace: number = 30
): boolean {
  const { x, y, width, height } = elementBounds
  
  const hasHorizontalSpace = 
    x >= minSpace && 
    (x + width) <= (viewport.width - minSpace)
  
  const hasVerticalSpace = 
    y >= minSpace && 
    (y + height) <= (viewport.height - minSpace)
  
  return hasHorizontalSpace && hasVerticalSpace
}

/**
 * Hook for responsive hover behavior
 */
export function getResponsiveHoverConfig(
  elementBounds: ElementBounds | null,
  viewport: ViewportBounds | null,
  defaultConfig: {
    scale: number
    y: number
    duration: number
  } = { scale: 1.15, y: -16, duration: 0.3 }
) {
  if (!elementBounds || !viewport) {
    return defaultConfig
  }
  
  const safeScale = getSafeScaleFactor(elementBounds, viewport, defaultConfig.scale)
  const transformOrigin = getOptimalTransformOrigin(elementBounds, viewport)
  const shouldHover = shouldAllowHoverEffects(elementBounds, viewport)
  
  return {
    scale: shouldHover ? safeScale : 1.02,
    y: shouldHover ? defaultConfig.y : -4,
    duration: defaultConfig.duration,
    transformOrigin,
    shouldHover
  }
}