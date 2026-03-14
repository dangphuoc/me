'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags?: string[];
  thumbnail?: string;
}

interface BlogGridProps {
  posts: Post[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function BlogGrid({ posts }: BlogGridProps) {
  const t = useTranslations('home');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4 text-xs text-th-dim">
          <span>
            <span className="text-th-prompt">$</span> ls ./posts
            <span className="text-th-faint ml-2">
              ({posts.length} {locale === 'vi' ? 'mục' : 'entries'})
            </span>
          </span>
          <Link
            href={`/${locale}/blog`}
            className="text-th-accent-soft hover:text-th-accent transition-colors"
          >
            {t('viewAll')} →
          </Link>
        </div>

        {/* Post list */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="border border-th-border divide-y divide-th-border"
        >
          {posts.map((post, index) => (
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
                    <h3 className="text-sm font-medium text-th-primary group-hover:text-th-accent transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-th-dim mt-1 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 text-[10px] text-th-faint shrink-0">
                    {post.tags && post.tags[0] && (
                      <span className="text-th-accent-soft">[{post.tags[0]}]</span>
                    )}
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>{post.readingTime}</span>
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
