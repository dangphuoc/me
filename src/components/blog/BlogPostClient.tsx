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
            <ul key={`list-${key}`} className="list-none space-y-1.5 mb-6 text-th-primary ml-4">
              {listItems}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${key}`} className="list-none space-y-1.5 mb-6 text-th-primary ml-4">
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

      const processCellContent = (cellText: string) => {
        return cellText
          .trim()
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-th-code-bg text-th-code-text px-1 text-xs">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-th-accent underline hover:text-th-accent-hover">$1</a>');
      };

      return (
        <div key={`table-${key}`} className="overflow-x-auto mb-8 mt-4">
          <table className="min-w-full border border-th-border">
            <thead className="bg-th-accent-bg">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-th-heading"
                    dangerouslySetInnerHTML={{ __html: processCellContent(header) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-th-border">
              {dataRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-th-hover transition-colors">
                  {row.split('|').filter(cell => cell.trim()).map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-4 py-3 text-sm text-th-secondary"
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
      if (line.startsWith('```')) {
        flushList(i);
        if (inCodeBlock) {
          elements.push(
            <div key={i} className="my-6">
              {codeLanguage && (
                <div className="text-[10px] text-th-accent-soft px-4 py-1 border border-b-0 border-th-border bg-th-card inline-block">
                  {codeLanguage}
                </div>
              )}
              <pre className="bg-th-card text-th-primary p-4 overflow-x-auto text-sm border border-th-border">
                <code>{codeContent.trim()}</code>
              </pre>
            </div>
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

      if (line.startsWith('![')) {
        flushList(i);
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          elements.push(
            <figure key={i} className="my-8">
              <div className="relative w-full h-64 md:h-80 overflow-hidden border border-th-border">
                <Image src={match[2]} alt={match[1]} fill className="object-cover" unoptimized />
              </div>
              {match[1] && (
                <figcaption className="text-xs text-th-dim mt-2 italic">{'// '}{match[1]}</figcaption>
              )}
            </figure>
          );
        }
        return;
      }

      if (line.startsWith('# ') && !line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h1 key={i} className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-th-heading">{line.replace('# ', '')}</h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h2 key={i} className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-th-heading border-b border-th-border pb-2">{line.replace('## ', '')}</h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        flushList(i);
        elements.push(
          <h3 key={i} className="text-lg font-semibold mt-6 mb-3 text-th-heading">{line.replace('### ', '')}</h3>
        );
        return;
      }

      if (line.startsWith('> ')) {
        flushList(i);
        const quoteText = line.replace('> ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        elements.push(
          <blockquote key={i} className="my-6 py-4 px-6 bg-th-accent-bg border-l-2 border-th-accent">
            <p className="text-sm italic text-th-secondary" dangerouslySetInnerHTML={{ __html: quoteText }} />
          </blockquote>
        );
        return;
      }

      if (line.startsWith('- ')) {
        if (!inList || listType !== 'ul') { flushList(i); inList = true; listType = 'ul'; }
        const itemText = line.replace('- ', '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-th-strong">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-th-code-bg text-th-code-text px-1 text-sm">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-th-accent underline hover:text-th-accent-hover">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed">
            <span className="text-th-accent-soft mr-2">-</span>
            <span dangerouslySetInnerHTML={{ __html: itemText }} />
          </li>
        );
        return;
      }

      if (/^\d+\.\s/.test(line)) {
        if (!inList || listType !== 'ol') { flushList(i); inList = true; listType = 'ol'; }
        const num = line.match(/^(\d+)\./)?.[1] || '';
        const itemText = line.replace(/^\d+\.\s/, '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-th-strong">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-th-code-bg text-th-code-text px-1 text-sm">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-th-accent underline hover:text-th-accent-hover">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed">
            <span className="text-th-accent-soft mr-2">{num}.</span>
            <span dangerouslySetInnerHTML={{ __html: itemText }} />
          </li>
        );
        return;
      }

      if (line.startsWith('---')) {
        flushList(i);
        elements.push(<hr key={i} className="my-8 border-th-border" />);
        return;
      }

      if (line.trim()) {
        flushList(i);
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-th-strong font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code class="bg-th-code-bg text-th-code-text px-1.5 py-0.5 text-sm font-mono">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-th-accent underline hover:text-th-accent-hover">$1</a>');
        elements.push(
          <p key={i} className="text-th-primary mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link href={`/${locale}/blog`} className="text-xs text-th-dim hover:text-th-accent transition-colors">
            <ArrowLeft size={14} className="inline mr-1" />cd ../blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-48 md:h-72 overflow-hidden mb-6 border border-th-border"
        >
          <Image src={thumbnailUrl} alt={post.title} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-th-page to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {post.tags.map((tag) => (
              <span key={tag} className="text-th-accent-soft">[{tag}]</span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-th-heading leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-th-dim">
            <span className="flex items-center gap-1.5"><User size={12} />{author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><Clock size={12} />{readTimeNum} {t('minRead')}</span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-th-border bg-th-card p-5 md:p-10 mb-10"
        >
          <div className="prose prose-lg max-w-none">{renderContent(post.content)}</div>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 text-xs"
        >
          <span className="flex items-center gap-1.5 text-th-dim">
            <Share2 size={12} />{t('share')}:
          </span>
          <div className="flex gap-1.5">
            <button onClick={() => handleShare('twitter')} className="p-2 border border-th-border text-th-dim hover:text-th-accent hover:border-th-accent transition-colors">
              <Twitter size={14} />
            </button>
            <button onClick={() => handleShare('linkedin')} className="p-2 border border-th-border text-th-dim hover:text-th-accent hover:border-th-accent transition-colors">
              <Linkedin size={14} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className={`p-2 border transition-colors ${copied ? 'border-th-accent text-th-accent' : 'border-th-border text-th-dim hover:text-th-accent hover:border-th-accent'}`}
            >
              <LinkIcon size={14} />
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
