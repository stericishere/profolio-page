'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { TemplateSection } from '@/components/sections/TemplateSection'
import { useDataPreload } from '@/contexts/DataPreloadContext'
import type { PortfolioSection } from '@/data/portfolioData'

export default function ProjectsPage() {
  const { preloadedData, isDataReady } = useDataPreload()
  const [projectsData, setProjectsData] = useState<PortfolioSection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (isDataReady('projectsData')) {
        // Use preloaded data for instant loading
        console.log('✅ Using preloaded projects data')
        setProjectsData(preloadedData.projectsData || [])
        setIsLoading(false)
      } else {
        // Fallback: load data if not preloaded
        console.log('⏳ Fallback: Loading projects data...')
        const { projectsData: fallbackData } = await import('@/data/portfolioData')
        setProjectsData(fallbackData)
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [preloadedData, isDataReady])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SimpleNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
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
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my technical expertise and creative solutions. 
            From full-stack applications to innovative mobile experiences, 
            each project represents a unique challenge and learning opportunity.
          </p>
        </div>
      </motion.div>

      {/* Projects Sections */}
      <div className="pb-20">
        {projectsData.map((section, index) => (
          <TemplateSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Interested in Working Together?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            I&apos;m always excited to take on new challenges and collaborate on innovative projects.
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