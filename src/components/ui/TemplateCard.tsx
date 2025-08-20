'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { type PortfolioItem } from '@/data/portfolioData'

interface TemplateCardProps {
  item: PortfolioItem
  index?: number
  isInRow?: boolean
  linkTo?: string
}

export function TemplateCard({ item, index = 0, isInRow = false, linkTo }: TemplateCardProps) {
  const handleClick = () => {
    if (item.link) {
      if (item.link.startsWith('mailto:')) {
        window.location.href = item.link
      } else if (item.link !== '#') {
        window.open(item.link, '_blank')
      }
    }
  }

  const getCardColor = () => {
    switch (item.type) {
      case 'project':
        return 'border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-br from-blue-900/10 to-blue-800/5'
      case 'experience':
        return 'border-green-500/20 hover:border-green-500/40 bg-gradient-to-br from-green-900/10 to-green-800/5'
      case 'skill':
        return 'border-purple-500/20 hover:border-purple-500/40 bg-gradient-to-br from-purple-900/10 to-purple-800/5'
      case 'contact':
        return 'border-red-500/20 hover:border-red-500/40 bg-gradient-to-br from-red-900/10 to-red-800/5'
      default:
        return 'border-gray-500/20 hover:border-gray-500/40 bg-gradient-to-br from-gray-900/10 to-gray-800/5'
    }
  }

  const CardContent = (
    <div className="relative p-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={`relative z-0 hover:z-20 p-6 rounded-lg border ${getCardColor()} transform-gpu will-change-transform backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer group`}
        onClick={!linkTo ? handleClick : undefined}
        style={{ 
          transformOrigin: "center center",
          backfaceVisibility: "hidden"
        }}
      >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            {item.subtitle}
          </p>
          {item.description && (
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
        
        {item.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
            {item.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded-full">
                +{item.technologies.length - 4} more
              </span>
            )}
          </div>
        )}
        
        {item.link && item.link !== '#' && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              {item.link && (
                <motion.span
                  className="text-xs text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                >
                  View Project →
                </motion.span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </div>
  )

  return linkTo ? (
    <Link href={linkTo}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}