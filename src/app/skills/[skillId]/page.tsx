'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { skillsData, projectsData, topPicksData, PortfolioItem } from '@/data/portfolioData'
import { SkillDetailSkeleton } from '@/components/ui/SkillDetailSkeleton'
import { 
  DiPython, 
  DiJavascript1, 
  DiJava, 
  DiPostgresql, 
  DiMysql, 
  DiGit, 
  DiDocker,
  DiHtml5
} from 'react-icons/di'
import { 
  SiPytorch, 
  SiPandas, 
  SiNumpy, 
  SiScikitlearn, 
  SiGooglecloud, 
  SiJupyter, 
  SiFastapi, 
  SiStreamlit,
  SiCplusplus
} from 'react-icons/si'
import { VscAzure } from "react-icons/vsc"
import { FaAws } from "react-icons/fa"

interface SkillPageProps {
  params: Promise<{ skillId: string }>
}

export default function SkillPage({ params }: SkillPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [contentLoaded, setContentLoaded] = useState({
    skill: false,
    projects: false,
    relatedSkills: false
  })
  const [skillId, setSkillId] = useState<string>('')

  // Extract skillId from params
  useEffect(() => {
    const extractParams = async () => {
      const { skillId: id } = await params
      setSkillId(id)
    }
    extractParams()
  }, [params])

  // Find the skill by ID
  const allSkills = skillsData.flatMap(section => section.items)
  const skill = allSkills.find(s => s.id === skillId)

  if (!skill && !isLoading) {
    notFound()
  }

  useEffect(() => {
    // Simulate progressive data loading
    const loadContent = async () => {
      // Load skill data
      await new Promise(resolve => setTimeout(resolve, 300))
      setContentLoaded(prev => ({ ...prev, skill: true }))

      // Load projects
      await new Promise(resolve => setTimeout(resolve, 400))
      setContentLoaded(prev => ({ ...prev, projects: true }))

      // Load related skills
      await new Promise(resolve => setTimeout(resolve, 300))
      setContentLoaded(prev => ({ ...prev, relatedSkills: true }))

      setIsLoading(false)
    }

    if (skillId) {
      loadContent()
    }
  }, [skillId])

  // Show loading skeleton while loading
  if (isLoading && !contentLoaded.skill) {
    return (
      <>
        <SimpleNavbar />
        <SkillDetailSkeleton />
      </>
    )
  }

  // Show 404 if skill not found after loading
  if (!skill) {
    notFound()
  }

  // Get skill icon
  const getSkillIcon = (skillId: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      // Programming Languages
      'python': <DiPython className="w-16 h-16 text-yellow-400" />,
      'cpp': <SiCplusplus className="w-16 h-16 text-blue-500" />,
      'java': <DiJava className="w-16 h-16 text-orange-600" />,
      'javascript': <DiJavascript1 className="w-16 h-16 text-yellow-500" />,
      'html': <DiHtml5 className="w-16 h-16 text-orange-500" />,
      
      // ML/AI Frameworks
      'pytorch': <SiPytorch className="w-16 h-16 text-orange-500" />,
      'pandas': <SiPandas className="w-16 h-16 text-blue-400" />,
      'numpy': <SiNumpy className="w-16 h-16 text-blue-500" />,
      'scikit-learn': <SiScikitlearn className="w-16 h-16 text-orange-400" />,
      
      // Cloud & DevOps
      'gcp': <SiGooglecloud className="w-16 h-16 text-blue-500" />,
      'azure': <VscAzure className="w-16 h-16 text-blue-600" />,
      'aws': <FaAws className="w-16 h-16 text-orange-400" />,
      'docker': <DiDocker className="w-16 h-16 text-blue-500" />,
      'jupyter': <SiJupyter className="w-16 h-16 text-orange-500" />,
      
      // Databases
      'postgresql': <DiPostgresql className="w-16 h-16 text-blue-600" />,
      'mysql': <DiMysql className="w-16 h-16 text-blue-500" />,
      
      // Development Tools
      'git': <DiGit className="w-16 h-16 text-orange-600" />,
      'fastapi': <SiFastapi className="w-16 h-16 text-green-500" />,
      'streamlit': <SiStreamlit className="w-16 h-16 text-red-500" />,
      'langchain': (
        <div className="w-16 h-16 bg-green-600/20 rounded-lg flex items-center justify-center">
          <span className="text-green-400 text-2xl font-bold">LC</span>
        </div>
      ),
    }
    
    return iconMap[skillId] || (
      <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center">
        <span className="text-red-400 text-2xl font-bold">
          {skillId.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  // Get related projects
  const getRelatedProjects = (): PortfolioItem[] => {
    if (!skill.relatedProjects) return []
    
    const allProjects = [
      ...projectsData.flatMap(section => section.items),
      ...topPicksData.flatMap(section => section.items)
    ]
    
    return allProjects.filter(project => 
      skill.relatedProjects?.includes(project.id)
    )
  }

  // Get related skills
  const getRelatedSkills = (): PortfolioItem[] => {
    if (!skill.relatedSkills) return []
    
    return allSkills.filter(s => 
      skill.relatedSkills?.includes(s.id) && s.id !== skill.id
    )
  }

  const relatedProjects = getRelatedProjects()
  const relatedSkills = getRelatedSkills()

  // Get proficiency color
  const getProficiencyColor = (level?: string) => {
    switch (level) {
      case 'Expert': return 'text-green-400 bg-green-600/20 border-green-600/30'
      case 'Advanced': return 'text-blue-400 bg-blue-600/20 border-blue-600/30'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-600/20 border-yellow-600/30'
      default: return 'text-gray-400 bg-gray-600/20 border-gray-600/30'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar />
      
      {/* Skill Detail Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-8">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <Link
                href="/skills"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Skills
              </Link>
            </div>
            
            {/* Skill Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                {getSkillIcon(skill.id)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {skill.title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  {skill.subtitle}
                </p>
                
                {/* Skill Stats */}
                <div className="flex flex-wrap gap-4">
                  {skill.proficiencyLevel && (
                    <span className={`px-3 py-1 rounded-full text-sm border ${getProficiencyColor(skill.proficiencyLevel)}`}>
                      {skill.proficiencyLevel}
                    </span>
                  )}
                  {skill.yearsOfExperience && (
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm border border-purple-600/30">
                      {skill.yearsOfExperience} years experience
                    </span>
                  )}
                  {skill.certifications && skill.certifications.length > 0 && (
                    <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm border border-orange-600/30">
                      Certified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Description */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-white">About This Technology</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {skill.description}
              </p>
            </div>
          </motion.section>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Projects Using {skill.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-red-600/30 transition-all duration-300 hover:scale-105 group cursor-pointer">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {project.subtitle}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs border border-red-600/30"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs border border-gray-600/30">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Certifications */}
          {skill.certifications && skill.certifications.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Certifications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skill.certifications.map((cert, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-500/20 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">{cert}</h3>
                    <p className="text-gray-400 text-sm">Professional certification</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Related Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {relatedSkills.map((relatedSkill) => (
                  <Link key={relatedSkill.id} href={`/skills/${relatedSkill.id}`}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-red-600/30 transition-all duration-300 hover:scale-105 group cursor-pointer text-center">
                      <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        {getSkillIcon(relatedSkill.id)}
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                        {relatedSkill.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Call to Action */}
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-600/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Want to Work Together?</h2>
              <p className="text-gray-300 mb-6">
                Interested in leveraging {skill.title} for your next project? Let&apos;s discuss how my expertise can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get In Touch
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View All Projects
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}