'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { type Persona } from '@/components/sections/WhosWatching'

interface NetflixNavbarProps {
  selectedPersona: Persona
  onBackToSelection: () => void
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function NetflixNavbar({ selectedPersona, onBackToSelection, activeSection = 'Home', onSectionChange }: NetflixNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = ['Home', 'Projects', 'Experience', 'Skills', 'Contact']
  
  const handleMobileItemClick = (item: string) => {
    onSectionChange?.(item)
    setIsMobileMenuOpen(false)
  }
  
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
            className="md:hidden text-white relative z-60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {!isMobileMenuOpen ? (
                <motion.svg 
                  key="menu"
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="close"
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black shadow-2xl z-50 md:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="pt-20 pb-8 px-6">
                {/* User Profile Section */}
                <motion.div 
                  className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${selectedPersona.backgroundColor}`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 20px ${selectedPersona.color}`,
                    }}
                  >
                    {selectedPersona.name.charAt(0)}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold">Hello, {selectedPersona.name}</h3>
                    <p className="text-gray-400 text-sm">Viewing personalized content</p>
                  </div>
                </motion.div>
                
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        activeSection === item 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                      onClick={() => handleMobileItemClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        activeSection === item ? 'bg-white' : 'bg-gray-600'
                      }`} />
                      <span className="font-medium">{item}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Additional Actions */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-700 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 flex items-center space-x-3"
                    onClick={() => {
                      onBackToSelection()
                      setIsMobileMenuOpen(false)
                    }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Switch Profile</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}