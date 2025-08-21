'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { LazySkillSection } from '@/components/ui/LazySkillSection'
import { useDataPreload } from '@/contexts/DataPreloadContext'
import type { PortfolioSection } from '@/data/portfolioData'

interface SectionVisibilityState {
  [sectionId: string]: boolean
}

export default function SkillsPage() {
  const { preloadedData, isDataReady, preloadError, retryPreload } = useDataPreload()
  const [skillsData, setSkillsData] = useState<PortfolioSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [loadedSections, setLoadedSections] = useState<SectionVisibilityState>({})

  // Load skills data with preloading priority
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingError(null)
        console.log('🎯 Skills page: Starting data load...')
        console.log('📊 Current preloadedData state:', preloadedData)
        console.log('❓ Is skillsData ready?', isDataReady('skillsData'))
        
        if (isDataReady('skillsData') && preloadedData.skillsData) {
          // Use preloaded data for instant loading
          console.log('✅ Using preloaded skills data:', preloadedData.skillsData.length, 'sections')
          setSkillsData(preloadedData.skillsData || [])
          setIsLoading(false)
        } else {
          // Fallback: load data if not preloaded
          console.log('⏳ Fallback: Loading skills data directly...')
          const portfolioModule = await import('@/data/portfolioData')
          console.log('📦 Imported portfolio module:', Object.keys(portfolioModule))
          
          if (!portfolioModule.skillsData) {
            throw new Error('skillsData not found in portfolioData module')
          }
          
          console.log('✅ Fallback skills data loaded:', portfolioModule.skillsData.length, 'sections')
          setSkillsData(portfolioModule.skillsData)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('❌ Skills data loading failed:', error)
        setLoadingError(error instanceof Error ? error.message : 'Failed to load skills data')
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [preloadedData, isDataReady])

  // Load first section immediately for better initial experience
  useEffect(() => {
    if (skillsData.length > 0) {
      setLoadedSections({ [skillsData[0].id]: true })
    }
  }, [skillsData])

  const handleSectionLoad = useCallback((sectionId: string) => {
    setLoadedSections(prev => ({
      ...prev,
      [sectionId]: true
    }))
  }, [])

  // Show error state if loading failed
  if (loadingError) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SimpleNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-400 mb-2">Loading Error</h2>
            <p className="text-gray-400 mb-4">{loadingError}</p>
            {preloadError && (
              <p className="text-sm text-gray-500 mb-4">Preload Error: {preloadError}</p>
            )}
            <button
              onClick={() => {
                setLoadingError(null)
                setIsLoading(true)
                if (preloadError) {
                  retryPreload()
                } else {
                  // Retry local loading
                  window.location.reload()
                }
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SimpleNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading skills...</p>
            <p className="text-xs text-gray-500 mt-2">
              {preloadError ? 'Using fallback loading...' : 'Checking preloaded data...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Technical Skills
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across AI/ML, programming languages, 
            cloud platforms, and development tools.
          </p>
        </div>
      </motion.div>

      {/* Skills Sections */}
      <div className="pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {skillsData.map((section, sectionIndex) => (
            <LazySkillSection
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
              isLoaded={loadedSections[section.id] || false}
              onLoad={handleSectionLoad}
            />
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Certifications & Credentials
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-lg border border-orange-500/20 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AWS</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-400 mb-2">AWS ML Engineer-Associate</h3>
              <p className="text-gray-400">Machine learning on AWS platform</p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-lg border border-red-500/20 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">OCI</span>
              </div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">Oracle Cloud Foundations</h3>
              <p className="text-gray-400">Oracle Cloud Infrastructure basics</p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg border border-blue-500/20 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">GCP</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Google Cloud Essentials</h3>
              <p className="text-gray-400">Google Cloud Platform fundamentals</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Let&apos;s discuss how my technical skills can contribute to your next AI/ML project.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </motion.div>

    </div>
  )
}