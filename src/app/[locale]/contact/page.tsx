'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    icon: Mail,
    href: 'mailto:dangphuocbk.93@gmail.com',
    label: 'Email',
  },
];

export default function ContactPage() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const FORMSPREE_ID = 'xkoonvob';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-th-heading">{t('title')}</h1>
          <p className="text-lg text-th-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="terminal-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-th-primary mb-2"
                  >
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-th-card border border-th-border focus:ring-1 focus:ring-th-accent focus:border-th-accent outline-none transition-all text-th-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-th-primary mb-2"
                  >
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-th-card border border-th-border focus:ring-1 focus:ring-th-accent focus:border-th-accent outline-none transition-all text-th-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-th-primary mb-2"
                  >
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-th-card border border-th-border focus:ring-1 focus:ring-th-accent focus:border-th-accent outline-none transition-all resize-none text-th-primary"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-th-accent text-th-strong disabled:opacity-50 font-medium transition-colors hover:bg-th-accent-hover"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-th-secondary border-t-th-strong rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      {t('send')}
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-th-primary"
                  >
                    <CheckCircle size={20} />
                    {t('success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-th-secondary"
                  >
                    <AlertCircle size={20} />
                    {t('error')}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="terminal-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-th-hover">
                  <MapPin className="text-th-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-th-strong">Location</h3>
                  <p className="text-th-secondary">Ho Chi Minh City, Vietnam</p>
                </div>
              </div>
            </div>

            <div className="terminal-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-th-hover">
                  <Mail className="text-th-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-th-strong">Email</h3>
                  <a
                    href="mailto:dangphuocbk.93@gmail.com"
                    className="text-th-primary underline hover:text-th-accent"
                  >
                    dangphuocbk.93@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="terminal-card p-6">
              <h3 className="font-semibold text-th-strong mb-4">Social Links</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-th-hover text-th-secondary hover:text-th-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
