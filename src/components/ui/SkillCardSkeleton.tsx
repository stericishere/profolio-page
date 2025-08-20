'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface SkillCardSkeletonProps {
  className?: string
}

export function SkillCardSkeleton({ className = "" }: SkillCardSkeletonProps) {
  return (
    <div className={`bg-gray-900/50 border border-gray-800/50 rounded-lg p-6 ${className}`}>
      {/* Icon skeleton */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>

      {/* Title skeleton */}
      <div className="flex justify-center mb-2">
        <div className="h-5 bg-gray-700/50 rounded w-20 animate-pulse"></div>
      </div>

      {/* Subtitle skeleton */}
      <div className="flex justify-center mb-3">
        <div className="h-4 bg-gray-700/30 rounded w-24 animate-pulse"></div>
      </div>

      {/* Badge skeleton */}
      <div className="flex justify-center">
        <div className="h-6 bg-gray-700/30 rounded-full w-16 animate-pulse"></div>
      </div>
    </div>
  )
}

interface SkillsSectionSkeletonProps {
  title: string
  itemCount: number
  isVisible?: boolean
}

export const SkillsSectionSkeleton = forwardRef<HTMLDivElement, SkillsSectionSkeletonProps>(
  ({ title, itemCount, isVisible = true }, ref) => {
    if (!isVisible) {
      return (
        <div ref={ref} className="mb-16 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {title}...</p>
          </div>
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Skills Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <SkillCardSkeleton />
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }
)

SkillsSectionSkeleton.displayName = 'SkillsSectionSkeleton'