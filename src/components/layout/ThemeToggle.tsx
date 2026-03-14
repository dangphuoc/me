'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="text-xs text-th-faint w-12" />;

  const cycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const label = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'auto';

  return (
    <button
      onClick={cycle}
      className="text-[11px] text-th-dim hover:text-th-accent transition-colors"
      title={`Theme: ${label}`}
    >
      [{label}]
    </button>
  );
}
