'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from 'lucide-react';

// Sample post content for demo
const samplePostContent = {
  vi: `
## Giới thiệu

Trong suốt hành trình làm việc của mình, tôi đã có cơ hội xây dựng và phát triển nhiều đội ngũ kỹ thuật. Dưới đây là những bài học quan trọng nhất mà tôi đã học được.

## 1. Tuyển dụng đúng người

Điều quan trọng nhất trong việc xây dựng một đội ngũ xuất sắc là tuyển dụng đúng người. Không chỉ xét về kỹ năng kỹ thuật, mà còn về thái độ, khả năng học hỏi và sự phù hợp với văn hóa team.

### Những điều cần tìm kiếm:
- Growth mindset
- Khả năng giao tiếp tốt
- Passion về công nghệ
- Team player

## 2. Tạo môi trường an toàn

Một đội ngũ hiệu suất cao cần một môi trường nơi mọi người cảm thấy an toàn để thử nghiệm, mắc lỗi và học hỏi.

\`\`\`javascript
// Ví dụ về culture code
const teamCulture = {
  failFast: true,
  learnFromMistakes: true,
  supportEachOther: true,
  celebrateWins: true
};
\`\`\`

## 3. Đầu tư vào phát triển con người

Mỗi thành viên trong team đều có những mục tiêu và nguyện vọng riêng. Việc của một Engineering Manager là giúp họ đạt được những mục tiêu đó.

## Kết luận

Xây dựng một đội ngũ kỹ thuật hiệu suất cao là một hành trình dài, đòi hỏi sự kiên nhẫn và nỗ lực không ngừng. Nhưng kết quả cuối cùng - một team mạnh mẽ, gắn kết và tạo ra những sản phẩm tuyệt vời - hoàn toàn xứng đáng.
  `,
  en: `
## Introduction

Throughout my career, I've had the opportunity to build and develop many engineering teams. Here are the most important lessons I've learned.

## 1. Hire the Right People

The most important thing in building an excellent team is hiring the right people. Not just in terms of technical skills, but also attitude, ability to learn, and cultural fit.

### What to look for:
- Growth mindset
- Good communication skills
- Passion for technology
- Team player

## 2. Create a Safe Environment

A high-performance team needs an environment where everyone feels safe to experiment, make mistakes, and learn.

\`\`\`javascript
// Example of culture code
const teamCulture = {
  failFast: true,
  learnFromMistakes: true,
  supportEachOther: true,
  celebrateWins: true
};
\`\`\`

## 3. Invest in People Development

Each team member has their own goals and aspirations. An Engineering Manager's job is to help them achieve those goals.

## Conclusion

Building a high-performance engineering team is a long journey that requires patience and continuous effort. But the end result - a strong, cohesive team that creates amazing products - is absolutely worth it.
  `,
};

const samplePost = {
  title: {
    vi: 'Xây dựng đội ngũ kỹ thuật hiệu suất cao',
    en: 'Building High-Performance Engineering Teams',
  },
  date: '2024-01-15',
  readTime: 8,
  tags: ['Leadership', 'Management', 'Team Building'],
};

export default function BlogPostPage() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const title = samplePost.title[locale];

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('title')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {samplePost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {samplePost.title[locale]}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(samplePost.date).toLocaleDateString(
                locale === 'vi' ? 'vi-VN' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {samplePost.readTime} {t('minRead')}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 mb-12"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400">
            {samplePostContent[locale].split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="mt-8 mb-4 text-gray-900 dark:text-gray-100">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={i} className="mt-6 mb-3 text-gray-900 dark:text-gray-100">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={i} className="text-gray-600 dark:text-gray-300">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.startsWith('```')) {
                return null;
              }
              if (line.includes('const teamCulture')) {
                return (
                  <pre key={i} className="rounded-xl overflow-x-auto">
                    <code className="text-sm">
                      {`const teamCulture = {
  failFast: true,
  learnFromMistakes: true,
  supportEachOther: true,
  celebrateWins: true
};`}
                    </code>
                  </pre>
                );
              }
              if (line.trim()) {
                return (
                  <p key={i} className="text-gray-600 dark:text-gray-300 mb-4">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Share2 size={18} />
            {t('share')}:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
            >
              <Linkedin size={20} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
            >
              <LinkIcon size={20} />
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
