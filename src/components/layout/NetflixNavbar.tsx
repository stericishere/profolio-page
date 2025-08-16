'use client'

import { motion } from 'framer-motion'
import { type Persona } from '@/components/sections/WhosWatching'

interface NetflixNavbarProps {
  selectedPersona: Persona
  onBackToSelection: () => void
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function NetflixNavbar({ selectedPersona, onBackToSelection, activeSection = 'Home', onSectionChange }: NetflixNavbarProps) {
  
  const navItems = ['Home', 'Projects', 'Experience', 'Skills', 'Contact']
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-8">
          <motion.div 
            className="text-red-600 text-2xl font-bold tracking-wider cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={onBackToSelection}
          >
            STERIC
          </motion.div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === item ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => onSectionChange?.(item)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="h-0.5 bg-red-600 mt-1"
                    layoutId="navbar-indicator"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Hover underline for non-active items */}
                {activeSection !== item && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-white/50"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Right side - User Profile */}
        <div className="flex items-center space-x-4">
          <motion.div 
            className="hidden sm:flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={onBackToSelection}
          >
            <motion.span 
              className="text-sm text-gray-300"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              Hello, {selectedPersona.name}
            </motion.span>
            <motion.div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${selectedPersona.backgroundColor}`}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 20px ${selectedPersona.color}`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedPersona.name.charAt(0)}
            </motion.div>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}