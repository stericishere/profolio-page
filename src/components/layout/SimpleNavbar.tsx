'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SimpleNavbarProps {
  selectedPersona?: {
    name: string
    backgroundColor: string
  } | null
  onBackToSelection?: () => void
}

export function SimpleNavbar({ selectedPersona, onBackToSelection }: SimpleNavbarProps = {}) {
  
  const navItems = [
    { name: 'Home', href: '/', isRoute: true, isHome: true },
    { name: 'Projects', href: '/projects', isRoute: true },
    { name: 'Experience', href: '/experience', isRoute: true },
    { name: 'Skills', href: '/skills', isRoute: true },
    { name: 'Contact', href: '/contact', isRoute: true }
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
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}