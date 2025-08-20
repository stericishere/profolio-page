'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TemplateCard } from '@/components/ui/TemplateCard'
import type { PortfolioSection } from '@/data/portfolioData'

interface HorizontalSectionProps {
  section: PortfolioSection
  index: number
  maxItems?: number
  seeAllLink?: string
}

export function HorizontalSection({ 
  section, 
  index, 
  maxItems = 3,
  seeAllLink 
}: HorizontalSectionProps) {
  const displayItems = section.items.slice(0, maxItems)
  const hasMoreItems = section.items.length > maxItems

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="py-10 pl-10 pr-8 border-t border-gray-800/50"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {section.title}
          </motion.h2>
          
          {hasMoreItems && seeAllLink && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
            >
              <Link href={seeAllLink}>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors group">
                  <span className="text-sm font-medium">See All</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide" style={{ overflowY: 'visible' }}>
            <div className="flex gap-6 pb-4 px-4 py-8">
              {displayItems.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5 + itemIndex * 0.1, 
                    duration: 0.6 
                  }}
                  className="flex-shrink-0 w-80 md:w-96"
                >
                  <TemplateCard 
                    item={item} 
                    isInRow={true}
                    linkTo={section.title.toLowerCase().includes('project') ? `/projects/${item.id}` : undefined}
                  />
                </motion.div>
              ))}
              
              {/* Show more items indicator */}
              {hasMoreItems && seeAllLink && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5 + displayItems.length * 0.1, 
                    duration: 0.6 
                  }}
                  className="flex-shrink-0 w-80 md:w-96 p-2"
                >
                  <Link href={seeAllLink}>
                    <div className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700 rounded-lg p-8 hover:border-red-600/30 transition-all duration-300 cursor-pointer group flex items-center justify-center hover:scale-105">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                          <svg 
                            className="w-8 h-8 text-red-400 group-hover:text-red-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                          View All {section.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Explore {section.items.length - maxItems} more {section.title.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}