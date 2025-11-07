// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarBuddy - Your Travel Companion',
  description: 'Find the best new and used cars.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      {/* bg-white and text-gray-900 ensures content is visible */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-gray-900`}> 
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer /> 
        </AuthProvider>
      </body>
    </html>
  );
}