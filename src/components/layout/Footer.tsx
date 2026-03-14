'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/dangphuoc', label: 'github' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/phuoc-nguyen-dang-016129159/', label: 'linkedin' },
  { icon: Mail, href: 'mailto:dangphuocbk.93@gmail.com', label: 'mail' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-th-border bg-th-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-th-dim">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-th-accent transition-colors"
              >
                <social.icon size={14} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-th-faint">
            <span className="text-th-accent-soft">[</span>
            <span>&copy; {currentYear} phuoc nguyen</span>
            <span className="text-th-accent-soft">|</span>
            <span>next.js</span>
            <span className="text-th-accent-soft">]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
