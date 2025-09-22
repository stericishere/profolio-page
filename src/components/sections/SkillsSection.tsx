'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'Languages' | 'Frameworks' | 'AI/ML' | 'Cloud & DevOps' | "DataBase";
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'Java', level: 88, category: 'Languages' },
  { name: 'TypeScript', level: 82, category: 'Languages' },
  { name: 'JavaScript', level: 82, category: 'Languages' },
  { name: 'HTML/CSS', level: 82, category: 'Languages' },
  { name: 'SQL', level: 85, category: 'Languages' },

  // Frameworks
  { name: 'LangChain', level: 92, category: 'Frameworks' },
  { name: 'FastAPI', level: 90, category: 'Frameworks' },
  { name: 'React', level: 88, category: 'Frameworks' },
  { name: 'Next.js', level: 85, category: 'Frameworks' },
  { name: 'Django', level: 83, category: 'Frameworks' },
  { name: 'Express', level: 82, category: 'Frameworks' },
  { name: 'Spring Boot', level: 80, category: 'Frameworks' },
  { name: 'Streamlit', level: 85, category: 'Frameworks' },

  // AI/ML
  { name: 'Pytorch', level: 92, category: 'AI/ML' },
  { name: 'scikit-learn', level: 90, category: 'AI/ML' },
  { name: 'Pandas', level: 90, category: 'AI/ML' },
  { name: 'NumPy', level: 88, category: 'AI/ML' },
  { name: 'Computer Vision', level: 85, category: 'AI/ML' },
  { name: 'Reinforcement Learning', level: 83, category: 'AI/ML' },
  { name: 'MLOps', level: 83, category: 'AI/ML' },

  // Cloud & DevOps
  { name: 'Google Cloud Platform', level: 88, category: 'Cloud & DevOps' },
  { name: 'AWS', level: 85, category: 'Cloud & DevOps' },
  { name: 'Docker', level: 83, category: 'Cloud & DevOps' },
  { name: 'Git', level: 90, category: 'Cloud & DevOps' },
  { name: 'CI/CD', level: 80, category: 'Cloud & DevOps' },
  { name: 'Redis', level: 78, category: 'Cloud & DevOps' },

  //DataBase
  { name: 'PostgreSQL', level: 85, category: 'Cloud & DevOps' },
  { name: 'NoSQL', level: 82, category: 'Cloud & DevOps' },
  { name: 'MongoDB', level: 82, category: 'Cloud & DevOps' }
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(skill.level);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [skill.level, index]);

  const getBarColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.5 }}
      className="space-y-2 group cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <motion.span
          className="text-white font-medium group-hover:text-red-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          className="text-gray-400 text-sm group-hover:text-white transition-colors"
          whileHover={{ scale: 1.1, fontWeight: 'bold' }}
          transition={{ duration: 0.5 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getBarColor(skill.level)}`}
          style={{ width: `${width}%` }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const categories = ['Languages', 'Frameworks', 'AI/ML', 'Cloud & DevOps'] as const;

  return (
    <section className="py-20 bg-gray-900 text-white" id="skills">
      <div className="max-w-7xl mx-auto px-4">
        {/* Skills Header */}
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
            Expertise & Technologies
          </motion.div>
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A comprehensive toolkit spanning AI/ML research, full-stack development,
            and modern cloud technologies for building scalable solutions.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                borderColor: 'rgba(239, 68, 68, 0.5)'
              }}
              transition={{ duration: 0.15 }}
              className="bg-black/50 rounded-lg p-6 border border-gray-800 hover:border-red-600/30 transition-all duration-300 cursor-pointer group"
            >
              <motion.h3
                className="text-xl font-bold mb-6 text-red-600 group-hover:text-red-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                {category}
              </motion.h3>
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category)
                  .sort((a, b) => b.level - a.level)
                  .map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={categoryIndex * 10 + index}
                    />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Snippet Visual Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
          transition={{ duration: 0.15 }}
          className="mt-16 max-w-2xl mx-auto cursor-pointer"
        >
          <div className="bg-black border border-gray-800 rounded-lg p-6 font-mono text-sm hover:border-red-600/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                whileHover={{ scale: 1.3, boxShadow: '0 0 10px rgba(239, 68, 68, 0.7)' }}
              ></motion.div>
              <motion.div
                className="w-3 h-3 bg-yellow-500 rounded-full"
                whileHover={{ scale: 1.3, boxShadow: '0 0 10px rgba(234, 179, 8, 0.7)' }}
              ></motion.div>
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                whileHover={{ scale: 1.3, boxShadow: '0 0 10px rgba(34, 197, 94, 0.7)' }}
              ></motion.div>
            </div>
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                className="text-blue-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              >
                const <span className="text-white">developer</span> = {'{'}
              </motion.div>
              <motion.div
                className="ml-4 text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.3 }}
              >
                name: <span className="text-yellow-300">&quot;Steric Tsui&quot;</span>,
              </motion.div>
              <motion.div
                className="ml-4 text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.3 }}
              >
                skills: <span className="text-yellow-300">["AI/ML", "Full-Stack", "Systems"]</span>,
              </motion.div>
              <motion.div
                className="ml-4 text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.3 }}
              >
                passion: <span className="text-yellow-300">"Building impactful solutions"</span>,
              </motion.div>
              <motion.div
                className="ml-4 text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                focus: <span className="text-yellow-300">"AI + Software Engineering"</span>
              </motion.div>
              <motion.div
                className="text-blue-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.3 }}
              >
                {'};'}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}