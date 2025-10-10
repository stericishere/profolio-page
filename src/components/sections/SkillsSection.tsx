'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'Languages' | 'Frameworks' | 'AI/ML' | 'Cloud & DevOps' | "Database";
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'Java', level: 88, category: 'Languages' },
  { name: 'TypeScript', level: 82, category: 'Languages' },
  { name: 'JavaScript', level: 82, category: 'Languages' },
  { name: 'HTML/CSS', level: 82, category: 'Languages' },
  { name: 'SQL', level: 85, category: 'Languages' },
  { name: 'React', level: 88, category: 'Languages' },


  // Frameworks
  { name: 'LangChain', level: 92, category: 'Frameworks' },
  { name: 'FastAPI', level: 90, category: 'Frameworks' },
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

  //DataBase
  { name: 'PostgreSQL', level:90, category: 'Database' },
  { name: 'NoSQL', level: 82, category: 'Database' },
  { name: 'MongoDB', level: 82, category: 'Database' },
  { name: 'Redis', level: 78, category: 'Database' }
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
      transition={{
        opacity: { duration: 0.6, delay: index * 0.05 },
        y: { duration: 0.6, delay: index * 0.05 },
        default: { duration: 0.1 }
      }}
      whileHover={{ x: 5, transition: { duration: 0.05 } }}
      className="space-y-2 group cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <motion.span
          className="text-white font-medium group-hover:text-red-400 transition-colors"
          whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          className="text-gray-400 text-sm group-hover:text-white transition-colors"
          whileHover={{ scale: 1.1, fontWeight: 'bold', transition: { duration: 0.05 } }}
          transition={{ duration: 0.1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getBarColor(skill.level)}`}
          style={{ width: `${width}%` }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const categories = ['Languages', 'Frameworks', 'AI/ML', 'Cloud & DevOps', 'Database'] as const;
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Languages': false,
    'Frameworks': false,
    'AI/ML': false,
    'Cloud & DevOps': false,
    'Database': false
  });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColumnsPerRow = () => {
    if (windowWidth >= 1024) return 5; // lg breakpoint
    if (windowWidth >= 768) return 2; // md breakpoint
    return 1; // mobile
  };

  const getRowIndex = (categoryIndex: number) => {
    const cols = getColumnsPerRow();
    return Math.floor(categoryIndex / cols);
  };

  const getCategoriesInSameRow = (categoryIndex: number) => {
    const rowIndex = getRowIndex(categoryIndex);
    const cols = getColumnsPerRow();
    const startIndex = rowIndex * cols;
    const endIndex = Math.min(startIndex + cols, categories.length);
    return categories.slice(startIndex, endIndex);
  };

  const toggleCategory = (category: string) => {
    const categoryIndex = categories.indexOf(category as typeof categories[number]);
    const categoriesInRow = getCategoriesInSameRow(categoryIndex);
    const isCurrentlyExpanded = expandedCategories[category];

    setExpandedCategories(prev => {
      const newState = { ...prev };

      // If we're expanding, expand all in the row
      if (!isCurrentlyExpanded) {
        categoriesInRow.forEach(cat => {
          newState[cat] = true;
        });
      } else {
        // If we're collapsing, collapse all in the row
        categoriesInRow.forEach(cat => {
          newState[cat] = false;
        });
      }

      return newState;
    });
  };

  return (
    <section className="py-20 text-white" id="skills" style={{ backgroundColor: '#111a596' }}>
      <div className="max-w-[90rem] mx-auto px-4">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 auto-rows-fr">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.6, delay: categoryIndex * 0.1 },
                x: { duration: 0.6, delay: categoryIndex * 0.1 },
                default: { duration: 0.1 }
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                borderColor: 'rgba(239, 68, 68, 0.5)',
                transition: { duration: 0.05 }
              }}
              onClick={() => toggleCategory(category)}
              className="bg-black/50 rounded-lg border border-gray-800 hover:border-red-600/30 transition-all duration-150 group cursor-pointer flex flex-col"
              style={{
                padding: expandedCategories[category] ? '1.5rem' : '1rem'
              }}
            >
              <motion.div
                className="flex items-center justify-between"
                style={{
                  marginBottom: expandedCategories[category] ? '1.5rem' : '0'
                }}
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-bold text-red-600 group-hover:text-red-400 transition-colors">
                  {category}
                </h3>
                <motion.svg
                  className="w-5 h-5 text-red-600 group-hover:text-red-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  height: expandedCategories[category] ? 'auto' : 0,
                  opacity: expandedCategories[category] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}