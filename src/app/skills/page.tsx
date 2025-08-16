'use client'

import { motion } from 'framer-motion'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { TemplateSection } from '@/components/sections/TemplateSection'
import { skillsData } from '@/data/portfolioData'

export default function SkillsPage() {
  const skillCategories = [
    {
      name: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Frontend',
      skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'],
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Database',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Tools',
      skills: ['Git', 'VS Code', 'Figma', 'Postman', 'Datadog'],
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const proficiencyLevels = [
    { name: 'Expert', percentage: 30, color: 'bg-green-500' },
    { name: 'Advanced', percentage: 40, color: 'bg-blue-500' },
    { name: 'Intermediate', percentage: 25, color: 'bg-yellow-500' },
    { name: 'Learning', percentage: 5, color: 'bg-gray-500' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise, from frontend frameworks 
            to cloud infrastructure, built through years of hands-on experience.
          </p>
        </div>
      </motion.div>

      {/* Skills Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Proficiency</h2>
            <p className="text-gray-400">Skill distribution across different proficiency levels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {proficiencyLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div className={`w-16 h-16 ${level.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{level.percentage}%</span>
                </div>
                <div className="text-white font-semibold mb-1">{level.name}</div>
                <div className="text-gray-400 text-sm">Proficiency Level</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills by Category */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="py-16 px-8 bg-gradient-to-r from-gray-900/30 to-gray-800/20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Skills by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + categoryIndex * 0.1, duration: 0.5 }}
                className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className={`text-2xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detailed Skills Sections */}
      <div className="pb-20">
        {skillsData.map((section, index) => (
          <TemplateSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      {/* Learning & Certifications */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Continuous Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg border border-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Currently Learning</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Machine Learning & AI Integration</li>
                <li>• WebAssembly for High-Performance Web Apps</li>
                <li>• Rust for Systems Programming</li>
                <li>• Advanced Kubernetes Orchestration</li>
              </ul>
            </div>
            <div className="p-8 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-lg border border-purple-500/20">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Certifications</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• AWS Certified Solutions Architect</li>
                <li>• Google Cloud Professional Developer</li>
                <li>• MongoDB Certified Developer</li>
                <li>• Kubernetes Application Developer (CKAD)</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Let&apos;s Build Something Amazing Together
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Ready to leverage my skills for your next project? Let&apos;s discuss how we can create something extraordinary.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Conversation
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}