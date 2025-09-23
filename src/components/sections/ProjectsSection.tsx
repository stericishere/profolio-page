'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { projectsData } from '@/data/portfolioData';
import type { PortfolioItem } from '@/data/portfolioData';


function ProjectCard({ project, index }: { project: PortfolioItem; index: number }) {
  const category = project.category || 'All';
  const projectPath = `/projects/${project.id}`;

  const handleCardClick = () => {
    window.location.href = projectPath;
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.github, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        borderColor: 'rgba(239, 68, 68, 0.5)',
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden hover:border-red-600/30 transition-all duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Project Image or Fallback gradient background */}
        {project.projectImg ? (
          <Image
            src={`/assets/projects/${project.projectImg}`}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'block';
              }
            }}
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20"
          style={{ display: project.projectImg ? 'none' : 'block' }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.span
            className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0 }}
          >
            {category}
          </motion.span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            className="text-white text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm font-medium">Read Details</span>
          </motion.div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors"
          whileHover={{ x: 5 }}
          transition={{ duration: 0 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {project.subtitle || project.description}
        </p>

        {/* Description */}
        {project.description && project.subtitle && (
          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-700 group-hover:border-red-600/20 transition-colors"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              transition={{ duration: 0 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons - now prevent event bubbling to avoid link conflicts */}
        <div className="flex gap-3">
          {project.github && (
            <motion.button
              onClick={handleGithubClick}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors z-10 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Repository
            </motion.button>
          )}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Read More
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Full Stack' | 'AI/ML' | 'Research'>('All');

  const categories: ('All' | 'Full Stack' | 'AI/ML' | 'Research')[] = ['All', 'Full Stack', 'AI/ML', 'Research'];

  // Get all projects from projectsData
  const allProjects = projectsData.flatMap(section => section.items);

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-900 text-white" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        {/* Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest work showcasing problem-solving through technology,
            from AI research to full-stack applications with real-world impact.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-2 bg-black/50 p-2 rounded-lg border border-gray-800">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.1 }}
              transition={{ duration: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 p-8 bg-black/50 rounded-lg border border-gray-800 hover:border-red-600/30 transition-colors"
        >
          <h3 className="text-2xl font-bold mb-4">Interested in collaborating?</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Let&apos;s discuss how I can help solve your technical challenges and drive measurable outcomes.
          </p>
          <motion.button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}