'use client'

import { motion } from 'framer-motion'
import { useDataPreload } from '@/contexts/DataPreloadContext'

export interface Persona {
  id: string
  name: string
  color: string
  backgroundColor: string
  textColor: string
  description: string
}

interface WhosWatchingProps {
  onPersonaSelect: (persona: Persona) => void
}

const personas: Persona[] = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    color: '#00D4AA',
    backgroundColor: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    description: 'Looking for talent'
  },
  {
    id: 'developer',
    name: 'Developer',
    color: '#6B7280',
    backgroundColor: 'bg-gray-500',
    textColor: 'text-gray-400',
    description: 'Technical exploration'
  },
  {
    id: 'stalker',
    name: 'Stalker',
    color: '#EF4444',
    backgroundColor: 'bg-red-500',
    textColor: 'text-red-500',
    description: 'Curious observer'
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    color: '#F59E0B',
    backgroundColor: 'bg-amber-500',
    textColor: 'text-amber-500',
    description: 'Explorer mindset'
  }
]

export function WhosWatching({ onPersonaSelect }: WhosWatchingProps) {
  const { preloadingProgress, isPreloading } = useDataPreload()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4" data-testid="whos-watching">
      {/* Title */}
      <motion.h1 
        className="text-6xl md:text-7xl font-light text-white text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Who&apos;s Watching?
      </motion.h1>

      {/* Persona Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            className="flex flex-col items-center cursor-pointer group"
            data-testid={`persona-${persona.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.6 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 }
            }}
            onClick={() => onPersonaSelect(persona)}
          >
            {/* Avatar Container */}
            <div 
              className={`
                w-32 h-32 md:w-40 md:h-40 rounded-lg ${persona.backgroundColor} 
                flex items-center justify-center mb-4 relative overflow-hidden
                transition-all duration-300 shadow-md
                group-hover:ring-4 group-hover:ring-white group-hover:shadow-lg
              `}
              style={{
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            >
              {/* Animated Pattern/Texture */}
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${persona.color}, transparent),
                              radial-gradient(circle at 70% 80%, ${persona.color}, transparent)`
                }}
              />
              
              {/* Avatar Face */}
              <div className="relative z-10 text-black">
                {/* Eyes */}
                <div className="flex gap-3 mb-2">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <div className="w-3 h-3 bg-black rounded-full" />
                </div>
                {/* Mouth */}
                <div 
                  className="w-8 h-1 bg-black rounded-full mx-auto transition-all duration-300 group-hover:scale-x-110 group-hover:translate-y-0.5"
                />
              </div>
            </div>

            {/* Persona Name */}
            <h2 
              className={`text-xl md:text-2xl font-medium text-gray-300 transition-all duration-300 group-hover:scale-110 ${
                persona.id === 'recruiter' ? 'group-hover:text-emerald-500' :
                persona.id === 'developer' ? 'group-hover:text-gray-400' :
                persona.id === 'stalker' ? 'group-hover:text-red-500' :
                'group-hover:text-amber-500'
              }`}
            >
              {persona.name}
            </h2>

            {/* Description (shows on hover) */}
            <p 
              className="text-sm text-gray-500 mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 flex items-center justify-center"
            >
              {persona.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-gray-400 text-lg mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        Choose your viewing experience
      </motion.p>

      {/* Subtle loading progress indicator */}
      {isPreloading && (
        <motion.div 
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">
                Optimizing experience... {preloadingProgress}%
              </span>
            </div>
            <div className="w-32 h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${preloadingProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}