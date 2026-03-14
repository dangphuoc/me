import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mono)', 'monospace'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        th: {
          page: 'var(--page-bg)',
          card: 'var(--card-bg)',
          hover: 'var(--hover-bg)',
          border: 'var(--border)',
          'border-hover': 'var(--border-hover)',
          strong: 'var(--text-strong)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          dim: 'var(--text-dim)',
          faint: 'var(--text-faint)',
          heading: 'var(--heading)',
          accent: 'var(--accent)',
          'accent-hover': 'var(--accent-hover)',
          'accent-soft': 'var(--accent-soft)',
          'accent-bg': 'var(--accent-bg)',
          prompt: 'var(--prompt)',
          'code-bg': 'var(--code-bg)',
          'code-text': 'var(--code-text)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
