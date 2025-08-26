'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { PortfolioItem } from '@/data/portfolioData'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

interface BlogPostClientProps {
  project: PortfolioItem
}

export default function BlogPostClient({ project }: BlogPostClientProps) {
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasMarkdownFile, setHasMarkdownFile] = useState(false)

  // Load markdown content for this project
  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        setIsLoading(true)
        
        // Try to fetch markdown file for this project
        // Add cache busting in development
        const cacheBuster = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : ''
        const response = await fetch(`/api/content/projects/${project.slug}${cacheBuster}`, {
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default'
        })
        
        if (response.ok) {
          const content = await response.text()
          setMarkdownContent(content)
          setHasMarkdownFile(true)
        } else {
          // Fallback to existing blog content if available
          if (project.blogContent && project.blogContent.trim().length > 0) {
            setMarkdownContent(project.blogContent)
            setHasMarkdownFile(true)
          } else {
            setHasMarkdownFile(false)
          }
        }
      } catch (error) {
        console.error('Error loading markdown content:', error)
        // Fallback to existing blog content if available
        if (project.blogContent && project.blogContent.trim().length > 0) {
          setMarkdownContent(project.blogContent)
          setHasMarkdownFile(true)
        } else {
          setHasMarkdownFile(false)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkdownContent()
  }, [project.slug, project.blogContent])

  // Check if this project has blog content to render as markdown
  const hasBlogContent = hasMarkdownFile && markdownContent.trim().length > 0
  
  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar />
      
      {/* Blog Post Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-8">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <button
                onClick={() => window.history.back()}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {project.subtitle}
            </p>
            
            {/* Tech Stack */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Blog Content */}
          <motion.article
            className="max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isLoading ? (
              /* Loading state */
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <span className="ml-3 text-gray-400">Loading content...</span>
              </div>
            ) : hasBlogContent ? (
              /* Render markdown content */
              <MarkdownRenderer content={markdownContent} />
            ) : (
              /* Standard Content */
              <>
                {/* Project Overview */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-white">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </section>
              </>
            )}

            {/* Call to Action - Always show when not loading */}
            {!isLoading && (
              <section className="text-center mt-12">
                <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-600/30 rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white">Explore This Project</h2>
                  <p className="text-gray-300 mb-6">
                    Want to see this project in action or explore the codebase?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Demo
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </section>
            )}
          </motion.article>
        </div>
      </main>
    </div>
  )
}