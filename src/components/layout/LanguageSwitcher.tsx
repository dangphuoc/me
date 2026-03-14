'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = (pathname.split('/')[1] || 'vi') as Locale;

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-0 text-xs">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="text-th-faint mx-1">/</span>}
          <button
            onClick={() => switchLocale(locale)}
            className={`transition-colors ${
              currentLocale === locale
                ? 'text-th-accent'
                : 'text-th-faint hover:text-th-accent'
            }`}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
