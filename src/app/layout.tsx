import type { Metadata, Viewport } from 'next'; // FIX: Viewport type import kiya
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

// --- FIX: YE VIEWPORT CODE MISSING THA ---
// Iski wajah se mobile par site choti dikh rahi thi.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // User ko zoom-in rokne ke liye (App jaisa feel dega)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
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