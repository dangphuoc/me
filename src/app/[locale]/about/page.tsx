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
  Calendar,
  Download
} from 'lucide-react';

const experiences = [
  {
    title: { vi: 'Engineering Manager', en: 'Engineering Manager' },
    company: 'M_Service JSC (MoMo)',
    location: 'Ho Chi Minh City',
    period: '2017 - Present',
    description: {
      vi: 'Xây dựng và quản lý hệ thống Bank Linkage, Bank Transfer 247, eKYC. Thiết lập CI/CD, monitoring tools. Deploy hệ thống trên cloud on-premise. Quản lý team 20 thành viên (Mobile, Backend, QC).',
      en: 'Build and manage Bank Linkage, Bank Transfer 247, eKYC systems. Setup CI/CD, monitoring tools. Deploy systems on cloud on-premise. Manage team of 20 members (Mobile, Backend, QC).',
    },
  },
  {
    title: { vi: 'Estimator', en: 'Estimator' },
    company: 'Platinum Global Co.,Ltd',
    location: 'Ho Chi Minh City',
    period: 'Mar 2016 - Dec 2016',
    description: {
      vi: 'Làm việc với đối tác nước ngoài, phát triển kỹ năng làm việc chuyên nghiệp và tinh thần trách nhiệm trong công việc.',
      en: 'Working with foreign partners, developing professional working skills and responsibility for work.',
    },
  },
  {
    title: { vi: 'Database Intern', en: 'Database Intern' },
    company: 'Viet An Software Co.,Ltd',
    location: 'Ho Chi Minh City',
    period: 'Jun 2015 - Sep 2015',
    description: {
      vi: 'Phân tích và thiết kế cơ sở dữ liệu GIS.',
      en: 'Analyze and design GIS database.',
    },
  },
];

const skills = {
  technical: [
    { name: 'Java / Spring Boot / Vert.x', level: 95 },
    { name: 'Microservices / Reactive', level: 90 },
    { name: 'Kafka / RabbitMQ', level: 88 },
    { name: 'Docker / Kubernetes / ArgoCD', level: 85 },
    { name: 'AI Agent / Quarkus LangChain', level: 80 },
    { name: 'MySQL / Oracle / Cassandra / Redis', level: 90 },
  ],
  leadership: [
    { name: 'Team Management (20+ members)', level: 92 },
    { name: 'System Architecture', level: 90 },
    { name: 'CI/CD & DevOps', level: 88 },
    { name: 'Monitoring (Prometheus/Grafana)', level: 85 },
    { name: 'Agile / Scrum', level: 88 },
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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            {locale === 'vi'
              ? 'Đam mê công nghệ và phát triển con người'
              : 'Passionate about technology and people development'
            }
          </p>
          <motion.a
            href={`/${locale}/cv`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25"
          >
            <Download size={20} />
            {locale === 'vi' ? 'Xem CV' : 'View CV'}
          </motion.a>
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
                    Xin chào! Tôi là Engineering Manager tại MoMo với hơn 8 năm kinh nghiệm
                    trong ngành Fintech. Tôi đam mê xây dựng các hệ thống thanh toán có quy mô lớn
                    và phát triển đội ngũ kỹ thuật xuất sắc.
                    <br /><br />
                    Hiện tại, tôi đang quản lý team 20 thành viên, phụ trách các hệ thống
                    Bank Linkage, Bank Transfer 247, và eKYC. Gần đây tôi đang nghiên cứu
                    về AI Agent và Quarkus LangChain để áp dụng vào các sản phẩm.
                  </>
                ) : (
                  <>
                    Hello! I&apos;m an Engineering Manager at MoMo with over 8 years of experience
                    in the Fintech industry. I&apos;m passionate about building large-scale payment
                    systems and developing excellent engineering teams.
                    <br /><br />
                    Currently, I manage a team of 20 members, responsible for Bank Linkage,
                    Bank Transfer 247, and eKYC systems. Recently, I&apos;ve been exploring
                    AI Agent and Quarkus LangChain to apply in our products.
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

          <div className="space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <Award className="text-gray-600 dark:text-gray-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {locale === 'vi'
                      ? 'Kỹ sư Trắc địa - Bản đồ'
                      : 'Geomatic Engineer'
                    }
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {locale === 'vi'
                      ? 'Đại học Bách Khoa TP.HCM'
                      : 'Ho Chi Minh University of Technology (Bach Khoa)'
                    }
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    2011 - 2016 • GPA: 7.32/10
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <Award className="text-gray-600 dark:text-gray-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {locale === 'vi'
                      ? 'Chứng chỉ Lập trình Java Web'
                      : 'Java Web Programming Certificate'
                    }
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {locale === 'vi'
                      ? 'Trung tâm CNTT - ĐH Khoa học Tự nhiên'
                      : 'IT Center - HCM University of Science'
                    }
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    2016
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
