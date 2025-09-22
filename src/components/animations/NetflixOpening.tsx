'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDataPreload } from '@/contexts/DataPreloadContext'

interface NetflixOpeningProps {
  customName?: string
  onComplete?: () => void
}

export function NetflixOpening({ 
  customName = 'STERIC',
  onComplete 
}: NetflixOpeningProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [isScalingUp, setIsScalingUp] = useState(false)
  const { preloadAllData } = useDataPreload()

  const startSequence = () => {
    setHasStarted(true)
    
    // 🚀 Start background data preloading immediately
    console.log('🎬 Netflix animation started - beginning data preload...')
    preloadAllData()
    
    // Play audio with user gesture
    const audio = new Audio('/assets/audio/nouveau-jingle-netflix.mp3')
    audio.volume = 0.8
    
    audio.play().then(() => {
      console.log('Audio playing successfully')
    }).catch(error => {
      console.log('Audio play failed:', error)
    })

    // Start scale up animation before completing
    setTimeout(() => {
      setIsScalingUp(true)
    }, 3000) // Start scaling at 3 seconds

    // Complete sequence
    setTimeout(() => {
      setIsVisible(false)
      audio.pause()
      if (onComplete) {
        setTimeout(onComplete, 300)
      }
    }, 3800) // Complete at 3.8 seconds
  }

  if (!isVisible) return null

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <motion.button
          onClick={startSequence}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Welcome to my portfoilo! Click to start...
        </motion.button>
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 1.1 }}
      animate={{ 
        opacity: isScalingUp ? 0 : 1, // fade in from 0 to 1, fade out when scaling
        y: 0, 
        scale: isScalingUp ? 10 : 1 
      }}
      transition={{
        opacity: { duration: 1.2, ease: "easeOut" }, // smooth fade
        scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1, ease: "easeOut" }
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      {/* Main text with bottom arch */}
<motion.div
  className="flex items-start justify-center"
  style={{ alignItems: 'flex-start' }}
  initial={{ opacity: 0, scale: 0.8, y: 20 }} // start invisible & small
  animate={{
    opacity: isScalingUp ? 0 : 1, // fade out if scaling up
    scale: isScalingUp ? 10 : 1,
    y: 0
  }}
  transition={{
    opacity: { duration: 1.2, ease: "easeOut" },
    scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    y: { duration: 1, ease: "easeOut" }
  }}
>
  {customName.split('').map((char, index) => {
    if (char === ' ') return <span key={index} style={{ width: '0.3em' }}></span>
    
    const totalChars = customName.length
    const middle = (totalChars - 1) / 2
    let distanceFromCenter = Math.abs(index - middle)
    if (index === 4 || index === 5) distanceFromCenter = 2
    
    const stepSize = 0.05
    const baseScale = 0.525
    const scale = baseScale + (distanceFromCenter * stepSize)
    
    return (
      <motion.span
        key={index}
        className="text-3xl md:text-5xl lg:text-7xl font-bold text-red-600 font-sans inline-block"
        style={{
          textShadow: '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          marginLeft: '-0.05em',
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'top center',
          verticalAlign: 'top'
        }}
        initial={{ opacity: 0, scaleY: 0.5 }} // start squished & invisible
        animate={{ opacity: 1, scaleY: scale }} // fade in + stretch
        transition={{ 
          delay: 0.3 + index * 0.05, // stagger
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        {char}
      </motion.span>
    )
  })}
</motion.div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%', skewX: -20 }}
        animate={{ 
          x: '200%',
          transition: {
            delay: 1.5,
            duration: 1,
            ease: "easeInOut"
          }
        }}
        style={{
          width: '200px',
          height: '100%',
          transformOrigin: 'center'
        }}
      />
    </motion.div>
  )
}