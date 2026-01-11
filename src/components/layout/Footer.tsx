'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Github, href: 'https://github.com/dangphuoc', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/phuoc-nguyen-dang-016129159/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:dangphuocbk.93@gmail.com', label: 'Email' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear}</span>
            <span>•</span>
            <span>{t('madeWith')}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={16} className="text-red-500 fill-red-500" />
            </motion.span>
            <span>&</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
