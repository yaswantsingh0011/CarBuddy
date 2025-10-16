// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; // '@' src/ फोल्डर को दर्शाता है

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarBuddy - आपके सफ़र का साथी',
  description: 'Find the best new and used cars in India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        {/* Footer yahan aayega */}
      </body>
    </html>
  );
}