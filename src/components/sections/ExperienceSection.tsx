'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/data/portfolioData';
import type { PortfolioItem } from '@/data/portfolioData';

function ExperienceCard({ experience, index, isLast }: { experience: PortfolioItem; index: number; isLast: boolean }) {
  const getTypeColor = (experienceType?: string) => {
    switch (experienceType) {
      case 'internship': return 'bg-blue-600';
      case 'research': return 'bg-green-600';
      case 'engineering': return 'bg-purple-600';
      case 'professional': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const extractDateFromSubtitle = (subtitle: string): string => {
    const dateMatch = subtitle.match(/([A-Za-z]+ \d{4})\s*[–-]\s*([A-Za-z]+ \d{4}|Present)/);
    return dateMatch ? `${dateMatch[1]} – ${dateMatch[2]}` : 'Present';
  };

  return (
    <div className="relative flex">
      {/* Timeline */}
      <div className="flex flex-col items-center mr-6">
        {/* Timeline Dot */}
        <motion.div
          className="w-4 h-4 bg-red-600 rounded-full border-4 border-black z-10 flex-shrink-0"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.1, type: "spring", stiffness: 300 }}
        />

        {/* Timeline Line */}
        {!isLast && (
          <motion.div
            className="w-0.5 h-full bg-gradient-to-b from-red-600 via-red-600/50 to-transparent mt-2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Experience Card */}
      <motion.article
        onClick={() => {
          if (experience.link) {
            window.open(experience.link, '_blank');
          }
        }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          borderColor: 'rgba(239, 68, 68, 0.5)'
        }}
        transition={{ duration: 0 }}
        className="flex-1 max-w-4xl bg-black/50 border border-gray-800 rounded-lg p-6 hover:border-red-600/30 transition-all duration-300 cursor-pointer group"
      >
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {experience.link ? (
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                className="block w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 group-hover:border-red-600/30 transition-colors"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {experience.subtitle?.charAt(0) || experience.title.charAt(0)}
                </div>
              </motion.a>
            ) : (
              <motion.div
                className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 group-hover:border-red-600/30 transition-colors"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0 }}
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {experience.subtitle?.charAt(0) || experience.title.charAt(0)}
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                {experience.link ? (
                  <motion.h3
                    className="text-xl font-bold text-white mb-1 hover:text-red-400 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0 }}
                  >
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {experience.title}
                    </a>
                  </motion.h3>
                ) : (
                  <motion.h3
                    className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0 }}
                  >
                    {experience.title}
                  </motion.h3>
                )}
                <motion.p
                  className="text-gray-300 font-medium mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                >
                  {experience.subtitle}
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col md:items-end gap-2 mt-2 md:mt-0"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              >
                <time className="text-gray-400 text-sm font-medium">
                  {extractDateFromSubtitle(experience.date || "Present")}
                </time>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(experience.experienceType)} lowercase`}>
                  {experience.experienceType || 'professional'}
                </span>
              </motion.div>
            </div>

            {/* Description with bullet points */}
            {experience.description && (
                <ul className="space-y-2">
                    {experience.description.split('\n').map((point, pointIndex) => (
                        point.trim().replace(/^•\s*/, '') && (
                        <motion.li
                            key={pointIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 + pointIndex * 0.1 }}
                        >
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm leading-relaxed">{point.trim().replace(/^•\s*/, '')}</span>
                        </motion.li>
                        )
                    ))}
                </ul>
            )}

            {/* Technologies */}
            {experience.technologies && (
              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
              >
                {experience.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700 group-hover:border-red-600/20 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.9 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    transition={{ duration: 0 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export function ExperienceSection() {
  const allExperiences = experienceData.flatMap(section => section.items);

  return (
    <section className="py-20 bg-black text-white" id="experience">
      <div className="max-w-7xl mx-auto px-4">
        {/* Experience Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-red-600 text-sm font-medium mb-2">Journey of Impact</div>
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A journey through roles, achievements, and the technical expertise I&apos;ve developed
            across AI research, machine learning, and software development.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl space-y-8">
            {allExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLast={index === allExperiences.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}