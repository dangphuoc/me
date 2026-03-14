'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const technologies = [
  'Java', 'Spring Boot', 'Vert.x', 'Quarkus LangChain', 'AI Agent',
  'Kafka', 'RabbitMQ', 'MySQL', 'Redis', 'Cassandra',
  'Docker', 'Kubernetes', 'ArgoCD', 'Prometheus', 'Grafana', 'Jenkins',
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function TechStack() {
  const t = useTranslations('home');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-th-border">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl font-bold text-center mb-10 text-th-heading"
        >
          {t('techStack')}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 border border-th-border text-th-dim hover:text-th-accent hover:border-th-accent transition-all text-xs"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
