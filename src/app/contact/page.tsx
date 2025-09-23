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
      value: 'steric.tsui@mail.utoronto.ca',
      description: 'Best for AI/ML project inquiries and research discussions',
      link: 'mailto:steric.tsui@mail.utoronto.ca',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/steric-tsui',
      description: 'Professional networking for AI/ML opportunities',
      link: 'https://linkedin.com/in/steric-tsui',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '/stericishere',
      description: 'AI/ML projects, research code, and open source contributions',
      link: 'https://github.com/stericishere',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: '🌐',
      title: 'Portfolio',
      value: 'steric-tsui.com',
      description: 'Latest AI/ML work and research project showcases',
      link: 'https://steric-tsui.com',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const availability = {
    status: 'Available',
    description: 'Open for AI/ML research opportunities and agent development projects',
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
            Ready to explore AI/ML solutions or discuss agent development? Let&apos;s connect and 
            collaborate on innovative AI projects that push the boundaries of technology.
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
                transition={{ delay: 0.7, duration: 0.5 }}
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
              Prefer to reach out directly? Send me an email with your AI/ML project details, 
              research collaboration ideas, or agent development requirements.
            </p>
            <motion.a
              href="mailto:steric.tsui@mail.utoronto.ca?subject=AI/ML Project Inquiry&body=Hi Steric,%0D%0A%0D%0AI'd like to discuss an AI/ML project or research collaboration with you.%0D%0A%0D%0AProject details:%0D%0A[Please describe your AI/ML project, research idea, or agent development needs here]%0D%0A%0D%0ABest regards"
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
                answer: "I specialize in AI/ML research projects, intelligent agent development, and machine learning applications. My focus areas include deep learning, natural language processing, computer vision, and autonomous agent systems using frameworks like TensorFlow, PyTorch, and LangChain."
              },
              {
                question: "Are you available for research collaborations?",
                answer: "Absolutely! I'm actively seeking research collaborations in AI/ML, particularly in agent systems, multi-modal learning, and applied machine learning. I'm open to both academic and industry partnerships."
              },
              {
                question: "What&apos;s your experience with AI agents?",
                answer: "As an AI agent specialist, I have extensive experience developing autonomous systems, multi-agent frameworks, and intelligent automation solutions. I'm particularly passionate about creating agents that can reason, learn, and adapt to complex environments."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
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