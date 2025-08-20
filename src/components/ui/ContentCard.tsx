'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getResponsiveHoverConfig } from '@/utils/hoverUtils'

interface ContentCardProps {
  title: string
  subtitle?: string
  image?: string
  type: 'project' | 'skill' | 'experience' | 'achievement' | 'contact'
  onClick?: () => void
  className?: string
  id?: string
}

export function ContentCard({ 
  title, 
  subtitle, 
  image, 
  type, 
  onClick, 
  className = '',
  id = `${type}-${title.toLowerCase().replace(/\s+/g, '-')}`
}: ContentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [elementBounds, setElementBounds] = useState(null)
  const [viewport, setViewport] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateBounds = () => {
      if (cardRef.current) {
        const bounds = cardRef.current.getBoundingClientRect()
        setElementBounds({
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height
        })
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  const hoverConfig = getResponsiveHoverConfig(elementBounds, viewport)
  const getTypeColor = () => {
    switch (type) {
      case 'project': return 'bg-blue-600'
      case 'skill': return 'bg-green-600'
      case 'experience': return 'bg-purple-600'
      case 'achievement': return 'bg-yellow-600'
      case 'contact': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'project':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'skill':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'experience':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
          </svg>
        )
      case 'achievement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'contact':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  return (
    <div 
      ref={cardRef}
      className="relative p-4 flex-none w-48 md:w-64 transition-all duration-300"
    >
      <motion.div
        className={`relative cursor-pointer group ${className}`}
        onClick={onClick}
        initial={{ scale: 1, y: 0, transform: 'translateZ(0)' }}
        whileHover={{ 
          scale: hoverConfig.scale,
          y: hoverConfig.y,
          zIndex: 50,
          transition: { 
            duration: hoverConfig.duration, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }
        }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ 
          transformOrigin: hoverConfig.transformOrigin,
          backfaceVisibility: "hidden",
          willChange: "transform"
        }}
      >
      {/* Enhanced Card Container */}
      <div className="bg-gray-800 rounded-lg overflow-visible shadow-xl transition-all duration-300 group-hover:bg-gray-750 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_8px_16px_-8px_rgba(220,38,38,0.3)]">
        {/* Image/Icon Section */}
        <div className={`h-32 md:h-40 ${getTypeColor()} flex items-center justify-center text-white relative transition-all duration-500 group-hover:brightness-125`}>
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110" 
            />
          ) : (
            <div className="flex flex-col items-center transition-all duration-500 group-hover:scale-125">
              {getTypeIcon()}
              <span className="text-xs uppercase tracking-wide mt-2 font-semibold">{type}</span>
            </div>
          )}
          
          {/* Multi-layered hover overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
          
          {/* Enhanced shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out delay-200" />
          
          {/* Pulsing border effect */}
          <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/60 transition-all duration-500 rounded-lg">
            <div className="absolute inset-0 border-2 border-red-400/0 group-hover:border-red-400/40 transition-all duration-700 delay-100 rounded-lg animate-pulse" />
          </div>
        </div>
        
        {/* Enhanced Content Section */}
        <motion.div 
          className="p-4 transition-all duration-300 group-hover:bg-gray-700/50 relative"
          initial={{ height: "auto" }}
          whileHover={{ height: "auto" }}
        >
          <motion.h3 
            className="text-white font-bold text-sm md:text-base line-clamp-2 mb-2 transition-all duration-300 group-hover:text-red-200 group-hover:text-lg"
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
          
          {subtitle && (
            <motion.p 
              className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-3 transition-all duration-300 group-hover:text-gray-200"
              initial={{ opacity: 0.8, y: 0 }}
              whileHover={{ opacity: 1, y: -1 }}
              transition={{ delay: 0.15 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Enhanced action buttons on hover */}
          <motion.div 
            className="opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-4 group-hover:translate-y-0 space-y-2"
            initial={{ height: 0 }}
            whileHover={{ height: "auto" }}
            transition={{ delay: 0.2 }}
          >
            {/* Primary action */}
            <motion.button
              className="w-full flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-md transition-all duration-200 transform hover:scale-105"
              whileHover={{ 
                backgroundColor: "#dc2626",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)"
              }}
              transition={{ delay: 0.25 }}
            >
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              View Details
            </motion.button>
            
            {/* Secondary actions */}
            <motion.div 
              className="flex gap-1"
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="flex-1 flex items-center justify-center p-1.5 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white rounded transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
              <motion.button
                className="flex-1 flex items-center justify-center p-1.5 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white rounded transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>
              <motion.button
                className="flex-1 flex items-center justify-center p-1.5 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white rounded transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Progress indicator for hover state */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 w-0 group-hover:w-full transition-all duration-500 delay-300"
          />
        </motion.div>
      </div>
      
      {/* Background blur effect for neighboring cards */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg transform scale-150" />
      </div>
      </motion.div>
    </div>
  )
}