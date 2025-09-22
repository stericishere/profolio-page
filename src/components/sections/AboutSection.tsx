'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-20 bg-black text-white" id="about">
      <div className="max-w-7xl mx-auto px-4">
        {/* About Me Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="text-red-600 text-sm font-medium mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.div>
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            The Person Behind the Code
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Passionate AI researcher and software engineer, building the future through innovative technology.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Profile Image for Mobile */}
              <div className="lg:hidden mb-8 flex justify-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-600">
                  <Image
                    src="/assets/profile.jpg"
                    alt="Steric Tsui"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="hidden absolute inset-0 bg-gray-800 items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <svg className="w-20 h-20 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                I&apos;ve built projects ranging from AI-powered systems to modern web applications;
                focusing on turning complex ideas into usable, polished products that make a real impact.
              </motion.p>

              <motion.ul
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  />
                  <span className="text-gray-300">
                    I specialize in designing systems that are intuitive to use but robust under the hood,
                    combining clean architecture with cutting-edge technology.
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                  />
                  <span className="text-gray-300">
                    Computer Science student at University of Toronto with focus on AI and Machine Learning
                  </span>
                </motion.li>
              </motion.ul>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Right now I'm building projects at the intersection of AI and software engineering.
                Aiming to make advanced ML tools more accessible, practical, and impactful in real-world applications.
              </motion.p>

              {/* Status indicators */}
              <motion.div
                className="space-y-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-gray-300">Toronto, ON</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.div
                    className="w-4 h-4 bg-green-500 rounded-full animate-pulse flex-shrink-0"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                  <span className="text-gray-300">Available for CO-OP opportunities</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Profile Image */}
              <div className="relative w-96 h-96 mx-auto rounded-2xl overflow-hidden border-4 border-red-600/20">
                <Image
                  src="/assets/profile.jpg"
                  alt="Steric Tsui"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="hidden absolute inset-0 bg-gray-800 items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <svg className="w-32 h-32 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* University Background Image */}
              <div className="absolute -bottom-6 -right-6 w-64 h-40 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl">
                <Image
                  src="/assets/uoft.jpg"
                  alt="University of Toronto"
                  fill
                  className="object-cover opacity-80"
                  onError={(e) => {
                    // Fallback to UofT colors if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div
                  className="hidden absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-white font-bold text-lg">University of Toronto</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}