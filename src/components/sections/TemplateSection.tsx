'use client'

import { motion } from 'framer-motion'
import { TemplateCard } from '@/components/ui/TemplateCard'
import { type PortfolioSection } from '@/data/portfolioData'

interface TemplateSectionProps {
  section: PortfolioSection
  index?: number
}

export function TemplateSection({ section, index = 0 }: TemplateSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="mb-16"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
          className="text-3xl font-bold text-white mb-8"
        >
          {section.title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item, itemIndex) => (
            <TemplateCard
              key={item.id}
              item={item}
              index={itemIndex}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}