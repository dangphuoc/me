'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'TypeScript', color: 'bg-blue-500' },
  { name: 'React', color: 'bg-cyan-500' },
  { name: 'Next.js', color: 'bg-gray-900 dark:bg-white' },
  { name: 'Node.js', color: 'bg-green-500' },
  { name: 'Python', color: 'bg-yellow-500' },
  { name: 'Go', color: 'bg-cyan-600' },
  { name: 'PostgreSQL', color: 'bg-blue-600' },
  { name: 'MongoDB', color: 'bg-green-600' },
  { name: 'Redis', color: 'bg-red-500' },
  { name: 'Docker', color: 'bg-blue-400' },
  { name: 'Kubernetes', color: 'bg-blue-700' },
  { name: 'AWS', color: 'bg-orange-500' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function TechStack() {
  const t = useTranslations('home');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          {t('techStack')}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative"
            >
              <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <span
                  className={`w-3 h-3 rounded-full ${tech.color} ${tech.name === 'Next.js' ? 'dark:bg-white' : ''}`}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
