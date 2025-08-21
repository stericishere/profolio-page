'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface PreloadedData {
  projectsData?: import('@/data/portfolioData').PortfolioSection[]
  skillsData?: import('@/data/portfolioData').PortfolioSection[]
  experienceData?: import('@/data/portfolioData').PortfolioSection[]
  contactData?: import('@/data/portfolioData').PortfolioSection[]
  topPicksData?: import('@/data/portfolioData').PortfolioSection[]
}

interface DataPreloadContextType {
  preloadedData: PreloadedData
  isDataReady: (dataType: keyof PreloadedData) => boolean
  preloadAllData: () => Promise<void>
  preloadingProgress: number
  isPreloading: boolean
  preloadError: string | null
  retryPreload: () => Promise<void>
}

const DataPreloadContext = createContext<DataPreloadContextType | undefined>(undefined)

export function DataPreloadProvider({ children }: { children: React.ReactNode }) {
  const [preloadedData, setPreloadedData] = useState<PreloadedData>({})
  const [preloadingProgress, setPreloadingProgress] = useState(0)
  const [isPreloading, setIsPreloading] = useState(false)
  const [preloadError, setPreloadError] = useState<string | null>(null)
  const router = useRouter()
  const preloadPromise = useRef<Promise<void> | null>(null)

  const isDataReady = useCallback((dataType: keyof PreloadedData) => {
    const isReady = !!preloadedData[dataType]
    console.log(`🔍 DataPreload Check: ${dataType} = ${isReady ? '✅ Ready' : '❌ Not Ready'}`)
    return isReady
  }, [preloadedData])

  const preloadAllData = useCallback(async () => {
    // Prevent multiple simultaneous preloads
    if (preloadPromise.current) {
      return preloadPromise.current
    }

    setIsPreloading(true)
    setPreloadingProgress(0)

    // Add 10 second timeout for preloading
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error('Preloading timeout after 10 seconds')), 10000)
    })

    const dataLoadingPromise = (async () => {
      try {
        setPreloadError(null)
        console.log('🚀 Starting background data preloading...')
        
        // Phase 1: Critical data (during Netflix animation - 0-4s)
        setPreloadingProgress(10)
        console.log('📦 Loading topPicksData...')
        const topPicksData = await import('@/data/portfolioData').then(m => {
          console.log('✅ topPicksData loaded:', m.topPicksData?.length, 'sections')
          if (!m.topPicksData || !Array.isArray(m.topPicksData)) {
            console.error('Invalid topPicksData structure:', m.topPicksData)
            throw new Error('topPicksData is not an array')
          }
          return m.topPicksData
        })
        setPreloadedData(prev => ({ ...prev, topPicksData }))
        
        // Prefetch routes for instant navigation
        router.prefetch('/projects')
        router.prefetch('/skills') 
        router.prefetch('/experience')
        router.prefetch('/contact')
        
        setPreloadingProgress(25)
        console.log('📦 Loading projectsData...')
        const projectsData = await import('@/data/portfolioData').then(m => {
          console.log('✅ projectsData loaded:', m.projectsData?.length, 'sections')
          if (!m.projectsData || !Array.isArray(m.projectsData)) {
            console.error('Invalid projectsData structure:', m.projectsData)
            throw new Error('projectsData is not an array')
          }
          return m.projectsData
        })
        setPreloadedData(prev => ({ ...prev, projectsData }))
        
        setPreloadingProgress(50)
        
        // Phase 2: Secondary data (during Who's Watching screen - 4-9s)
        console.log('📦 Loading skillsData...')
        const skillsData = await import('@/data/portfolioData').then(m => {
          console.log('✅ skillsData loaded:', m.skillsData?.length, 'sections')
          if (!m.skillsData || !Array.isArray(m.skillsData) || m.skillsData.length === 0) {
            console.error('Invalid skillsData structure:', m.skillsData)
            throw new Error('skillsData is empty, undefined, or not an array')
          }
          
          // Validate structure of first section
          const firstSection = m.skillsData[0]
          if (!firstSection || !firstSection.id || !firstSection.title || !Array.isArray(firstSection.items)) {
            console.error('Invalid skillsData section structure:', firstSection)
            throw new Error('skillsData sections have invalid structure')
          }
          
          console.log('✅ skillsData validation passed')
          return m.skillsData
        })
        setPreloadedData(prev => ({ ...prev, skillsData }))
        
        setPreloadingProgress(75)
        
        console.log('📦 Loading experienceData and contactData...')
        const [experienceData, contactData] = await Promise.all([
          import('@/data/portfolioData').then(m => {
            console.log('✅ experienceData loaded:', m.experienceData?.length, 'sections')
            return m.experienceData
          }),
          import('@/data/portfolioData').then(m => {
            console.log('✅ contactData loaded:', m.contactData?.length, 'sections')
            return m.contactData
          })
        ])
        
        setPreloadedData(prev => ({ 
          ...prev, 
          experienceData, 
          contactData 
        }))
        
        setPreloadingProgress(100)
        console.log('🎉 All data preloaded successfully!')
        console.log('📊 Final preloaded data:', {
          topPicksData: topPicksData?.length,
          projectsData: projectsData?.length,
          skillsData: skillsData?.length,
          experienceData: experienceData?.length,
          contactData: contactData?.length
        })
        
      } catch (error) {
        console.error('❌ Data preloading failed:', error)
        setPreloadError(error instanceof Error ? error.message : 'Unknown preloading error')
      } finally {
        setIsPreloading(false)
        preloadPromise.current = null
      }
    })()

    // Race between data loading and timeout
    preloadPromise.current = Promise.race([dataLoadingPromise, timeoutPromise])

    return preloadPromise.current
  }, [router])

  const retryPreload = useCallback(async () => {
    console.log('🔄 Retrying data preload...')
    preloadPromise.current = null
    setPreloadedData({})
    setPreloadingProgress(0)
    setPreloadError(null)
    return preloadAllData()
  }, [preloadAllData])

  const value: DataPreloadContextType = {
    preloadedData,
    isDataReady,
    preloadAllData,
    preloadingProgress,
    isPreloading,
    preloadError,
    retryPreload
  }

  return (
    <DataPreloadContext.Provider value={value}>
      {children}
    </DataPreloadContext.Provider>
  )
}

export function useDataPreload() {
  const context = useContext(DataPreloadContext)
  if (!context) {
    throw new Error('useDataPreload must be used within a DataPreloadProvider')
  }
  return context
}