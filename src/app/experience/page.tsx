'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { useDataPreload } from '@/contexts/DataPreloadContext'
import type { PortfolioSection } from '@/data/portfolioData'

export default function ExperiencePage() {
  const { preloadedData, isDataReady } = useDataPreload()
  const [experienceData, setExperienceData] = useState<PortfolioSection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (isDataReady('experienceData')) {
        // Use preloaded data for instant loading
        console.log('✅ Using preloaded experience data')
        setExperienceData(preloadedData.experienceData || [])
        setIsLoading(false)
      } else {
        // Fallback: load data if not preloaded
        console.log('⏳ Fallback: Loading experience data...')
        const { experienceData: fallbackData } = await import('@/data/portfolioData')
        setExperienceData(fallbackData)
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
            <p className="text-gray-400">Loading experience...</p>
          </div>
        </div>
      </div>
    )
  }

  // Sort experience by date (most recent first)
  const allExperience = experienceData.flatMap(section => section.items).sort((a, b) => {
    // Parses the date string (e.g., "May 2025 – Aug 2025", "Aug 2025 – Present")
    // and returns a Date object for sorting.
    const getDate = (dateString: string): Date => {
      // Check for "Present" and use the current date to sort it as most recent
      if (dateString.includes('Present')) {
        return new Date();
      }

      // Extract the end date from a range "Start Date – End Date"
      const parts = dateString.split('–');
      const endDateString = parts[parts.length - 1].trim();

      // Create a date object from the end date string (e.g., "Aug 2025")
      const date = new Date(endDateString);
      
      // If parsing fails, return an old date to sort it last
      return isNaN(date.getTime()) ? new Date(0) : date;
    };

    // We use a non-null assertion (!) because we are sure `date` exists on these items.
    const dateA = getDate(a.date!);
    const dateB = getDate(b.date!);

    // Sort by most recent date first
    return dateB.getTime() - dateA.getTime();
  });

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
            Professional Journey
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A timeline of my professional growth, showcasing the progression of skills, responsibilities, 
            and impact I&apos;ve made across various organizations and technologies.
          </p>
        </div>
      </motion.div>

      {/* Timeline Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-lg border border-green-500/20"
            >
              <div className="text-3xl font-bold text-green-400 mb-2">3+</div>
              <div className="text-gray-300">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg border border-blue-500/20"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
              <div className="text-gray-300">Companies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-lg border border-purple-500/20"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
              <div className="text-gray-300">Projects Delivered</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Career Timeline</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-blue-600"></div>
            
            {allExperience.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 , duration: 0.6 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-black z-10"></div>
                
                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-20 md:ml-0`}>
                  <motion.div
                    className="bg-gray-900/80 border border-gray-800 rounded-lg p-6 hover:border-green-600/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Company & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="text-green-400 font-semibold text-lg">
                        {experience.subtitle}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {experience.date}
                      </div>
                    </div>
                    
                    {/* Position */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {experience.title}
                    </h3>
                    
                    {/* Description */}
                    <ul className="list-disc list-inside text-gray-300 mb-4 leading-relaxed space-y-2">
                      {(experience.description || '').split('\n•').map((point, index) => (
                        point.trim() && <li key={index}>{point.trim()}</li>
                      ))}
                    </ul>
                    
                    {/* Technologies */}
                    {experience.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm border border-green-600/30 hover:bg-green-600/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Action Indicators */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Full-time</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>On site</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800 bg-gradient-to-r from-gray-900/50 to-gray-800/30"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Core Technologies & Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Python', 'GraphQL', 'Kubernetes', 'MongoDB', 'Redis'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gray-300 font-medium group-hover:text-green-400 transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Add Value to Your Team?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Let&apos;s discuss how my experience and skills can contribute to your next project.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s Connect
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}