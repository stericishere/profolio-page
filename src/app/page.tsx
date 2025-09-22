'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { NetflixOpening } from '@/components/animations/NetflixOpening'
import { WhosWatching, type Persona } from '@/components/sections/WhosWatching'
import { HorizontalSection } from '@/components/sections/HorizontalSection'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { useDataPreload } from '@/contexts/DataPreloadContext'
import type { PortfolioSection } from '@/data/portfolioData'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'

// Typewriter effect hook
function useTypewriter(words: string[], speed: 100) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [displayedText, currentWordIndex, isDeleting, words, speed])

  return displayedText
}

type AppState = 'opening' | 'persona-selection' | 'portfolio'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('opening')
  const [isClient, setIsClient] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const { preloadedData, isDataReady } = useDataPreload()
  const [portfolioData, setPortfolioData] = useState<{
    projectsData: PortfolioSection[]
    experienceData: PortfolioSection[]
    contactData: PortfolioSection[]
    topPicksData: PortfolioSection[]
  }>({
    projectsData: [],
    experienceData: [],
    contactData: [],
    topPicksData: []
  })

  // Check session storage and restore previous state on client side
  useEffect(() => {
    setIsClient(true)
    
    // Check session storage for previous state
    const hasSeenOpening = sessionStorage.getItem('netflix-opening-seen') === 'true'
    const savedPersonaData = sessionStorage.getItem('selected-persona')
    const portfolioReady = sessionStorage.getItem('portfolio-ready') === 'true'
    
    if (portfolioReady && savedPersonaData) {
      // User has completed full onboarding - restore portfolio state
      try {
        const parsedPersona = JSON.parse(savedPersonaData)
        setSelectedPersona(parsedPersona)
        setAppState('portfolio')
      } catch (error) {
        console.error('Error parsing saved persona:', error)
        // Fallback to persona selection if parsing fails
        if (hasSeenOpening) {
          setAppState('persona-selection')
        }
      }
    } else if (hasSeenOpening) {
      // User has seen opening but hasn't completed onboarding
      setAppState('persona-selection')
    }
    // If neither flag is set, keep default 'opening' state
  }, [])

  // Load portfolio data when preloading completes
  useEffect(() => {
    const loadData = async () => {
      if (isDataReady('topPicksData') && isDataReady('projectsData') && 
          isDataReady('experienceData') && isDataReady('contactData')) {
        // Use preloaded data for instant rendering
        console.log('✅ Using preloaded portfolio data')
        setPortfolioData({
          projectsData: preloadedData.projectsData || [],
          experienceData: preloadedData.experienceData || [],
          contactData: preloadedData.contactData || [],
          topPicksData: preloadedData.topPicksData || []
        })
      } else if (appState === 'portfolio') {
        // Fallback: load data if user reaches portfolio before preloading completes
        console.log('⏳ Fallback: Loading portfolio data for home page...')
        const [projectsData, experienceData, contactData, topPicksData] = await Promise.all([
          import('@/data/portfolioData').then(m => m.projectsData),
          import('@/data/portfolioData').then(m => m.experienceData),
          import('@/data/portfolioData').then(m => m.contactData),
          import('@/data/portfolioData').then(m => m.topPicksData)
        ])
        setPortfolioData({ projectsData, experienceData, contactData, topPicksData })
      }
    }
    
    loadData()
  }, [preloadedData, isDataReady, appState])

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona)
    setAppState('portfolio')
    
    // Save persona selection and mark portfolio as ready
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selected-persona', JSON.stringify(persona))
      sessionStorage.setItem('portfolio-ready', 'true')
    }
  }

  const handleBackToSelection = () => {
    setAppState('persona-selection')
    // Clear portfolio ready flag when manually switching personas
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('portfolio-ready')
      sessionStorage.removeItem('selected-persona')
    }
    setSelectedPersona(null)
  }

  const jobTitles = [
    'ML Engineer',
    'AI Engineer', 
    'AI Agent Specialist'
  ]

  const typewriterText = useTypewriter(jobTitles, 100)

  // Mark opening as seen and proceed to persona selection
  const handleOpeningComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('netflix-opening-seen', 'true')
    }
    setAppState('persona-selection')
  }

  // Development utilities (for testing)
  // You can call these from browser console
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.resetNetflixOpening = () => {
        sessionStorage.removeItem('netflix-opening-seen')
        sessionStorage.removeItem('selected-persona')
        sessionStorage.removeItem('portfolio-ready')
        setSelectedPersona(null)
        setAppState('opening')
      }
      
      window.resetPersonaSelection = () => {
        sessionStorage.removeItem('selected-persona')
        sessionStorage.removeItem('portfolio-ready')
        setSelectedPersona(null)
        setAppState('persona-selection')
      }
    }
  }, [])

  // Show nothing until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Netflix Opening Animation
  if (appState === 'opening') {
    return (
      <NetflixOpening 
        customName="STERIC TSUI"
        onComplete={handleOpeningComplete}
      />
    )
  }

  // Who's Watching Persona Selection
  if (appState === 'persona-selection') {
    return (
      <WhosWatching onPersonaSelect={handlePersonaSelect} />
    )
  }

  // Get persona-specific content
  const getPersonaContent = () => {
    if (!selectedPersona) return null

    switch (selectedPersona.name) {
      case 'Recruiter':
        return {
          backgroundImage: "/assets/recruiter.gif",
          heroTitle: null, // Will use typewriter effect instead
          heroSubtitle: "UofT Student | AI Agent Development & Machine Learning",
          heroDescription: "Passionate AI researcher specializing in intelligent agentic systems, Computer Vision, and RL. Focused on building AI solutions that can understand and adapt to complex environments."
        }
      case 'Developer':
        return {
          backgroundImage: "/assets/developer.gif",
          heroTitle: "Wanna TEAM UPPPP", 
          heroSubtitle: "Passionate about building innovative solutions in a fast paced environment and iterate the product over time",
          heroDescription: "Expertise in building modern Next.js Web-app, Agentic system, and RL agent. Always exploring cutting-edge frameworks for best practices."
        }
      case 'Stalker':
        return {
          backgroundImage: "/assets/stalker.gif",
          heroTitle: "The Person Behind the Code",
          heroSubtitle: "More than just a developer",
          heroDescription: "Coffee enthusiast, weekend sleeper, and problem solver. Believes in building meaningful connections through meaningful conv and continuous learning."
        }
      case 'Adventurer':
        return {
          backgroundImage: "/assets/adven.gif",
          heroTitle: "JUST LOVE ADENTURERR",
          heroSubtitle: "Turning ideas into reality",
          heroDescription: "I just love building cool stuff that bring impact to real-life and something fun that I can look back to"
        }
      default:
        return {
          backgroundImage: null,
          heroTitle: "Full-Stack Developer",
          heroSubtitle: "Building the future, one line at a time",
          heroDescription: "Passionate developer with expertise across the entire technology stack."
        }
    }
  }

  const personaContent = getPersonaContent()

  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar selectedPersona={selectedPersona} onBackToSelection={handleBackToSelection} />
      
      {/* Hero Section with Persona Background - Netflix Style */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Persona-specific Background */}
        <div className="absolute inset-0">
          {personaContent?.backgroundImage ? (
            <div className="relative w-full h-full">
              <img 
                src={personaContent.backgroundImage} 
                alt={`${selectedPersona?.name} background`}
                className="w-full h-full object-contain"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-red-500/20" />
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
          )}
        </div>

        {/* Content overlay - Netflix style left alignment on desktop, centered on mobile */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="w-full px-4 sm:px-8 md:px-16 lg:px-36 pr-4 sm:pr-8 max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto md:mx-0">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-white text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Steric Tsui
              </motion.h1>
              
              <motion.div 
                className="text-2xl md:text-3xl text-white mb-6 font-black text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span>{personaContent?.heroTitle || typewriterText}</span>
                {(!personaContent?.heroTitle) && <span className="animate-pulse ml-1">|</span>}
              </motion.div>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {personaContent?.heroDescription || "Passionate developer with 5+ years of experience building scalable web applications. Specializing in React, Node.js, and cloud architecture."}
              </motion.p>
              
              <motion.div
                className="flex gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-md font-bold hover:bg-gray-200 transition-colors min-h-[48px]"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  View my Resume
                </motion.a>
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 bg-gray-600/70 text-white rounded-md font-bold hover:bg-gray-500/70 transition-colors min-h-[48px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Top Picks Section - Preserve Netflix GIF Style */}
      {selectedPersona && (
        <div id="top-picks">
          {portfolioData.topPicksData
            .filter(section => section.id === `top-picks-${selectedPersona.name.toLowerCase()}`)
            .map((section) => (
              <HorizontalSection
                key={section.id}
                section={section}
                index={0}
                maxItems={3}
                seeAllLink="/projects"
              />
            ))
          }
        </div>
      )}

      {/* About Me Section - New Clean Design */}
      <AboutSection />

      {/* Skills Section - New Clean Design */}
      <SkillsSection />

      {/* Experience Section - New Clean Design */}
      <ExperienceSection />

      {/* Projects Section - New Clean Design */}
      <ProjectsSection />

      {/* Contact Section - New Clean Design */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <p>&copy; 2024 Steric Tsui. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}