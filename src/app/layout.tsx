import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Phuoc Nguyen | Software Engineering Manager',
    template: '%s | Phuoc Nguyen',
  },
  description: 'Personal website of Phuoc Nguyen - Software Engineering Manager. Tech Blog, Portfolio & Life Moments.',
  keywords: ['Phuoc Nguyen', 'software engineering', 'tech blog', 'portfolio', 'engineering manager'],
  metadataBase: new URL('https://phuocnguyen.me'),
  openGraph: {
    title: 'Phuoc Nguyen | Software Engineering Manager',
    description: 'Personal website of Phuoc Nguyen - Software Engineering Manager',
    url: 'https://phuocnguyen.me',
    siteName: 'Phuoc Nguyen',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phuoc Nguyen | Software Engineering Manager',
    description: 'Personal website of Phuoc Nguyen - Software Engineering Manager',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
