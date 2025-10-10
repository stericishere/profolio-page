'use client'

import { useEffect, useRef } from 'react'
import { useNavigationState } from '@/contexts/NavigationStateContext'
import { usePathname } from 'next/navigation'

interface UseScrollRestorationOptions {
  /**
   * Whether to restore scroll position on mount
   * @default true
   */
  restoreOnMount?: boolean

  /**
   * Whether to save scroll position on unmount
   * @default true
   */
  saveOnUnmount?: boolean

  /**
   * Delay in ms before restoring scroll position
   * Useful for waiting for content to load
   * @default 100
   */
  restoreDelay?: number

  /**
   * Whether to track section visibility
   * @default false
   */
  trackSections?: boolean
}

/**
 * Hook to manage scroll position restoration when navigating between pages
 *
 * @example
 * ```tsx
 * // Basic usage - auto restore scroll on mount
 * function MyPage() {
 *   useScrollRestoration()
 *   return <div>...</div>
 * }
 *
 * // With section tracking
 * function MyPage() {
 *   useScrollRestoration({ trackSections: true })
 *   return <div>
 *     <section id="about">About</section>
 *     <section id="projects">Projects</section>
 *   </div>
 * }
 * ```
 */
export function useScrollRestoration(options: UseScrollRestorationOptions = {}) {
  const {
    restoreOnMount = true,
    saveOnUnmount = true,
    restoreDelay = 100,
    trackSections = false
  } = options

  const pathname = usePathname()
  const {
    saveScrollPosition,
    restoreScrollPosition,
    saveCurrentSection
  } = useNavigationState()

  const hasRestoredRef = useRef(false)
  const sectionObserverRef = useRef<IntersectionObserver>()

  // Restore scroll position on mount
  useEffect(() => {
    if (!restoreOnMount || hasRestoredRef.current) return

    const timer = setTimeout(() => {
      restoreScrollPosition()
      hasRestoredRef.current = true
    }, restoreDelay)

    return () => clearTimeout(timer)
  }, [restoreOnMount, restoreScrollPosition, restoreDelay])

  // Save scroll position on unmount
  useEffect(() => {
    return () => {
      if (saveOnUnmount) {
        saveScrollPosition()
      }
    }
  }, [saveOnUnmount, saveScrollPosition])

  // Track section visibility
  useEffect(() => {
    if (!trackSections || typeof window === 'undefined') return

    // Create intersection observer for sections
    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            saveCurrentSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    )

    // Observe all sections with IDs
    const sections = document.querySelectorAll('[id]')
    sections.forEach((section) => {
      sectionObserverRef.current?.observe(section)
    })

    return () => {
      sectionObserverRef.current?.disconnect()
    }
  }, [trackSections, saveCurrentSection, pathname])

  return {
    saveScroll: saveScrollPosition,
    restoreScroll: restoreScrollPosition
  }
}
