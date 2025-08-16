'use client'

import { useState, useEffect } from 'react'

interface UseScrollShadowOptions {
  threshold?: number // Scroll threshold in pixels before shadow appears
  maxOpacity?: number // Maximum shadow opacity (0-1)
}

export function useScrollShadow({ 
  threshold = 50, 
  maxOpacity = 0.4 
}: UseScrollShadowOptions = {}) {
  const [scrollY, setScrollY] = useState(0)
  const [shadowOpacity, setShadowOpacity] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrollY(currentScrollY)

        // Calculate shadow opacity based on scroll position
        if (currentScrollY <= threshold) {
          // No scroll or below threshold - no shadow
          setShadowOpacity(0)
        } else {
          // Progressive shadow based on scroll distance
          const scrollProgress = Math.min((currentScrollY - threshold) / threshold, 1)
          setShadowOpacity(scrollProgress * maxOpacity)
        }
      })
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [threshold, maxOpacity])

  return {
    scrollY,
    shadowOpacity,
    isScrolled: scrollY > threshold
  }
}