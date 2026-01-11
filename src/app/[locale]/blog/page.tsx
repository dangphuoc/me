'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Calendar, Clock, Tag } from 'lucide-react';

// Sample posts for demo - will be replaced with MDX posts
const samplePosts = [
  {
    slug: 'building-high-performance-teams',
    title: {
      vi: 'Xây dựng đội ngũ kỹ thuật hiệu suất cao',
      en: 'Building High-Performance Engineering Teams',
    },
    excerpt: {
      vi: 'Chia sẻ kinh nghiệm về cách xây dựng và phát triển một đội ngũ kỹ thuật xuất sắc, từ tuyển dụng đến đào tạo và giữ chân nhân tài.',
      en: 'Sharing experiences on how to build and develop an excellent engineering team, from recruitment to training and talent retention.',
    },
    date: '2024-01-15',
    readTime: 8,
    tags: ['Leadership', 'Management', 'Team Building'],
  },
  {
    slug: 'microservices-best-practices',
    title: {
      vi: 'Best Practices cho Microservices Architecture',
      en: 'Microservices Architecture Best Practices',
    },
    excerpt: {
      vi: 'Những bài học quý giá từ việc triển khai microservices trong production, bao gồm service discovery, circuit breaker, và observability.',
      en: 'Valuable lessons from deploying microservices in production, including service discovery, circuit breaker, and observability.',
    },
    date: '2024-01-10',
    readTime: 12,
    tags: ['Architecture', 'Microservices', 'Backend'],
  },
  {
    slug: 'engineering-manager-guide',
    title: {
      vi: 'Hướng dẫn cho Engineering Manager mới',
      en: 'A Guide for New Engineering Managers',
    },
    excerpt: {
      vi: 'Những điều tôi ước mình biết khi mới trở thành Engineering Manager - từ 1-on-1 meetings đến performance reviews.',
      en: 'Things I wish I knew when I first became an Engineering Manager - from 1-on-1 meetings to performance reviews.',
    },
    date: '2024-01-05',
    readTime: 10,
    tags: ['Leadership', 'Career', 'Management'],
  },
  {
    slug: 'system-design-interview',
    title: {
      vi: 'Chuẩn bị cho System Design Interview',
      en: 'Preparing for System Design Interviews',
    },
    excerpt: {
      vi: 'Hướng dẫn chi tiết cách chuẩn bị và approach một system design interview, kèm theo các ví dụ thực tế.',
      en: 'A detailed guide on how to prepare and approach a system design interview, with real-world examples.',
    },
    date: '2024-01-01',
    readTime: 15,
    tags: ['Interview', 'System Design', 'Career'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(samplePosts.flatMap((post) => post.tags)));

  const filteredPosts = samplePosts.filter((post) => {
    const matchesSearch =
      post.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[locale].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {locale === 'vi' ? 'Tất cả' : 'All'}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={item}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <div className="h-full p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-lg">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title[locale]}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt[locale]}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString(
                          locale === 'vi' ? 'vi-VN' : 'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} {t('minRead')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noResults')}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
