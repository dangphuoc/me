'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  thumbnail?: string;
}

interface BlogListClientProps {
  posts: Post[];
  locale: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function BlogListClient({ posts, locale }: BlogListClientProps) {
  const t = useTranslations('blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-xs text-th-dim mb-2">
            <span className="text-th-prompt">$</span> cat /var/log/blog.index
          </div>
          <h1 className="text-2xl font-bold text-th-heading mb-1">{t('title')}</h1>
          <p className="text-sm text-th-dim">{t('subtitle')}</p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-th-accent-soft"
            />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-th-card border border-th-border text-sm text-th-primary placeholder-th-faint outline-none focus:border-th-accent transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2 py-1 border transition-colors ${
                !selectedTag
                  ? 'border-th-accent text-th-accent'
                  : 'border-th-border text-th-dim hover:text-th-accent'
              }`}
            >
              *
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-2 py-1 border transition-colors ${
                  selectedTag === tag
                    ? 'border-th-accent text-th-accent'
                    : 'border-th-border text-th-dim hover:text-th-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="text-[10px] text-th-faint mb-3">
          {filteredPosts.length} {locale === 'vi' ? 'kết quả' : 'results'}
          {selectedTag && <span> — [{selectedTag}]</span>}
        </div>

        {/* Posts */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="border border-th-border divide-y divide-th-border"
          >
            {filteredPosts.map((post, index) => (
              <motion.article key={post.slug} variants={item}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block px-4 py-4 hover:bg-th-hover transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-th-accent-soft text-xs mt-0.5 shrink-0 w-5 text-right">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-medium text-th-primary group-hover:text-th-accent transition-colors line-clamp-1">
                        {post.title}
                      </h2>
                      <p className="text-xs text-th-dim mt-1 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-th-faint shrink-0">
                      {post.tags[0] && (
                        <span className="text-th-accent-soft">[{post.tags[0]}]</span>
                      )}
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: '2-digit',
                        })}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-th-dim text-sm">
            <span className="text-th-accent-soft">ERR:</span> {t('noResults')}
          </div>
        )}
      </div>
    </div>
  );
}
