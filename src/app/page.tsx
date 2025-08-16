'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { NetflixOpening } from '@/components/animations/NetflixOpening'
import { WhosWatching, type Persona } from '@/components/sections/WhosWatching'
import { HorizontalSection } from '@/components/sections/HorizontalSection'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { projectsData, experienceData, contactData } from '@/data/portfolioData'

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
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona)
    setAppState('portfolio')
  }

  const handleBackToSelection = () => {
    setAppState('persona-selection')
  }

  const jobTitles = [
    'Full-Stack Developer',
    'React Specialist', 
    'Node.js Expert',
    'Cloud Architect',
    'Tech Lead'
  ]

  const typewriterText = useTypewriter(jobTitles, 100)

  // Netflix Opening Animation
  if (appState === 'opening') {
    return (
      <NetflixOpening 
        customName="STERIC TSUI"
        onComplete={() => setAppState('persona-selection')}
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
          heroTitle: "Senior Full-Stack Developer",
          heroSubtitle: "5+ years building scalable web applications",
          heroDescription: "Experienced developer specializing in React, Node.js, and cloud architecture. Proven track record of delivering high-quality solutions for enterprise clients."
        }
      case 'Developer':
        return {
          backgroundImage: "/assets/developer.gif",
          heroTitle: "Code Craftsman & Tech Enthusiast", 
          heroSubtitle: "Passionate about clean code and innovative solutions",
          heroDescription: "Deep expertise in modern JavaScript, TypeScript, Python, and cloud technologies. Always exploring cutting-edge frameworks and best practices."
        }
      case 'Stalker':
        return {
          backgroundImage: "/assets/stalker.webp",
          heroTitle: "The Person Behind the Code",
          heroSubtitle: "More than just a developer",
          heroDescription: "Coffee enthusiast, weekend hiker, and problem solver. Believes in building meaningful connections through technology and continuous learning."
        }
      case 'Adventurer':
        return {
          backgroundImage: "/assets/adven.gif",
          heroTitle: "Digital Explorer & Innovation Seeker",
          heroSubtitle: "Turning ideas into reality",
          heroDescription: "Entrepreneur at heart with experience in startups and side projects. Always looking for the next challenge and opportunity to create something amazing."
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

        {/* Content overlay - Netflix style left alignment */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Steric Tsui
              </motion.h1>
              
              <motion.div 
                className="text-2xl md:text-3xl text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span>{personaContent?.heroTitle || typewriterText}</span>
                {!personaContent && <span className="animate-pulse ml-1">|</span>}
              </motion.div>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {personaContent?.heroDescription || "Passionate developer with 5+ years of experience building scalable web applications. Specializing in React, Node.js, and cloud architecture."}
              </motion.p>
              
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded font-bold hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  View my Resume
                </motion.a>
                <motion.button
                  className="flex items-center gap-2 px-8 py-3 bg-gray-600/70 text-white rounded font-bold hover:bg-gray-500/70 transition-colors"
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

      {/* Projects Section */}
      <div id="projects">
        {projectsData.map((section, index) => (
          <HorizontalSection 
            key={section.id} 
            section={section} 
            index={index}
            maxItems={3}
            seeAllLink="/projects"
          />
        ))}
      </div>

      {/* Experience Section */}
      <div id="experience">
        {experienceData.map((section, index) => (
          <HorizontalSection 
            key={section.id} 
            section={section} 
            index={index + 1}
            maxItems={3}
            seeAllLink="/experience"
          />
        ))}
      </div>

      {/* Contact Section */}
      <div id="contact">
        {contactData.map((section, index) => (
          <HorizontalSection 
            key={section.id} 
            section={section} 
            index={index + 2}
            maxItems={3}
            seeAllLink="/contact"
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <p>&copy; 2024 Steric Tsui. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}