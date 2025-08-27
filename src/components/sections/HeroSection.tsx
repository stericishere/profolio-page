'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { type Persona } from '@/components/sections/WhosWatching'

interface HeroSectionProps {
  selectedPersona: Persona
}

export function HeroSection({ selectedPersona }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // Simple Netflix-style hero without redundant persona content
  const content = {
    title: `Welcome, ${selectedPersona.name}`,
    subtitle: "Your Personalized Netflix Experience",
    description: "Discover curated content tailored just for you",
    featured: "Featured Content",
    cta: "Explore Content",
    backgroundImage: selectedPersona.name === 'Recruiter' ? "/assets/recruiter.gif" :
                     selectedPersona.name === 'Developer' ? "/assets/developer.gif" :
                     selectedPersona.name === 'Stalker' ? "/assets/stalker.gif" :
                     selectedPersona.name === 'Adventurer' ? "/assets/adven.gif" : null,
    skills: ["AI", "ML", "Development", "Innovation"]
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {content.backgroundImage ? (
          <div className="relative w-full h-[120%]">
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            
            <img 
              src={content.backgroundImage} 
              alt={`${selectedPersona.name} background`}
              className="w-full h-full object-cover filter brightness-75"
            />
            
            {/* Animated particles overlay */}
            <div className="absolute inset-0 z-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, -100], 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2 
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-[120%] bg-gradient-to-br from-gray-900 via-black to-red-900/20">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Bottom fade gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-30 h-32"
        style={{
          background: `linear-gradient(to bottom, transparent, black)`
        }}
      />
      
      {/* Enhanced Content */}
      <motion.div 
        className="relative z-40 min-h-screen flex items-center"
        style={{ opacity }}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20">
          <div className="max-w-4xl">
            {/* Enhanced Featured badge */}
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider shadow-lg">
                  {content.featured}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full opacity-50 blur-sm"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Enhanced Title with Typewriter Effect */}
            <motion.div
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {content.title}
                </span>
              </h1>
            </motion.div>
            
            {/* Enhanced Subtitle */}
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-8 font-light max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {content.subtitle}
            </motion.h2>
            
            {/* Skills Tags */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {content.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {content.description}
            </motion.p>
            
            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.button
                className="relative overflow-hidden group flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-black font-bold rounded-lg shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 z-10 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="z-10 group-hover:text-white transition-colors text-sm sm:text-base">{content.cta}</span>
              </motion.button>
              
              <motion.button
                className="relative overflow-hidden group flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 border-2 border-white/30 text-white font-bold rounded-lg backdrop-blur-sm"
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.8)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="z-10 text-sm sm:text-base">More Info</span>
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                  animate={{ scaleY: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}