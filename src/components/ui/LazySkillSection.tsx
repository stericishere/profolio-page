'use client'

import { motion } from 'framer-motion'
import { forwardRef, useEffect } from 'react'
import { PortfolioSection } from '@/data/portfolioData'
import { SkillCard } from './SkillCard'
import { SkillsSectionSkeleton } from './SkillCardSkeleton'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazySkillSectionProps {
  section: PortfolioSection
  sectionIndex: number
  isLoaded: boolean
  onLoad: (sectionId: string) => void
}

export const LazySkillSection = forwardRef<HTMLDivElement, LazySkillSectionProps>(
  ({ section, sectionIndex, isLoaded, onLoad }, ref) => {
    const { ref: intersectionRef, isVisible } = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: '100px 0px', // Start loading 100px before entering viewport
      freezeOnceVisible: true
    })

    // Trigger loading when section becomes visible
    useEffect(() => {
      if (isVisible && !isLoaded) {
        onLoad(section.id)
      }
    }, [isVisible, isLoaded, section.id, onLoad])

    // Show skeleton while not loaded
    if (!isLoaded) {
      return (
        <SkillsSectionSkeleton
          ref={(node) => {
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
            if (intersectionRef) {
              (intersectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
          }}
          title={section.title}
          itemCount={section.items.length}
          isVisible={false}
        />
      )
    }

    return (
      <motion.div
        ref={ref}
        key={section.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
        className="mb-16"
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {section.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-red-600 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {section.items.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>
      </motion.div>
    )
  }
)

LazySkillSection.displayName = 'LazySkillSection'