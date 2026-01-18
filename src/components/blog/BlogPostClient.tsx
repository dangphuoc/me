'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  User,
} from 'lucide-react';

interface BlogPostClientProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
    readingTime: string;
    tags: string[];
    thumbnail?: string;
  };
  locale: string;
  author?: string;
}

export default function BlogPostClient({ post, locale, author = 'Phuoc Nguyen' }: BlogPostClientProps) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;

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
        setCopied(true);
        break;
    }
  };

  // Render markdown content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';
    let inTable = false;
    let tableRows: string[] = [];
    let listItems: JSX.Element[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' = 'ul';

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${key}`} className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300 ml-4">
              {listItems}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${key}`} className="list-decimal list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300 ml-4">
              {listItems}
            </ol>
          );
        }
        listItems = [];
        inList = false;
      }
    };

    const renderTable = (rows: string[], key: number) => {
      if (rows.length < 2) return null;

      const headers = rows[0].split('|').filter(cell => cell.trim());
      const dataRows = rows.slice(2);

      // Process cell content: handle links, bold, code
      const processCellContent = (cellText: string) => {
        return cellText
          .trim()
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
      };

      return (
        <div key={`table-${key}`} className="overflow-x-auto mb-8 mt-4">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                    dangerouslySetInnerHTML={{ __html: processCellContent(header) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dataRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {row.split('|').filter(cell => cell.trim()).map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: processCellContent(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, i) => {
      // Code block
      if (line.startsWith('```')) {
        flushList(i);
        if (inCodeBlock) {
          elements.push(
            <pre key={i} className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-8 text-sm border border-gray-700">
              <code className={codeLanguage ? `language-${codeLanguage}` : ''}>{codeContent.trim()}</code>
            </pre>
          );
          codeContent = '';
          codeLanguage = '';
        } else {
          codeLanguage = line.slice(3).trim();
        }
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Table detection
      if (line.includes('|') && !line.startsWith('![') && !line.startsWith('>')) {
        if (!inTable) {
          flushList(i);
          inTable = true;
          tableRows = [];
        }
        tableRows.push(line);
        return;
      } else if (inTable) {
        const tableElement = renderTable(tableRows, i);
        if (tableElement) elements.push(tableElement);
        inTable = false;
        tableRows = [];
      }

      // Image
      if (line.startsWith('![')) {
        flushList(i);
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          elements.push(
            <figure key={i} className="my-10">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={match[2]}
                  alt={match[1]}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {match[1] && (
                <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                  {match[1]}
                </figcaption>
              )}
            </figure>
          );
        }
        return;
      }

      // H1
      if (line.startsWith('# ') && !line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h1 key={i} className="text-3xl sm:text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }

      // H2
      if (line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }

      // H3
      if (line.startsWith('### ')) {
        flushList(i);
        elements.push(
          <h3 key={i} className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        flushList(i);
        const quoteText = line.replace('> ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        elements.push(
          <blockquote
            key={i}
            className="relative my-10 py-6 px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-l-4 border-blue-500"
          >
            <span className="absolute -top-3 -left-2 text-6xl text-blue-300 dark:text-blue-700 font-serif">&ldquo;</span>
            <p className="text-lg italic text-gray-700 dark:text-gray-300 relative z-10" dangerouslySetInnerHTML={{ __html: quoteText }} />
          </blockquote>
        );
        return;
      }

      // Unordered list
      if (line.startsWith('- ')) {
        if (!inList || listType !== 'ul') {
          flushList(i);
          inList = true;
          listType = 'ul';
        }
        const itemText = line
          .replace('- ', '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
        return;
      }

      // Ordered list
      if (/^\d+\.\s/.test(line)) {
        if (!inList || listType !== 'ol') {
          flushList(i);
          inList = true;
          listType = 'ol';
        }
        const itemText = line
          .replace(/^\d+\.\s/, '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
        return;
      }

      // HR
      if (line.startsWith('---')) {
        flushList(i);
        elements.push(
          <hr key={i} className="my-12 border-gray-200 dark:border-gray-800" />
        );
        return;
      }

      // Paragraph
      if (line.trim()) {
        flushList(i);
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>');
        elements.push(
          <p
            key={i}
            className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    flushList(lines.length);

    if (inTable && tableRows.length > 0) {
      const tableElement = renderTable(tableRows, lines.length + 1);
      if (tableElement) elements.push(tableElement);
    }

    return elements;
  };

  const readTimeNum = parseInt(post.readingTime) || 10;
  const thumbnailUrl = post.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200';

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

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl"
        >
          <Image
            src={thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <User size={18} />
              {author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(post.date).toLocaleDateString(
                locale === 'vi' ? 'vi-VN' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {readTimeNum} {t('minRead')}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-12 mb-12"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(post.content)}
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
              className={`p-3 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <LinkIcon size={20} />
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
