'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const FORMSPREE_ID = 'xkoonvob';

export default function ContactPage() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="text-xs text-th-dim mb-2">
            <span className="text-th-prompt">$</span> ping phuoc@dev
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-th-heading mb-2">{t('title')}</h1>
          <p className="text-lg text-th-secondary">{t('subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-2"
          >
            <div className="text-xs text-th-dim mb-3">
              <span className="text-th-prompt">$</span> cat contact.conf
            </div>
            <div className="border border-th-border bg-th-card p-5 space-y-4 text-sm">
              <div>
                <span className="text-th-dim">location</span>
                <span className="text-th-faint mx-2">=</span>
                <span className="text-th-primary">Ho Chi Minh City, Vietnam</span>
              </div>
              <div>
                <span className="text-th-dim">email</span>
                <span className="text-th-faint mx-2">=</span>
                <a href="mailto:dangphuocbk.93@gmail.com" className="text-th-accent hover:text-th-accent-hover transition-colors">
                  dangphuocbk.93@gmail.com
                </a>
              </div>
              <div className="border-t border-th-border pt-4 mt-4">
                <span className="text-xs text-th-dim block mb-3">// links</span>
                <div className="space-y-2">
                  <a
                    href="https://github.com/dangphuoc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-th-secondary hover:text-th-accent transition-colors"
                  >
                    <span className="text-th-accent-soft mr-2">→</span>github.com/dangphuoc
                  </a>
                  <a
                    href="https://www.linkedin.com/in/phuoc-nguyen-dang-016129159/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-th-secondary hover:text-th-accent transition-colors"
                  >
                    <span className="text-th-accent-soft mr-2">→</span>linkedin.com/in/phuoc-nguyen
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form - right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="text-xs text-th-dim mb-3">
              <span className="text-th-prompt">$</span> send --message
            </div>
            <div className="border border-th-border bg-th-card p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs text-th-dim mb-1.5">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-th-page border border-th-border text-sm text-th-primary outline-none focus:border-th-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-th-dim mb-1.5">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-th-page border border-th-border text-sm text-th-primary outline-none focus:border-th-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-th-dim mb-1.5">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-th-page border border-th-border text-sm text-th-primary outline-none focus:border-th-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-2.5 text-sm border border-th-accent text-th-accent hover:bg-th-accent hover:text-th-strong disabled:opacity-50 transition-colors"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">sending...</span>
                  ) : (
                    <>$ {t('send').toLowerCase()}</>
                  )}
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-th-accent"
                  >
                    <span className="text-th-prompt mr-1">[OK]</span> {t('success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-th-secondary"
                  >
                    <span className="mr-1">[ERR]</span> {t('error')}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
