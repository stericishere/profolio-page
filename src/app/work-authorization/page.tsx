'use client'

import { motion } from 'framer-motion'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import Link from 'next/link'

export default function WorkAuthorizationPage() {
  const workDetails = {
    currentStatus: 'CO-OP Work Permit Holder',
    eligibility: 'Authorized to work in Canada',
    duration: 'Valid through 2027',
    opportunities: ['CO-OP positions', 'Internships', 'Research', 'Full-time after graduation']
  }

  const benefits = [
    {
      icon: '🇨🇦',
      title: 'Canadian Work Authorization',
      description: 'Currently holding a valid CO-OP work permit, authorized to work in Canada without restrictions for eligible positions.'
    },
    {
      icon: '🎓',
      title: 'University of Toronto Student',
      description: 'Enrolled in a degree program at University of Toronto, making me eligible for CO-OP and internship opportunities.'
    },
    {
      icon: '💼',
      title: 'Open for Opportunities',
      description: 'Actively seeking CO-OP positions, internships, and part-time work in AI/ML, software development, and tech roles.'
    },
    {
      icon: '🚀',
      title: 'Ready to Start',
      description: 'Available for immediate start with flexible scheduling around academic commitments.'
    }
  ]

  const opportunityTypes = [
    {
      type: 'CO-OP Positions',
      duration: '4-16 months',
      description: 'Full-time work terms integrated with academic program',
      availability: 'Fall 2026'
    },
    {
      type: 'Research Positions',
      duration: 'Flexible',
      description: 'University research projects and industry collaborations',
      availability: 'Immediately'
    },
    {
      type: 'Summer Internships',
      duration: '4 months',
      description: 'Structured learning experiences in AI/ML and software development',
      availability: 'Flexible timing'
    },
    {
      type: 'Full-time Work after Graduted',
      duration: 'Full-time',
      description: 'New Grad Position',
      availability: '2028'
    }
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Work Authorization
          </h1>
          <div className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
            <span className="text-white">CO-OP Work Permit Holder</span>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Currently authorized to work in Canada through CO-OP work permit. 
            Actively seeking Internship, CO-OP, Research opportunities in AI/ML and software development.
          </p>
        </div>
      </motion.div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-2xl font-semibold text-green-400">{workDetails.currentStatus}</span>
            </div>
            <p className="text-lg text-gray-300 mb-2">{workDetails.eligibility}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <span>📅 Valid through: {workDetails.duration}</span>
              <span>🎯 Status: Active and eligible</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Work Authorization Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="p-6 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{benefit.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Opportunity Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="py-16 px-8 bg-gradient-to-r from-gray-900/30 to-gray-800/20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Available Opportunity Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunityTypes.map((opportunity, index) => (
              <motion.div
                key={opportunity.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {opportunity.type}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-red-400 font-medium">Duration:</span> {opportunity.duration}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-red-400 font-medium">Description:</span> {opportunity.description}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-red-400 font-medium">Availability:</span> {opportunity.availability}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Contact Me?
          </h2>
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700/30">
            <p className="text-lg text-gray-300 mb-6">
              I'm ready to contribute to your team with my AI/ML expertise and fresh perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </Link>
              <motion.a
                href="mailto:steric.tsui@mail.utoronto.ca?subject=CO-OP/Internship Opportunity&body=Hi Steric,%0D%0A%0D%0AI have a CO-OP or internship opportunity that might interest you.%0D%0A%0D%0APosition details:%0D%0A[Please describe the position, duration, and requirements here]%0D%0A%0D%0ABest regards"
                className="inline-block px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Direct Email
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legal Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="py-12 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Work authorization status current as of August 2025. 
            All information provided is accurate and verifiable upon request.
          </p>
        </div>
      </motion.div>
    </div>
  )
}