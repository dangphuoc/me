'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/blog', key: 'blog', cmd: '~/blog' },
  { href: '/about', key: 'about', cmd: '~/about' },
  { href: '/contact', key: 'contact', cmd: '~/contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locale = pathname.split('/')[1] || 'vi';

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname.startsWith(fullPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-th-page border-b border-th-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          >
            <span className="text-th-accent">guest@phuoc</span>
            <span className="text-th-faint">:</span>
            <span className="text-th-dim">~</span>
            <span className="text-th-faint">$</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`px-3 py-1 text-xs transition-colors border-b-2 ${
                  isActive(item.href)
                    ? 'text-th-accent border-th-accent'
                    : 'text-th-faint border-transparent hover:text-th-accent'
                }`}
              >
                {item.cmd}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-th-dim hover:text-th-accent"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-th-border"
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? 'text-th-accent'
                        : 'text-th-faint hover:text-th-accent'
                    }`}
                  >
                    <span className="text-th-accent-soft mr-2">&gt;</span>
                    {item.cmd}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
