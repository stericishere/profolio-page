'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ScrollableRowProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function ScrollableRow({ title, children, className = '' }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`mb-8 ${className}`}>
      {/* Section Title */}
      <motion.h2 
        className="text-xl md:text-2xl font-semibold text-white mb-4 px-6 cursor-default"
        whileHover={{ 
          scale: 1.02,
          color: "#f87171",
          transition: { duration: 0.2 }
        }}
      >
        {title}
      </motion.h2>
      
      {/* Scrollable Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <motion.button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
            onClick={() => scroll('left')}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
        
        {/* Right Arrow */}
        {canScrollRight && (
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
            onClick={() => scroll('right')}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}
        
        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-6 py-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            overflowY: 'visible',
            scrollSnapType: 'x mandatory'
          }}
          onScroll={checkScrollability}
        >
          {children}
        </div>
      </div>
    </div>
  )
}