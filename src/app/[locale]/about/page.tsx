'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const experiences = [
  {
    title: 'Engineering Manager',
    company: 'M_Service JSC (MoMo)',
    period: '2017 - Present',
    highlights: {
      vi: [
        'Xây dựng và quản lý hệ thống Bank Linkage kết nối 30+ ngân hàng',
        'Phát triển hệ thống Bank Transfer 247 xử lý hàng triệu giao dịch/ngày',
        'Thiết kế và triển khai hệ thống eKYC với độ chính xác 99.5%',
        'Nghiên cứu và ứng dụng AI Agents (ReAct, RAG, Multi-Agent) vào sản phẩm',
        'Xây dựng CI/CD pipeline và monitoring (Prometheus, Grafana)',
        'Quản lý team 20 thành viên với tư duy customer-centric',
      ],
      en: [
        'Built and managed Bank Linkage system connecting 30+ banks',
        'Developed Bank Transfer 247 handling millions of txn/day',
        'Designed eKYC system with 99.5% accuracy',
        'Researching and applying AI Agents (ReAct, RAG, Multi-Agent) to products',
        'Built CI/CD pipeline and monitoring (Prometheus, Grafana)',
        'Managing team of 20 members with customer-centric mindset',
      ],
    },
  },
  {
    title: 'Estimator',
    company: 'Platinum Global Co.,Ltd',
    period: 'Mar 2016 - Dec 2016',
    highlights: {
      vi: [
        'Làm việc trực tiếp với đối tác nước ngoài',
        'Ước lượng và lập kế hoạch dự án',
      ],
      en: [
        'Worked directly with foreign partners',
        'Project estimation and planning',
      ],
    },
  },
  {
    title: 'Database Intern',
    company: 'Viet An Software Co.,Ltd',
    period: 'Jun 2015 - Sep 2015',
    highlights: {
      vi: ['Phân tích và thiết kế cơ sở dữ liệu GIS'],
      en: ['Analyzed and designed GIS database'],
    },
  },
];

const techSkills = [
  'Java', 'Quarkus', 'Vert.x',
  'Kafka', 'RabbitMQ', 'MySQL', 'Redis', 'Cassandra',
  'Docker', 'Kubernetes', 'ArgoCD', 'Prometheus', 'Grafana',
  'Microservices', 'Reactive Programming',
];

const aiSkills = [
  'AI Agent', 'ReAct', 'Planning', 'Workflow',
  'RAG', 'Multi-Agent', 'Sub-Agent',
  'Claude Code SDK', 'Anthropic SDK', 'LangChain',
];

const leadershipSkills = [
  'Team Management (20+)', 'System Architecture', 'CI/CD & DevOps',
  'Monitoring & Observability', 'Agile / Scrum', 'Customer-Centric Mindset',
];

export default function AboutPage() {
  const t = useTranslations('about');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="text-xs text-th-dim mb-2">
            <span className="text-th-prompt">$</span> cat about.md
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-th-heading mb-2">{t('title')}</h1>
          <p className="text-lg text-th-secondary">
            {locale === 'vi'
              ? 'Đam mê công nghệ và phát triển con người'
              : 'Passionate about technology and people development'}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <div className="text-xs text-th-dim mb-3">
            <span className="text-th-prompt">$</span> cat bio.txt
          </div>
          <div className="border border-th-border bg-th-card p-5 sm:p-8">
            <p className="text-th-primary leading-relaxed">
              {locale === 'vi' ? (
                <>
                  Xin chào! Tôi là Engineering Manager tại MoMo với hơn 8 năm kinh nghiệm
                  trong ngành Fintech. Tôi tin rằng kỹ thuật tốt bắt đầu từ việc thấu hiểu
                  khách hàng — mọi hệ thống tôi xây dựng đều hướng đến trải nghiệm người dùng cuối.
                  <br /><br />
                  Hiện tại, tôi quản lý team 20 thành viên, phụ trách các hệ thống Bank Linkage,
                  Bank Transfer 247 và eKYC. Song song đó, tôi đang nghiên cứu sâu về AI Agents —
                  từ reasoning patterns (ReAct, Planning), kỹ thuật RAG, đến kiến trúc
                  Multi-Agent orchestration — để đưa AI vào giải quyết các bài toán thực tế trong sản phẩm.
                </>
              ) : (
                <>
                  Hello! I&apos;m an Engineering Manager at MoMo with 8+ years in Fintech.
                  I believe great engineering starts with understanding the customer — every
                  system I build is driven by end-user experience and real business impact.
                  <br /><br />
                  Currently, I lead a team of 20 across Bank Linkage, Bank Transfer 247 and
                  eKYC systems. In parallel, I&apos;m diving deep into AI Agents — from reasoning
                  patterns (ReAct, Planning), RAG techniques, to Multi-Agent orchestration —
                  bringing AI into production to solve real-world problems.
                </>
              )}
            </p>
            <div className="mt-6">
              <Link
                href={`/${locale}/cv`}
                className="text-xs text-th-accent hover:text-th-accent-hover transition-colors"
              >
                → {locale === 'vi' ? 'Xem CV đầy đủ' : 'View full CV'}
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="text-xs text-th-dim mb-3">
            <span className="text-th-prompt">$</span> history --work
          </div>
          <div className="border border-th-border divide-y divide-th-border">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-th-card p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-sm font-medium text-th-accent">{exp.title}</h3>
                    <span className="text-xs text-th-secondary">{exp.company}</span>
                  </div>
                  <span className="text-xs text-th-dim">{exp.period}</span>
                </div>
                <ul className="space-y-1">
                  {exp.highlights[locale].map((item, i) => (
                    <li key={i} className="text-sm text-th-primary">
                      <span className="text-th-accent-soft mr-2">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="text-xs text-th-dim mb-3">
            <span className="text-th-prompt">$</span> dpkg --list skills
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Backend & Infra */}
            <div className="border border-th-border bg-th-card p-5">
              <div className="text-xs text-th-dim mb-4">
                // {locale === 'vi' ? 'backend & hạ tầng' : 'backend & infra'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs border border-th-border text-th-primary hover:text-th-accent hover:border-th-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & Agent */}
            <div className="border border-th-border bg-th-card p-5">
              <div className="text-xs text-th-dim mb-4">
                // ai & agent
              </div>
              <div className="flex flex-wrap gap-1.5">
                {aiSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs border border-th-border text-th-primary hover:text-th-accent hover:border-th-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div className="border border-th-border bg-th-card p-5">
              <div className="text-xs text-th-dim mb-4">
                // {locale === 'vi' ? 'lãnh đạo' : 'leadership'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {leadershipSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs border border-th-border text-th-primary hover:text-th-accent hover:border-th-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs text-th-dim mb-3">
            <span className="text-th-prompt">$</span> cat education.log
          </div>
          <div className="border border-th-border divide-y divide-th-border">
            <div className="bg-th-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm font-medium text-th-primary">
                    {locale === 'vi' ? 'Kỹ sư Trắc địa - Bản đồ' : 'Geomatic Engineer'}
                  </h3>
                  <span className="text-xs text-th-secondary">
                    {locale === 'vi' ? 'Đại học Bách Khoa TP.HCM' : 'Ho Chi Minh University of Technology'}
                  </span>
                </div>
                <span className="text-xs text-th-dim">2011 - 2016 &bull; GPA: 7.32/10</span>
              </div>
            </div>
            <div className="bg-th-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm font-medium text-th-primary">
                    {locale === 'vi' ? 'Chứng chỉ Lập trình Java Web' : 'Java Web Programming Certificate'}
                  </h3>
                  <span className="text-xs text-th-secondary">
                    {locale === 'vi' ? 'Trung tâm CNTT - ĐH Khoa học Tự nhiên' : 'IT Center - HCM University of Science'}
                  </span>
                </div>
                <span className="text-xs text-th-dim">2016</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
