'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingProgressProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function LoadingProgress({ steps, currentStep, className = "" }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressPercentage = (currentStep / steps.length) * 100
    setProgress(progressPercentage)
  }, [currentStep, steps.length])

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className={`w-3 h-3 rounded-full border-2 ${
                  index < currentStep
                    ? 'bg-red-500 border-red-500'
                    : index === currentStep
                    ? 'bg-red-400 border-red-400 animate-pulse'
                    : 'bg-gray-800 border-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
              <span className={`text-xs mt-1 ${
                index <= currentStep ? 'text-red-400' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Text */}
      <motion.div
        className="text-center text-sm text-gray-400"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep < steps.length ? `Loading ${steps[currentStep]}...` : 'Loading complete!'}
      </motion.div>
    </div>
  )
}

interface SkillLoadingIndicatorProps {
  isLoading: boolean
  loadedSections: Set<string>
  totalSections: number
}

export function SkillLoadingIndicator({ isLoading, loadedSections, totalSections }: SkillLoadingIndicatorProps) {
  if (!isLoading && loadedSections.size === totalSections) return null

  return (
    <motion.div
      className="fixed bottom-8 right-8 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-6 h-6 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-white font-medium">Loading Skills</div>
          <div className="text-gray-400">
            {loadedSections.size} of {totalSections} sections loaded
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-48 bg-gray-700 rounded-full h-1">
        <motion.div
          className="bg-red-500 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(loadedSections.size / totalSections) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}