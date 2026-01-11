'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Sample featured posts - will be replaced with actual data
const samplePosts = [
  {
    slug: 'building-high-performance-teams',
    title: {
      vi: 'Xây dựng đội ngũ kỹ thuật hiệu suất cao',
      en: 'Building High-Performance Engineering Teams',
    },
    excerpt: {
      vi: 'Chia sẻ kinh nghiệm về cách xây dựng và phát triển một đội ngũ kỹ thuật xuất sắc...',
      en: 'Sharing experiences on how to build and develop an excellent engineering team...',
    },
    date: '2024-01-15',
    readTime: 8,
  },
  {
    slug: 'microservices-best-practices',
    title: {
      vi: 'Best Practices cho Microservices Architecture',
      en: 'Microservices Architecture Best Practices',
    },
    excerpt: {
      vi: 'Những bài học quý giá từ việc triển khai microservices trong production...',
      en: 'Valuable lessons from deploying microservices in production...',
    },
    date: '2024-01-10',
    readTime: 12,
  },
  {
    slug: 'engineering-manager-guide',
    title: {
      vi: 'Hướng dẫn cho Engineering Manager mới',
      en: 'A Guide for New Engineering Managers',
    },
    excerpt: {
      vi: 'Những điều tôi ước mình biết khi mới trở thành Engineering Manager...',
      en: 'Things I wish I knew when I first became an Engineering Manager...',
    },
    date: '2024-01-05',
    readTime: 10,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedPosts() {
  const t = useTranslations('home');
  const tBlog = useTranslations('blog');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold"
          >
            {t('featuredPosts')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              {t('viewAll')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {samplePosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={item}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="h-full p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title[locale]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt[locale]}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} {tBlog('minRead')}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
