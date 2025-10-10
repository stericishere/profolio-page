'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollPosition {
  x: number
  y: number
  sectionId?: string
}

interface NavigationState {
  currentPath: string
  scrollPositions: Record<string, ScrollPosition>
  lastVisitedSection: string | null
  visitHistory: string[]
}

interface NavigationStateContextValue {
  navigationState: NavigationState
  saveScrollPosition: (path?: string) => void
  restoreScrollPosition: (path?: string) => void
  saveCurrentSection: (sectionId: string) => void
  getCurrentSection: () => string | null
  clearNavigationState: () => void
}

const NavigationStateContext = createContext<NavigationStateContextValue | undefined>(undefined)

const STORAGE_KEY = 'portfolio-navigation-state'
const SCROLL_DEBOUNCE_MS = 150

export function NavigationStateProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPath: '/',
    scrollPositions: {},
    lastVisitedSection: null,
    visitHistory: []
  })
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const isRestoringRef = useRef(false)

  // Load navigation state from sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as NavigationState
        setNavigationState(parsed)
      }
    } catch (error) {
      console.error('Error loading navigation state:', error)
    }
  }, [])

  // Save navigation state to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(navigationState))
    } catch (error) {
      console.error('Error saving navigation state:', error)
    }
  }, [navigationState])

  // Save scroll position before navigation
  const saveScrollPosition = useCallback((path?: string) => {
    if (typeof window === 'undefined') return

    const targetPath = path || pathname
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    // Find current section in view
    let currentSectionId: string | undefined
    const sections = document.querySelectorAll('[id]')
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSectionId = section.id
      }
    })

    setNavigationState(prev => ({
      ...prev,
      scrollPositions: {
        ...prev.scrollPositions,
        [targetPath]: {
          x: scrollX,
          y: scrollY,
          sectionId: currentSectionId
        }
      }
    }))
  }, [pathname])

  // Restore scroll position after navigation
  const restoreScrollPosition = useCallback((path?: string) => {
    if (typeof window === 'undefined' || isRestoringRef.current) return

    const targetPath = path || pathname
    const savedPosition = navigationState.scrollPositions[targetPath]

    if (savedPosition) {
      isRestoringRef.current = true

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Try to scroll to saved section first
        if (savedPosition.sectionId) {
          const section = document.getElementById(savedPosition.sectionId)
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => {
              isRestoringRef.current = false
            }, 1000)
            return
          }
        }

        // Fallback to saved scroll position
        window.scrollTo({
          left: savedPosition.x,
          top: savedPosition.y,
          behavior: 'smooth'
        })

        setTimeout(() => {
          isRestoringRef.current = false
        }, 1000)
      })
    } else {
      isRestoringRef.current = false
    }
  }, [pathname, navigationState.scrollPositions])

  // Save current section user is viewing
  const saveCurrentSection = useCallback((sectionId: string) => {
    setNavigationState(prev => ({
      ...prev,
      lastVisitedSection: sectionId
    }))
  }, [])

  // Get current section
  const getCurrentSection = useCallback(() => {
    return navigationState.lastVisitedSection
  }, [navigationState.lastVisitedSection])

  // Clear all navigation state
  const clearNavigationState = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY)
    }
    setNavigationState({
      currentPath: '/',
      scrollPositions: {},
      lastVisitedSection: null,
      visitHistory: []
    })
  }, [])

  // Track path changes and update visit history
  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      currentPath: pathname,
      visitHistory: [...prev.visitHistory.slice(-9), pathname] // Keep last 10 visits
    }))
  }, [pathname])

  // Auto-save scroll position on scroll (debounced)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (isRestoringRef.current) return

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        saveScrollPosition()
      }, SCROLL_DEBOUNCE_MS)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [saveScrollPosition])

  // Auto-save scroll position before page unload
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeUnload = () => {
      saveScrollPosition()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [saveScrollPosition])

  const value: NavigationStateContextValue = {
    navigationState,
    saveScrollPosition,
    restoreScrollPosition,
    saveCurrentSection,
    getCurrentSection,
    clearNavigationState
  }

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  )
}

export function useNavigationState() {
  const context = useContext(NavigationStateContext)
  if (context === undefined) {
    throw new Error('useNavigationState must be used within a NavigationStateProvider')
  }
  return context
}
