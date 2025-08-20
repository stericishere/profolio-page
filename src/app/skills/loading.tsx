'use client'

import { motion } from 'framer-motion'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { SkillsSectionSkeleton } from '@/components/ui/SkillCardSkeleton'

export default function SkillsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar />
      
      {/* Hero Section Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Title skeleton */}
          <div className="h-16 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
          
          {/* Subtitle skeleton */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="h-6 bg-gray-700/30 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-700/30 rounded w-4/5 mx-auto animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* Skills Sections Skeleton */}
      <div className="pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <SkillsSectionSkeleton title="Programming Languages" itemCount={5} />
          <SkillsSectionSkeleton title="ML/AI Frameworks" itemCount={5} />
          <SkillsSectionSkeleton title="Cloud & DevOps" itemCount={5} />
          <SkillsSectionSkeleton title="Databases" itemCount={2} />
        </div>
      </div>

      {/* Certifications Section Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-700/50 rounded w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CertificationSkeleton key={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-10 bg-gray-700/50 rounded w-64 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-700/30 rounded w-96 mx-auto mb-8 animate-pulse"></div>
          <div className="h-12 bg-red-600/20 rounded w-36 mx-auto animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  )
}

function CertificationSkeleton() {
  return (
    <div className="p-8 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-lg border border-orange-500/20 text-center">
      <div className="w-16 h-16 bg-orange-600/30 rounded-full mx-auto mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-700/50 rounded w-32 mx-auto mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-700/30 rounded w-24 mx-auto animate-pulse"></div>
    </div>
  )
}