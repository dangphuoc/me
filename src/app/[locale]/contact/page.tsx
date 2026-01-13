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
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    color: 'hover:text-blue-600',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter',
    color: 'hover:text-blue-400',
  },
  {
    icon: Mail,
    href: 'mailto:dangphuocbk.93@gmail.com',
    label: 'Email',
    color: 'hover:text-red-500',
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

    // Reset status after 3 seconds
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
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-colors"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      {t('send')}
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle size={20} />
                    {t('success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400"
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
            {/* Location */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Mail className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Email
                  </h3>
                  <a
                    href="mailto:dangphuocbk.93@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    dangphuocbk.93@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Social Links
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 transition-colors ${social.color}`}
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
