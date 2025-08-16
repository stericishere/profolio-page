'use client'

import { motion } from 'framer-motion'
import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { TemplateSection } from '@/components/sections/TemplateSection'
import { contactData } from '@/data/portfolioData'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'steric.tsui@example.com',
      description: 'Best for formal inquiries and detailed discussions',
      link: 'mailto:steric.tsui@example.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/sterictsui',
      description: 'Professional networking and career opportunities',
      link: 'https://linkedin.com/in/sterictsui',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '/sterictsui',
      description: 'Code collaboration and open source projects',
      link: 'https://github.com/sterictsui',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: '🌐',
      title: 'Portfolio',
      value: 'sterictsui.dev',
      description: 'Latest work and project showcases',
      link: 'https://sterictsui.dev',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const availability = {
    status: 'Available',
    description: 'Open for new opportunities and collaborations',
    responseTime: 'Within 24 hours',
    timezone: 'PST (GMT-8)'
  }

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
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let&apos;s connect and discuss how we can 
            work together to create something amazing.
          </p>
        </div>
      </motion.div>

      {/* Availability Status */}
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
              <span className="text-2xl font-semibold text-green-400">{availability.status}</span>
            </div>
            <p className="text-lg text-gray-300 mb-2">{availability.description}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <span>⏱️ Response time: {availability.responseTime}</span>
              <span>🌍 Timezone: {availability.timezone}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="py-16 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Choose Your Preferred Way to Connect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className={`text-lg bg-gradient-to-r ${method.color} bg-clip-text text-transparent font-medium mb-2`}>
                      {method.value}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {method.description}
                    </p>
                  </div>
                  <div className="text-gray-500 group-hover:text-red-400 transition-colors">
                    →
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form Alternative */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="py-16 px-8 bg-gradient-to-r from-gray-900/30 to-gray-800/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Or Send a Quick Message
          </h2>
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700/30">
            <p className="text-lg text-gray-300 mb-6">
              Prefer to reach out directly? Send me an email with your project details, 
              and I&apos;ll get back to you within 24 hours.
            </p>
            <motion.a
              href="mailto:steric.tsui@example.com?subject=Project Inquiry&body=Hi Steric,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0AProject details:%0D%0A[Please describe your project here]%0D%0A%0D%0ABest regards"
              className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Compose Email
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Contact Information Sections */}
      <div className="pb-20">
        {contactData.map((section, index) => (
          <TemplateSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="py-20 px-8 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "What&apos;s your typical response time?",
                answer: "I aim to respond to all inquiries within 24 hours during business days."
              },
              {
                question: "What type of projects do you work on?",
                answer: "I specialize in full-stack web applications, mobile apps, and cloud infrastructure projects using modern technologies like React, Next.js, Node.js, and AWS."
              },
              {
                question: "Are you available for remote work?",
                answer: "Yes, I'm completely comfortable with remote work and have experience collaborating with teams across different time zones."
              },
              {
                question: "What&apos;s your preferred project size?",
                answer: "I work on projects of all sizes, from quick fixes to long-term engagements. I'm particularly interested in challenging technical problems and innovative solutions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}