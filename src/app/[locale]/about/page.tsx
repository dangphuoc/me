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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-th-heading">{t('title')}</h1>
          <p className="text-lg text-th-secondary max-w-2xl mx-auto mb-6">
            {locale === 'vi'
              ? 'Đam mê công nghệ và phát triển con người'
              : 'Passionate about technology and people development'
            }
          </p>
          <motion.a
            href={`/${locale}/cv`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-th-accent text-th-strong font-medium transition-colors hover:bg-th-accent-hover"
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
          <div className="terminal-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-th-hover">
                <Users className="text-th-secondary" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-th-strong">{t('bio')}</h2>
            </div>
            <div className="max-w-none">
              <p className="text-lg text-th-primary leading-relaxed">
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
            <div className="p-3 bg-th-hover">
              <Briefcase className="text-th-secondary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-th-strong">{t('experience')}</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-th-hover" />

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
                  <div className="absolute left-6 w-5 h-5 bg-th-accent rounded-full border-4 border-th-page" />

                  <div className="terminal-card p-6">
                    <h3 className="text-xl font-semibold text-th-strong">
                      {exp.title[locale]}
                    </h3>
                    <p className="text-th-secondary font-medium mb-2">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-th-dim mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-th-secondary">
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
            <div className="p-3 bg-th-hover">
              <Target className="text-th-secondary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-th-strong">{t('skills')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="terminal-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={20} className="text-th-secondary" />
                <h3 className="text-lg font-semibold text-th-strong">
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
                      <span className="text-sm font-medium text-th-primary">
                        {skill.name}
                      </span>
                      <span className="text-sm text-th-dim">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-th-hover rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-th-accent rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership Skills */}
            <div className="terminal-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users size={20} className="text-th-secondary" />
                <h3 className="text-lg font-semibold text-th-strong">
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
                      <span className="text-sm font-medium text-th-primary">
                        {skill.name}
                      </span>
                      <span className="text-sm text-th-dim">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-th-hover rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-th-accent rounded-full"
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
            <div className="p-3 bg-th-hover">
              <GraduationCap className="text-th-secondary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-th-strong">{t('education')}</h2>
          </div>

          <div className="space-y-4">
            <div className="terminal-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-th-hover">
                  <Award className="text-th-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-th-strong">
                    {locale === 'vi'
                      ? 'Kỹ sư Trắc địa - Bản đồ'
                      : 'Geomatic Engineer'
                    }
                  </h3>
                  <p className="text-th-secondary font-medium">
                    {locale === 'vi'
                      ? 'Đại học Bách Khoa TP.HCM'
                      : 'Ho Chi Minh University of Technology (Bach Khoa)'
                    }
                  </p>
                  <p className="text-sm text-th-dim mt-1">
                    2011 - 2016 &bull; GPA: 7.32/10
                  </p>
                </div>
              </div>
            </div>
            <div className="terminal-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-th-hover">
                  <Award className="text-th-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-th-strong">
                    {locale === 'vi'
                      ? 'Chứng chỉ Lập trình Java Web'
                      : 'Java Web Programming Certificate'
                    }
                  </h3>
                  <p className="text-th-secondary font-medium">
                    {locale === 'vi'
                      ? 'Trung tâm CNTT - ĐH Khoa học Tự nhiên'
                      : 'IT Center - HCM University of Science'
                    }
                  </p>
                  <p className="text-sm text-th-dim mt-1">
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
