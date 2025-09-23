'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

interface SimpleNavbarProps {
  selectedPersona?: {
    name: string
    backgroundColor: string
  } | null
  onBackToSelection?: () => void
}

export function SimpleNavbar({ selectedPersona, onBackToSelection }: SimpleNavbarProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'Home', href: '/', isRoute: false, isHome: true },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Skills', href: '#skills', isRoute: false },
    { name: 'Experience', href: '#experience', isRoute: false },
    { name: 'Projects', href: '#projects', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ]

  const handleNavigation = (item: { name: string; href: string; isRoute?: boolean; isHome?: boolean }) => {
    if (item.isRoute) {
      // For route navigation, we'll use Next.js routing
      return
    }
    // For scroll navigation (when on home page)
    if (item.href === '#home' || item.href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const sectionId = item.href.replace('#', '').replace('/', '')
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleMobileNavigation = (item: { name: string; href: string; isRoute?: boolean; isHome?: boolean }) => {
    handleNavigation(item)
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
            onClick={() => onBackToSelection && onBackToSelection()}
          >
            STERIC
          </motion.div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ) : (
                <motion.button
                  key={item.name}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleNavigation(item)}
                >
                  {item.name}
                </motion.button>
              )
            ))}
          </div>
        </div>
        
        {/* Right side - Persona info or simple branding */}
        <div className="flex items-center space-x-4">
          {selectedPersona ? (
            <div className="hidden sm:flex items-center space-x-3">
              {/* Social Media Buttons - positioned to the left of Hello text */}
              <div className="flex items-center space-x-1.5">
                {/* LinkedIn Button */}
                <motion.a
                  href="https://linkedin.com/in/steric-tsui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full border border-white/50 bg-white/10 flex items-center justify-center text-white hover:text-black transition-all duration-300 ease-in-out overflow-hidden group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0 }}
                >
                  <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                {/* GitHub Button */}
                <motion.a
                  href="https://github.com/steric-tsui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full border border-white/50 bg-white/10 flex items-center justify-center text-white hover:text-black transition-all duration-300 ease-in-out overflow-hidden group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0 }}
                >
                  <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </motion.a>
              </div>

              <span className="text-sm text-gray-300">Hello, {selectedPersona.name}</span>
              <button
                onClick={onBackToSelection}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Switch User
              </button>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${selectedPersona.backgroundColor}`}>
                {selectedPersona.name.charAt(0)}
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-300">Portfolio</span>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
            </div>
          )}
          
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
                {selectedPersona && (
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
                        boxShadow: `0 0 20px rgba(255,255,255,0.3)`,
                      }}
                    >
                      {selectedPersona.name.charAt(0)}
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold">Hello, {selectedPersona.name}</h3>
                      <p className="text-gray-400 text-sm">Viewing personalized content</p>
                    </div>
                  </motion.div>
                )}
                
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    item.isRoute ? (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1}}
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                          <span className="font-medium">{item.name}</span>
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.button
                        key={item.name}
                        className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => handleMobileNavigation(item)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1}}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                        <span className="font-medium">{item.name}</span>
                      </motion.button>
                    )
                  ))}
                </div>

                {/* Additional Actions */}
                {selectedPersona && onBackToSelection && (
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
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}