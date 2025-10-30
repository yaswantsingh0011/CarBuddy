// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; // <-- बस यह एक लाइन सही है

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header /> {/* <-- यह Header.tsx को कॉल कर रहा है */}
        <main>{children}</main>
      </body>
    </html>
  );
}