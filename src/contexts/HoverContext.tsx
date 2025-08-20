'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface HoverContextType {
  hoveredCardId: string | null
  setHoveredCard: (cardId: string | null) => void
  isCardHovered: (cardId: string) => boolean
  shouldBlurOthers: (cardId: string) => boolean
}

const HoverContext = createContext<HoverContextType | undefined>(undefined)

export function HoverProvider({ children }: { children: React.ReactNode }) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)

  const setHoveredCard = useCallback((cardId: string | null) => {
    setHoveredCardId(cardId)
  }, [])

  const isCardHovered = useCallback((cardId: string) => {
    return hoveredCardId === cardId
  }, [hoveredCardId])

  const shouldBlurOthers = useCallback((cardId: string) => {
    return hoveredCardId !== null && hoveredCardId !== cardId
  }, [hoveredCardId])

  const value: HoverContextType = {
    hoveredCardId,
    setHoveredCard,
    isCardHovered,
    shouldBlurOthers
  }

  return (
    <HoverContext.Provider value={value}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const context = useContext(HoverContext)
  if (!context) {
    throw new Error('useHover must be used within a HoverProvider')
  }
  return context
}