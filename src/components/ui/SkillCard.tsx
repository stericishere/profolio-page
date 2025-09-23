'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DynamicIcon } from './DynamicIcon'
import { PortfolioItem } from '@/data/portfolioData'

interface SkillCardProps {
  skill: PortfolioItem
  index: number
}

export const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: 0.05, // Reduced delay and stagger
        duration: 0.3, // Faster animation
        type: "spring",
        stiffness: 150 // Snappier animation
      }}
    >
      <Link href={`/skills/${skill.id}`}>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-6 hover:border-red-600/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/10 group cursor-pointer relative overflow-hidden">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <motion.div 
                className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <DynamicIcon skillId={skill.id} />
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white text-center mb-2 group-hover:text-red-400 transition-colors">
              {skill.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors">
              {skill.subtitle}
            </p>

            {/* Proficiency Level Badge */}
            {skill.proficiencyLevel && (
              <div className="mt-3 flex justify-center">
                <span className={`px-2 py-1 text-xs rounded-full transition-all duration-300 group-hover:scale-105 ${
                  skill.proficiencyLevel === 'Expert' ? 'bg-green-600/20 text-green-400 border border-green-600/30 group-hover:bg-green-600/30' :
                  skill.proficiencyLevel === 'Advanced' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30 group-hover:bg-blue-600/30' :
                  skill.proficiencyLevel === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 group-hover:bg-yellow-600/30' :
                  'bg-gray-600/20 text-gray-400 border border-gray-600/30 group-hover:bg-gray-600/30'
                }`}>
                  {skill.proficiencyLevel}
                </span>
              </div>
            )}

            {/* Click indicator */}
            <div className="mt-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-red-400 flex items-center gap-1">
                Click to explore
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

SkillCard.displayName = 'SkillCard'