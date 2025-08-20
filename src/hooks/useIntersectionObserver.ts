'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px', // Load slightly before entering viewport
    freezeOnceVisible = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    const node = targetRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, hasBeenVisible])

  // Return frozen state if freezeOnceVisible is true and element has been visible
  const shouldShow = freezeOnceVisible ? hasBeenVisible : isIntersecting

  return { ref: targetRef, isIntersecting, isVisible: shouldShow }
}

export function useIntersectionObserverList<T>(
  items: T[],
  options: UseIntersectionObserverOptions = {}
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const refs = useRef<(Element | null)[]>([])

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options
    const observers: IntersectionObserver[] = []

    items.forEach((_, index) => {
      const element = refs.current[index]
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]))
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [items, options])

  const setRef = (index: number) => (element: Element | null) => {
    refs.current[index] = element
  }

  return { visibleItems, setRef }
}