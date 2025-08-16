'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { NetflixNavbar } from '@/components/layout/NetflixNavbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ScrollableRow } from '@/components/ui/ScrollableRow'
import { ContentCard } from '@/components/ui/ContentCard'
import { type Persona } from '@/components/sections/WhosWatching'

interface NetflixDashboardProps {
  selectedPersona: Persona
  onBackToSelection: () => void
}

export function NetflixDashboard({ selectedPersona, onBackToSelection }: NetflixDashboardProps) {
  const [activeSection, setActiveSection] = useState('Home')
  
  const getPersonaContent = () => {
    const commonProjects = [
      { title: "E-commerce Platform", subtitle: "Full-stack React & Node.js application", type: "project" as const },
      { title: "Task Management App", subtitle: "React Native mobile application", type: "project" as const },
      { title: "Analytics Dashboard", subtitle: "Data visualization with D3.js", type: "project" as const },
      { title: "API Gateway Service", subtitle: "Microservices architecture", type: "project" as const },
      { title: "Real-time Chat App", subtitle: "WebSocket implementation", type: "project" as const },
    ]

    const commonSkills = [
      { title: "React & Next.js", subtitle: "Frontend development", type: "skill" as const },
      { title: "Node.js & Express", subtitle: "Backend development", type: "skill" as const },
      { title: "TypeScript", subtitle: "Type-safe programming", type: "skill" as const },
      { title: "AWS & Cloud", subtitle: "Cloud infrastructure", type: "skill" as const },
      { title: "Docker & K8s", subtitle: "Containerization", type: "skill" as const },
    ]

    const commonExperience = [
      { title: "Senior Developer", subtitle: "Tech Corp (2021-2024)", type: "experience" as const },
      { title: "Full-Stack Developer", subtitle: "StartupXYZ (2019-2021)", type: "experience" as const },
      { title: "Frontend Developer", subtitle: "WebAgency (2018-2019)", type: "experience" as const },
      { title: "Junior Developer", subtitle: "FirstJob Inc (2017-2018)", type: "experience" as const },
    ]

    switch (selectedPersona.name) {
      case 'Recruiter':
        return {
          sections: [
            { title: "Featured Projects", items: commonProjects },
            { title: "Technical Skills", items: commonSkills },
            { title: "Work Experience", items: commonExperience },
            { title: "Achievements", items: [
              { title: "AWS Certified", subtitle: "Solutions Architect", type: "achievement" as const },
              { title: "Team Lead", subtitle: "Led 5+ developers", type: "achievement" as const },
              { title: "Performance Award", subtitle: "Top performer 2023", type: "achievement" as const },
            ]},
          ]
        }
      
      case 'Developer':
        return {
          sections: [
            { title: "Open Source Projects", items: commonProjects },
            { title: "Tech Stack", items: commonSkills },
            { title: "Code Contributions", items: [
              { title: "React Library", subtitle: "1.2k stars on GitHub", type: "project" as const },
              { title: "VS Code Extension", subtitle: "50k+ downloads", type: "project" as const },
              { title: "API Documentation", subtitle: "Developer tools", type: "project" as const },
            ]},
            { title: "Learning Path", items: [
              { title: "Machine Learning", subtitle: "Python & TensorFlow", type: "skill" as const },
              { title: "Rust Programming", subtitle: "Systems programming", type: "skill" as const },
              { title: "WebAssembly", subtitle: "High-performance web", type: "skill" as const },
            ]},
          ]
        }
      
      case 'Stalker':
        return {
          sections: [
            { title: "Personal Projects", items: [
              { title: "Photography Blog", subtitle: "Travel & nature photos", type: "project" as const },
              { title: "Recipe App", subtitle: "Family recipe collection", type: "project" as const },
              { title: "Fitness Tracker", subtitle: "Personal health dashboard", type: "project" as const },
            ]},
            { title: "Hobbies & Interests", items: [
              { title: "Photography", subtitle: "Landscape & portrait", type: "skill" as const },
              { title: "Hiking", subtitle: "Weekend adventures", type: "skill" as const },
              { title: "Coffee Brewing", subtitle: "Third-wave coffee", type: "skill" as const },
            ]},
            { title: "Life Journey", items: commonExperience },
            { title: "Fun Facts", items: [
              { title: "Visited 15 Countries", subtitle: "Travel enthusiast", type: "achievement" as const },
              { title: "Marathon Runner", subtitle: "Sub 4-hour finish", type: "achievement" as const },
              { title: "Volunteer Mentor", subtitle: "Code bootcamp mentor", type: "achievement" as const },
            ]},
          ]
        }
      
      case 'Adventurer':
        return {
          sections: [
            { title: "Side Projects", items: commonProjects },
            { title: "Startup Experience", items: [
              { title: "Co-founder", subtitle: "SaaS startup (2022-2023)", type: "experience" as const },
              { title: "Technical Advisor", subtitle: "3 early-stage startups", type: "experience" as const },
              { title: "Freelance Consultant", subtitle: "20+ client projects", type: "experience" as const },
            ]},
            { title: "Innovation Skills", items: commonSkills },
            { title: "Entrepreneurial Wins", items: [
              { title: "Product Launch", subtitle: "0 to 10k users in 6 months", type: "achievement" as const },
              { title: "Revenue Growth", subtitle: "$0 to $50k MRR", type: "achievement" as const },
              { title: "Team Building", subtitle: "Hired first 10 employees", type: "achievement" as const },
            ]},
          ]
        }
      
      default:
        return {
          sections: [
            { title: "Featured Projects", items: commonProjects },
            { title: "Technical Skills", items: commonSkills },
            { title: "Work Experience", items: commonExperience },
          ]
        }
    }
  }

  const personaContent = getPersonaContent()
  
  const getFilteredContent = () => {
    const allSections = personaContent.sections
    
    switch (activeSection) {
      case 'Home':
        return allSections
      case 'Projects':
        return allSections.filter(section => 
          section.title.toLowerCase().includes('project') || 
          section.title.toLowerCase().includes('contribution') ||
          section.title.toLowerCase().includes('open source')
        )
      case 'Experience':
        return allSections.filter(section => 
          section.title.toLowerCase().includes('experience') || 
          section.title.toLowerCase().includes('work') ||
          section.title.toLowerCase().includes('career') ||
          section.title.toLowerCase().includes('journey')
        )
      case 'Skills':
        return allSections.filter(section => 
          section.title.toLowerCase().includes('skill') || 
          section.title.toLowerCase().includes('tech') ||
          section.title.toLowerCase().includes('learning') ||
          section.title.toLowerCase().includes('innovation')
        )
      case 'Contact':
        return [
          {
            title: "Get In Touch",
            items: [
              { title: "Email", subtitle: "steric.tsui@mail.utoronto.ca", type: "contact" as const },
              { title: "LinkedIn", subtitle: "linkedin.com/in/steric-tsui", type: "contact" as const },
              { title: "GitHub", subtitle: "github.com/stericishere", type: "contact" as const },
              { title: "Portfolio", subtitle: "steric-tsui.com", type: "contact" as const },
            ]
          }
        ]
      default:
        return allSections
    }
  }
  
  const filteredContent = getFilteredContent()

  return (
    <motion.div
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <NetflixNavbar 
        selectedPersona={selectedPersona} 
        onBackToSelection={onBackToSelection}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {/* Hero Section */}
      <HeroSection selectedPersona={selectedPersona} />
      
      {/* Content Sections */}
      <div className="pb-16">
        {filteredContent.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ScrollableRow title={section.title}>
              {section.items.map((item, itemIndex) => (
                <ContentCard
                  key={`${section.title}-${itemIndex}`}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  onClick={() => console.log(`Clicked: ${item.title}`)}
                />
              ))}
            </ScrollableRow>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}