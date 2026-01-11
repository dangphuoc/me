'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  GraduationCap,
  Code2,
  Users,
  Target,
  Award,
  MapPin,
  Calendar
} from 'lucide-react';

const experiences = [
  {
    title: { vi: 'Software Engineering Manager', en: 'Software Engineering Manager' },
    company: 'Tech Company',
    location: 'Ho Chi Minh City',
    period: '2022 - Present',
    description: {
      vi: 'Lãnh đạo đội ngũ 15+ engineers, định hướng kỹ thuật và phát triển sản phẩm',
      en: 'Leading 15+ engineers team, technical direction and product development',
    },
  },
  {
    title: { vi: 'Senior Software Engineer', en: 'Senior Software Engineer' },
    company: 'Startup Inc',
    location: 'Ho Chi Minh City',
    period: '2019 - 2022',
    description: {
      vi: 'Thiết kế và phát triển hệ thống backend microservices',
      en: 'Designing and developing backend microservices system',
    },
  },
  {
    title: { vi: 'Software Engineer', en: 'Software Engineer' },
    company: 'Software House',
    location: 'Ho Chi Minh City',
    period: '2016 - 2019',
    description: {
      vi: 'Phát triển ứng dụng web full-stack với React và Node.js',
      en: 'Developing full-stack web applications with React and Node.js',
    },
  },
];

const skills = {
  technical: [
    { name: 'System Design', level: 95 },
    { name: 'Backend Development', level: 90 },
    { name: 'Frontend Development', level: 85 },
    { name: 'DevOps / Cloud', level: 80 },
    { name: 'Data Engineering', level: 75 },
  ],
  leadership: [
    { name: 'Team Management', level: 90 },
    { name: 'Technical Mentoring', level: 95 },
    { name: 'Project Planning', level: 85 },
    { name: 'Stakeholder Communication', level: 88 },
    { name: 'Agile / Scrum', level: 90 },
  ],
};

export default function AboutPage() {
  const t = useTranslations('about');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {locale === 'vi'
              ? 'Đam mê công nghệ và phát triển con người'
              : 'Passionate about technology and people development'
            }
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold">{t('bio')}</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {locale === 'vi' ? (
                  <>
                    Xin chào! Tôi là một Software Engineering Manager với hơn 8 năm kinh nghiệm
                    trong ngành công nghệ. Tôi đam mê xây dựng các sản phẩm có tác động lớn và
                    phát triển đội ngũ kỹ thuật xuất sắc.
                    <br /><br />
                    Hiện tại, tôi đang lãnh đạo một đội ngũ engineers tài năng, tập trung vào
                    việc xây dựng các hệ thống backend có khả năng mở rộng cao và tạo ra trải
                    nghiệm người dùng tuyệt vời.
                  </>
                ) : (
                  <>
                    Hello! I&apos;m a Software Engineering Manager with over 8 years of experience
                    in the tech industry. I&apos;m passionate about building impactful products and
                    developing excellent engineering teams.
                    <br /><br />
                    Currently, I lead a talented team of engineers, focusing on building highly
                    scalable backend systems and creating amazing user experiences.
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Briefcase className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold">{t('experience')}</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-950" />

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {exp.title[locale]}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.description[locale]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Target className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold">{t('skills')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={20} className="text-blue-500" />
                <h3 className="text-lg font-semibold">
                  {locale === 'vi' ? 'Kỹ năng kỹ thuật' : 'Technical Skills'}
                </h3>
              </div>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership Skills */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users size={20} className="text-purple-500" />
                <h3 className="text-lg font-semibold">
                  {locale === 'vi' ? 'Kỹ năng lãnh đạo' : 'Leadership Skills'}
                </h3>
              </div>
              <div className="space-y-4">
                {skills.leadership.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <GraduationCap className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold">{t('education')}</h2>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Award className="text-gray-600 dark:text-gray-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {locale === 'vi'
                    ? 'Cử nhân Khoa học Máy tính'
                    : 'Bachelor of Computer Science'
                  }
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  University of Technology
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  2012 - 2016
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
