import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import { AuthProvider } from '@/context/AuthContext';

// ✅ Imports wapas laye
import { CompareProvider } from '@/context/CompareContext';
import CompareFloatingButton from '@/components/CompareFloatingButton';

const inter = Inter({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: 'CarBuddy - Your Travel Companion',
  description: 'Find the best new and used cars.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
            {/* ✅ Compare Provider Wapas Wrap Kiya */}
            <CompareProvider>
              
              <Header />
              
              <main className="flex-grow">
                {children}
              </main>

              {/* ✅ Floating Button Wapas Lagaya */}
              <CompareFloatingButton /> 
              
              <Footer /> 

            </CompareProvider>
        </AuthProvider>

      </body>
    </html>
  );
}