import type { Metadata } from 'next';
import './globals.css';

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
  return children;
}
