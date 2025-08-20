'use client'

import { motion } from 'framer-motion'

export function SkillDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <motion.div
        className="pt-24 pb-16 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Back button skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-700/50 rounded w-32 mb-4 animate-pulse"></div>
          </div>
          
          {/* Skill Header Skeleton */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-700/50 rounded-lg animate-pulse"></div>
            </div>
            
            <div className="flex-1">
              <div className="h-12 bg-gray-700/50 rounded w-64 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-700/30 rounded w-48 mb-4 animate-pulse"></div>
              
              {/* Stats skeleton */}
              <div className="flex flex-wrap gap-4">
                <div className="h-8 bg-gray-700/30 rounded-full w-20 animate-pulse"></div>
                <div className="h-8 bg-gray-700/30 rounded-full w-32 animate-pulse"></div>
                <div className="h-8 bg-gray-700/30 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Sections Skeleton */}
      <div className="pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Description Section Skeleton */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-8 bg-gray-700/50 rounded w-48 mb-4 animate-pulse"></div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-700/30 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-700/30 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-700/30 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </motion.section>

          {/* Projects Section Skeleton */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-8 bg-gray-700/50 rounded w-56 mb-6 animate-pulse"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          </motion.section>

          {/* Related Skills Section Skeleton */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-8 bg-gray-700/50 rounded w-48 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <RelatedSkillSkeleton key={index} />
              ))}
            </div>
          </motion.section>

          {/* Call to Action Skeleton */}
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-600/30 rounded-lg p-8">
              <div className="h-8 bg-gray-700/50 rounded w-48 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-700/30 rounded w-96 mx-auto mb-6 animate-pulse"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 bg-gray-700/30 rounded w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-700/30 rounded w-36 animate-pulse"></div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

function ProjectCardSkeleton() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
      <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-700/30 rounded w-full mb-4 animate-pulse"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-6 bg-gray-700/30 rounded w-16 animate-pulse"></div>
        <div className="h-6 bg-gray-700/30 rounded w-20 animate-pulse"></div>
        <div className="h-6 bg-gray-700/30 rounded w-18 animate-pulse"></div>
      </div>
    </div>
  )
}

function RelatedSkillSkeleton() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
      <div className="w-12 h-12 mx-auto mb-2 bg-gray-700/50 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-700/30 rounded w-16 mx-auto animate-pulse"></div>
    </div>
  )
}