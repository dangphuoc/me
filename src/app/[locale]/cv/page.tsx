'use client';

import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  Printer,
} from 'lucide-react';

const personalInfo = {
  name: 'Nguyen Dang Phuoc',
  title: { vi: 'Engineering Manager', en: 'Engineering Manager' },
  email: 'dangphuocbk.93@gmail.com',
  phone: '039 754 8505',
  location: 'Ho Chi Minh City, Vietnam',
  linkedin: 'linkedin.com/in/phuoc-nguyen-dang-016129159',
  github: 'github.com/dangphuoc',
  summary: {
    vi: 'Engineering Manager với hơn 8 năm kinh nghiệm trong ngành Fintech. Chuyên xây dựng và quản lý các hệ thống thanh toán quy mô lớn, có khả năng xử lý hàng triệu giao dịch mỗi ngày. Đam mê phát triển đội ngũ và áp dụng công nghệ mới như AI Agent vào sản phẩm.',
    en: 'Engineering Manager with 8+ years of experience in Fintech industry. Specialized in building and managing large-scale payment systems capable of handling millions of transactions daily. Passionate about team development and applying new technologies like AI Agents to products.',
  },
};

const experiences = [
  {
    title: { vi: 'Engineering Manager', en: 'Engineering Manager' },
    company: 'M_Service JSC (MoMo)',
    location: 'Ho Chi Minh City',
    period: 'Jan 2017 - Present',
    highlights: {
      vi: [
        'Xây dựng và quản lý hệ thống Bank Linkage kết nối 30+ ngân hàng',
        'Phát triển hệ thống Bank Transfer 247 xử lý hàng triệu giao dịch/ngày',
        'Thiết kế và triển khai hệ thống eKYC với độ chính xác 99.5%',
        'Xây dựng CI/CD pipeline và monitoring tools (Prometheus, Grafana)',
        'Quản lý team 20 thành viên (Mobile, Backend, QC)',
        'Triển khai hệ thống trên cloud on-premise với Kubernetes',
      ],
      en: [
        'Built and managed Bank Linkage system connecting 30+ banks',
        'Developed Bank Transfer 247 system handling millions of transactions/day',
        'Designed and deployed eKYC system with 99.5% accuracy',
        'Built CI/CD pipeline and monitoring tools (Prometheus, Grafana)',
        'Managed team of 20 members (Mobile, Backend, QC)',
        'Deployed systems on cloud on-premise with Kubernetes',
      ],
    },
  },
  {
    title: { vi: 'Estimator', en: 'Estimator' },
    company: 'Platinum Global Co.,Ltd',
    location: 'Ho Chi Minh City',
    period: 'Mar 2016 - Dec 2016',
    highlights: {
      vi: [
        'Làm việc trực tiếp với đối tác nước ngoài',
        'Ước lượng và lập kế hoạch dự án',
        'Phát triển kỹ năng giao tiếp chuyên nghiệp',
      ],
      en: [
        'Worked directly with foreign partners',
        'Project estimation and planning',
        'Developed professional communication skills',
      ],
    },
  },
  {
    title: { vi: 'Database Intern', en: 'Database Intern' },
    company: 'Viet An Software Co.,Ltd',
    location: 'Ho Chi Minh City',
    period: 'Jun 2015 - Sep 2015',
    highlights: {
      vi: [
        'Phân tích và thiết kế cơ sở dữ liệu GIS',
        'Làm việc với PostGIS và PostgreSQL',
      ],
      en: [
        'Analyzed and designed GIS database',
        'Worked with PostGIS and PostgreSQL',
      ],
    },
  },
];

const skills = {
  programming: ['Java', 'Spring Boot', 'Vert.x', 'Quarkus'],
  ai: ['AI Agent', 'Quarkus LangChain', 'LLM Integration'],
  databases: ['MySQL', 'Oracle', 'Cassandra', 'Redis', 'PostgreSQL'],
  messaging: ['Apache Kafka', 'RabbitMQ'],
  devops: ['Docker', 'Kubernetes', 'ArgoCD', 'Jenkins', 'GitLab CI'],
  monitoring: ['Prometheus', 'Grafana', 'ELK Stack', 'Graylog'],
  other: ['Microservices', 'Reactive Programming', 'System Design', 'Agile/Scrum'],
};

const education = [
  {
    degree: { vi: 'Kỹ sư Trắc địa - Bản đồ', en: 'Geomatic Engineer' },
    school: {
      vi: 'Đại học Bách Khoa TP.HCM',
      en: 'Ho Chi Minh University of Technology (Bach Khoa)',
    },
    period: '2011 - 2016',
    gpa: '7.32/10',
  },
  {
    degree: {
      vi: 'Chứng chỉ Lập trình Java Web',
      en: 'Java Web Programming Certificate',
    },
    school: {
      vi: 'Trung tâm CNTT - ĐH Khoa học Tự nhiên',
      en: 'IT Center - HCM University of Science',
    },
    period: '2016',
  },
];

export default function CVPage() {
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'en') as 'vi' | 'en';

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print/Download Button - Hidden on print */}
      <div className="fixed top-24 right-6 z-50 print:hidden flex gap-2">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
        >
          <Printer size={18} />
          {locale === 'vi' ? 'In CV' : 'Print CV'}
        </button>
      </div>

      {/* CV Content */}
      <div className="min-h-screen bg-white dark:bg-gray-900 print:bg-white print:dark:bg-white">
        <div className="max-w-4xl mx-auto px-8 py-12 print:py-0 print:px-0 print:max-w-none">

          {/* Header */}
          <header className="border-b-2 border-blue-600 pb-6 mb-6 print:border-black">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white print:text-black mb-2">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl text-blue-600 dark:text-blue-400 print:text-blue-700 font-medium mb-4">
              {personalInfo.title[locale]}
            </h2>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-600">
                <Mail size={14} />
                {personalInfo.email}
              </a>
              <span className="flex items-center gap-1">
                <Phone size={14} />
                {personalInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {personalInfo.location}
              </span>
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-black uppercase tracking-wide border-b border-gray-300 dark:border-gray-700 print:border-gray-400 pb-1 mb-3">
              {locale === 'vi' ? 'Giới thiệu' : 'Summary'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 print:text-gray-800 leading-relaxed">
              {personalInfo.summary[locale]}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-black uppercase tracking-wide border-b border-gray-300 dark:border-gray-700 print:border-gray-400 pb-1 mb-3">
              {locale === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience'}
            </h3>

            <div className="space-y-5">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-wrap justify-between items-start mb-1">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white print:text-black">
                        {exp.title[locale]}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 print:text-blue-700 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
                      <p className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 print:text-gray-800 space-y-1 ml-2">
                    {exp.highlights[locale].map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-black uppercase tracking-wide border-b border-gray-300 dark:border-gray-700 print:border-gray-400 pb-1 mb-3">
              {locale === 'vi' ? 'Kỹ năng' : 'Skills'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  {locale === 'vi' ? 'Ngôn ngữ & Framework:' : 'Languages & Frameworks:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.programming.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  AI & LLM:
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.ai.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  Databases:
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.databases.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  Messaging:
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.messaging.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  DevOps & CI/CD:
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.devops.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  Monitoring:
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.monitoring.join(', ')}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  {locale === 'vi' ? 'Khác:' : 'Other:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {skills.other.join(', ')}
                </span>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-black uppercase tracking-wide border-b border-gray-300 dark:border-gray-700 print:border-gray-400 pb-1 mb-3">
              {locale === 'vi' ? 'Học vấn' : 'Education'}
            </h3>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-wrap justify-between items-start">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white print:text-black">
                      {edu.degree[locale]}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 print:text-blue-700">
                      {edu.school[locale]}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
                    <p>{edu.period}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-black uppercase tracking-wide border-b border-gray-300 dark:border-gray-700 print:border-gray-400 pb-1 mb-3">
              {locale === 'vi' ? 'Ngôn ngữ' : 'Languages'}
            </h3>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  {locale === 'vi' ? 'Tiếng Việt:' : 'Vietnamese:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {locale === 'vi' ? 'Bản ngữ' : 'Native'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white print:text-black">
                  {locale === 'vi' ? 'Tiếng Anh:' : 'English:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 print:text-gray-800 ml-2">
                  {locale === 'vi' ? 'Đọc hiểu tài liệu kỹ thuật' : 'Technical documentation proficiency'}
                </span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          header, footer, nav {
            display: none !important;
          }

          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
